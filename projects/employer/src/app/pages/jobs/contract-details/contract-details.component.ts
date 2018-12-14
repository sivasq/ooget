import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiCallService } from '../../../services/api-call.service';
import { Subscription } from 'rxjs';
import { MatDialog, MatSnackBar, MatDialogConfig, MatTableDataSource, MatBottomSheet, MatBottomSheetConfig } from '@angular/material';
import { EditClockInOutComponent } from '../dialogs/edit-clock-in-out/edit-clock-in-out.component';
import { DatePipe } from '@angular/common';
import { PaginationInstance } from 'ngx-pagination';
import { SelectionModel } from '@angular/cdk/collections';
import * as moment from 'moment';
import 'moment-duration-format';
import { TimesheetNotesComponent } from '../dialogs/timesheet-notes/timesheet-notes.component';
import { JsonToCsvService } from '../../../services/json-to-csv.service';
import { JsonToTextService } from '../../../services/json-to-text.service';
import { of, concat } from 'rxjs';
import { PayrollProcessService } from '../../../services/payroll-process.service';
import { NgModel } from '@angular/forms';
import { LatereasonComponent } from '../dialogs/latereason/latereason.component';

@Component({
	selector: 'app-contract-details',
	templateUrl: './contract-details.component.html',
	styleUrls: ['./contract-details.component.scss']
})
export class ContractDetailsComponent implements OnInit {
	busy: Subscription;
	public today = new Date();

	public contract_id;
	public contractDetails;
	public contractJobDetails;
	public contractorDetails;
	public verifiedTimeSheets;
	public payrollsList: any[] = [];

	// public checked = true;

	timesheets: any = [];

	dailyTimeSheetDataSource = new MatTableDataSource(this.timesheets);

	displayedColumns = ['select', 'work_date', 'in_time', 'out_time', 'verifiedpunchintime', 'verifiedpunchouttime', 'normalworkhour', 'otworkhour', 'totalworkhour', 'normalsalary', 'otsalary', 'totalsalary', 'oogetscommission', 'lateinitimation', 'notedialogtrigger'];

	selection = new SelectionModel(true, []);

	public pageSizeOptions = [5, 10, 15, 20, 25, 50, 100];
	// DayOff Pagination config
	public dayOffPaginateConfig: PaginationInstance = {
		id: 'tab1',
		itemsPerPage: 5,
		currentPage: 1
	};
	public dayOffFilter: string = '';
	public dayOffPaginateControlMaxSize: number = 5;
	public dayOffPaginateControlAutoHide: boolean = true;

	constructor(public router: Router, private _httpService: ApiCallService, private route: ActivatedRoute, public dialog: MatDialog, private bottomSheet: MatBottomSheet, public snackBar: MatSnackBar, private datePipe: DatePipe, public csv: JsonToCsvService, public texts: JsonToTextService, public payroll: PayrollProcessService) {
		this.contract_id = this.route.snapshot.params['contract_id'];

		this.getContractDetails({ 'contractid': this.contract_id });
		this.getTimesheetDetails({ 'contractid': this.contract_id });
		this.getAllOffDays({ 'contractid': this.contract_id });
	}

	// Get Contract Details
	getContractDetails(contractId) {
		this.busy = this._httpService.getContractDetails(contractId)
			.subscribe(
				response => {
					if (response.success) {
						this.contractDetails = response.contract;
						this.contractJobDetails = response.contract.jobid;
						this.contractorDetails = response.contract.jobseekerid;
					} else if (!response.success) {
						console.log(response);
					}
				},
				error => {
					console.log(error);
				}
			);
	}

	// ===================Roster Days Manage Start===================
	public OffDays: any[] = [];

	// Get All Roster Days For Contractor
	public getAllOffDays(contractId) {
		this.busy = this._httpService.getAllOffDays(contractId)
			.subscribe(
				response => {
					if (response.success) {
						// console.log(response.offdays);
						this.OffDays = response.offdays;
						// console.log(this.OffDays.length);
					} else if (!response.success) {
						console.log(response);
					}
				},
				error => {
					console.log(error);
				}
			);
	}

	// Check Roster Day is Today or past day
	checkPastDay(offDayDate) {
		let today = this.datePipe.transform(Date.now(), 'y/MM/dd', '+0800');
		return today >= offDayDate;
	}

	// Add New Roster Day if not added previously
	public addNewOffDay(date) {
		let offDayData = {};
		let contractId = { "contractid": this.contract_id };
		offDayData = Object.assign(offDayData, contractId);

		let offday = { "offday": this.datePipe.transform(date, 'yyyy/MM/dd') };
		offDayData = Object.assign(offDayData, offday);

		// let demo = this.OffDays.map((OffDay) => OffDay.date == offday.offday);
		let isAlreadyOffDay = this.OffDays.filter(item => item.date == offday.offday).length;

		if (isAlreadyOffDay == 0) {
			this.busy = this._httpService.addOffDay(offDayData)
				.subscribe(
					response => {
						if (response.success) {
							this.OffDays.push(response.offdays);
							let snackBarRef = this.snackBar.open(this.datePipe.transform(date, 'dd/MM/yyyy') + ' Successfully set as Off.', 'Close', {
								duration: 5000,
							});

							snackBarRef.onAction().subscribe(() => {
								snackBarRef.dismiss();
								console.log('The snack-bar action was triggered!');
							});
						} else if (!response.success) {
							console.log(response);
						}
					},
					error => {
						console.log(error);
					}
				);
		} if (isAlreadyOffDay > 0) {
			let snackBarRef = this.snackBar.open('Oh Sorry! This Day Already Mentioned as Off.', 'Close', {
				duration: 5000,
			});

			snackBarRef.onAction().subscribe(() => {
				snackBarRef.dismiss();
				console.log('The snack-bar action was triggered!');
			});
		}
	}

	// Remove Roster Day
	public removeDate(dayId, index) {
		// this.OffDays = this.OffDays.filter((date: any) => {
		// 	return removedDate !== date;
		// })
		this.busy = this._httpService.removeOffDay({ 'contractid': this.contract_id, 'offdayid': dayId })
			.subscribe(
				response => {
					if (response.success) {
						this.OffDays.splice(index, 1);
					} else if (!response.success) {
						console.log(response);
					}
				},
				error => {
					console.log(error);
				}
			);
	}
	// ======================Roster Days Manage End================

	// ======================TimeSheet Table Actions Start=============

	// Get Timesheets (Payroll not generated list)
	getTimesheetDetails(contractId) {
		this.busy = this._httpService.getTimesheetDetails(contractId)
			.subscribe(
				response => {
					if (response.success) {
						// this.timesheets = response.timesheetdetails[0].timesheet;
						// this.dailyTimeSheetDataSource.data = this.timesheets;

						if (response.timesheetdetails.length > 0) {
							this.timesheets = response.timesheetdetails[0].timesheet;
							this.dailyTimeSheetDataSource.data = this.timesheets;
							this.verifiedTimeSheets = this.timesheets.filter(data => data.verified == true);
							// console.log(this.verifiedTimeSheets);
						}

					} else if (!response.success) {
						console.log(response);
					}
				},
				error => {
					console.log(error);
				}
			);
	}

	/** Whether the number of selected elements matches the total number of rows. */
	isAllSelected() {
		// console.log(this.selection);
		const numSelected = this.selection.selected.length;
		const numRows = this.dailyTimeSheetDataSource.data.length;
		return numSelected === numRows;
	}

	/** Selects all rows if they are not all selected; otherwise clear selection. */
	masterToggle() {
		this.isAllSelected() ?
			this.selection.clear() :
			this.dailyTimeSheetDataSource.data.forEach(row => {
				if (!row['verified']) {
					return this.selection.select(row);
				}
			});
	}

	// verify selected Timesheets
	verifyTimeSheets() {
		if (this.selection.selected.length == 0) return false;

		let timesheetids = this.selection.selected.map(data => data._id);

		let verifyTimesheets = { 'contractid': this.contract_id, 'timesheetids': timesheetids };
		console.log(verifyTimesheets);
		this._httpService.verifyTimeSheets(verifyTimesheets)
			.subscribe(
				response => {
					if (response.success) {
						console.log("Selected TimeSheets Verified");
						console.log(this.selection.selected);
						this.selection.clear();
						let snackBarRef = this.snackBar.open('Selected TimeSheets Verified Successfully.', 'Close', {
							duration: 5000,
						});

						snackBarRef.onAction().subscribe(() => {
							snackBarRef.dismiss();
							console.log('The snack-bar action was triggered!');
						});

						this.getTimesheetDetails({ 'contractid': this.contract_id });

					} else if (!response.success) {
						console.log(response);
						console.log(verifyTimesheets);
					}
				},
				error => {
					console.log(error);
				}
			);
	}

	verifiedTimePattern = "^([01]?[0-9]|2[0-3]):[0-5][0-9]$";
	editableRow: any;
	editField: string = '';
	editRowId: string = '';
	@ViewChild('fieldName1') fieldName1: any;
	@ViewChild('fieldName2') fieldName2: any;

	public field1Editable(row, id) {
		console.log('edit1 called');
		this.editRowId = id;
		this.editField = 'field1';
		setTimeout(() => { // this will make the execution after the above boolean has changed
			this.fieldName1.nativeElement.focus();
		}, 0);

		let verifiedpunchintime = this.datePipe.transform(row.verifiedpunchintime, 'HH:mm');
		let verifiedpunchouttime = this.datePipe.transform(row.verifiedpunchouttime, 'HH:mm');

		this.editableRow = {
			'timesheetdate': row.date,
			'verifiedpunchintime': verifiedpunchintime,
			'verifiedpunchouttime': verifiedpunchouttime,
			'contractid': this.contract_id,
			'timesheetid': row._id
		}
	}

	public field2Editable(row, id) {
		console.log('edit2 called');
		this.editRowId = id;
		this.editField = 'field2';
		setTimeout(() => { // this will make the execution after the above boolean has changed
			this.fieldName2.nativeElement.focus();
		}, 0);

		let verifiedpunchintime = this.datePipe.transform(row.verifiedpunchintime, 'HH:mm');
		let verifiedpunchouttime = this.datePipe.transform(row.verifiedpunchouttime, 'HH:mm');

		this.editableRow = {
			'timesheetdate': row.date,
			'verifiedpunchintime': verifiedpunchintime,
			'verifiedpunchouttime': verifiedpunchouttime,
			'contractid': this.contract_id,
			'timesheetid': row._id
		}
	}

	public rowEditableOff() {
		console.log('editoff called Esc');
		console.log(event);
		this.editRowId = '';
		this.editField = '';
	}

	convertNextDay(date) {
		let previousDate = new Date(date);
		let nextday = new Date(previousDate.getTime() + 86400000); // + 1 hr in ms
		return nextday;
	}

	public rowEditableSubmit(editableRow, field) {

		if (field == 'field1' && !this.fieldName1.nativeElement.validity.valid) return false;

		if (field == 'field2' && !this.fieldName2.nativeElement.validity.valid) return false;

		console.log('editoff called Enter');

		let jobStartTime: any = this.datePipe.transform(editableRow.timesheetdate + " " + this.contractJobDetails.starttime, 'yyyy/MM/dd HH:mm');

		let inTime: any = this.datePipe.transform(editableRow.timesheetdate + " " + editableRow.verifiedpunchintime, 'yyyy/MM/dd HH:mm');
		let outTime: any = this.datePipe.transform(editableRow.timesheetdate + " " + editableRow.verifiedpunchouttime, 'yyyy/MM/dd HH:mm')

		if (inTime > outTime) {
			outTime = this.convertNextDay(outTime);
		}

		let verifiedTime = {};
		if (field == 'field1') {
			let verifiedpunchintime = { "verifiedpunchintime": this.datePipe.transform(inTime, 'yyyy/MM/dd HH:mm') };
			verifiedTime = Object.assign(verifiedTime, verifiedpunchintime);

			let verifiedpunchouttime = { "verifiedpunchouttime": this.datePipe.transform(outTime, 'yyyy/MM/dd HH:mm') };
			verifiedTime = Object.assign(verifiedTime, verifiedpunchouttime);

			if (inTime < jobStartTime) {

				let snackBarRef = this.snackBar.open('Intime Should not Lessthan Actual Job StartTime.', 'Close', {
					duration: 10000,
					horizontalPosition: 'center',
				});
				snackBarRef.onAction().subscribe(() => {
					snackBarRef.dismiss();
				});
				return false;
			}
		}

		if (field == 'field2') {
			let verifiedpunchouttime = { "verifiedpunchouttime": this.datePipe.transform(outTime, 'yyyy/MM/dd HH:mm') };
			verifiedTime = Object.assign(verifiedTime, verifiedpunchouttime);
		}

		let contractid = { "contractid": editableRow.contractid };
		verifiedTime = Object.assign(verifiedTime, contractid);

		let timesheetid = { "timesheetid": editableRow.timesheetid };
		verifiedTime = Object.assign(verifiedTime, timesheetid);

		console.log(verifiedTime);
		if (field == 'field1') {
			this.updatePunchin(verifiedTime);
		}

		if (field == 'field2') {
			this.updatePunchout(verifiedTime);
		}

		this.editRowId = '';
		this.editField = '';
	}

	// Update PunchOut
	updatePunchin(verifiedTime) {
		this._httpService.updatePunchin(verifiedTime)
			.subscribe(
				response => {
					if (response.success) {
						console.log("TimeSheet Adjusted");

						this.getTimesheetDetails({ 'contractid': this.contract_id });

						// let snackBarRef = this.snackBar.open('TimeSheet Adjusted Successfully.', 'Close', {
						// 	duration: 5000,
						// });
						// snackBarRef.onAction().subscribe(() => {
						// 	snackBarRef.dismiss();
						// 	console.log('The snack-bar action was triggered!');
						// });

					} else if (!response.success) {
						console.log(response);
					}
				},
				error => {
					console.log(error);
				}
			);
	}

	// Update PunchIn
	updatePunchout(verifiedTime) {
		this._httpService.updatePunchout(verifiedTime)
			.subscribe(
				response => {
					if (response.success) {
						console.log("TimeSheet Adjusted");

						this.getTimesheetDetails({ 'contractid': this.contract_id });

						// let snackBarRef = this.snackBar.open('TimeSheet Adjusted Successfully.', 'Close', {
						// 	duration: 5000,
						// });
						// snackBarRef.onAction().subscribe(() => {
						// 	snackBarRef.dismiss();
						// 	console.log('The snack-bar action was triggered!');
						// });

					} else if (!response.success) {
						console.log(response);
					}
				},
				error => {
					console.log(error);
				}
			);
	}

	// View Late Reason
	LateReason(TimeSheetData) {
		console.log(TimeSheetData);

		let bottomSheetConfig = new MatDialogConfig();
		bottomSheetConfig.data = {
			'contractid': this.contract_id,
			'timesheetid': TimeSheetData._id,
			'latereason': TimeSheetData.latereason,
			'lateinitimatedat': TimeSheetData.lateintimatedat,
			'date': TimeSheetData.date,
		};

		let bottomSheetRef = this.bottomSheet.open(LatereasonComponent, bottomSheetConfig);

		bottomSheetRef.afterDismissed().subscribe((result) => {
			console.log('Bottom sheet has been dismissed.');
		});
	}

	// View / Add / Edit Notes
	NoteAction(TimeSheetData) {
		console.log(TimeSheetData);

		let bottomSheetConfig = new MatDialogConfig();
		bottomSheetConfig.data = {
			'contractid': this.contract_id,
			'timesheetid': TimeSheetData._id,
			'notes': TimeSheetData.notes,
			'date': TimeSheetData.date,
		};

		let bottomSheetRef = this.bottomSheet.open(TimesheetNotesComponent, bottomSheetConfig);

		bottomSheetRef.afterDismissed().subscribe((result) => {
			console.log('Bottom sheet has been dismissed.');
			// console.log(result);
			if (result == undefined) return false;

			if (result.callback == true) {
				this.addTimesheetNotes(result);
			}
		});
	}

	// Update Notes
	addTimesheetNotes(notesData) {
		this._httpService.timesheetNotesUpdate(notesData)
			.subscribe(
				response => {
					if (response.success) {
						console.log("TimeSheet Notes Updated");
						this.getTimesheetDetails({ 'contractid': this.contract_id });

						let snackBarRef = this.snackBar.open('TimeSheet Notes Added Successfully.', 'Close', {
							duration: 5000,
						});

						snackBarRef.onAction().subscribe(() => {
							snackBarRef.dismiss();
							console.log('The snack-bar action was triggered!');
						});
					} else if (!response.success) {
						console.log(response);
					}
				},
				error => {
					console.log(error);
				}
			);
	}

	// Time Sheet Table Calculation Start =======
	getSumOfNormalWorkHrs() {
		let totalMin = this.timesheets.map(t => t.normalworkhour).reduce((previous, current) => {
			let min = moment.duration(current).asMinutes();
			return previous + min
		}, 0);

		let hrs = moment.duration(totalMin, "minutes").format("hh:mm");
		if (hrs == '0' || hrs == '00') return 'Nil';
		return hrs;
	}

	getSumOfOTWorkHrs() {
		let totalMin = this.timesheets.map(t => t.otworkhour).reduce((previous, current) => {
			let min = moment.duration(current).asMinutes();
			return previous + min
		}, 0);

		let hrs = moment.duration(totalMin, "minutes").format("hh:mm");
		if (hrs == '0' || hrs == '00') return 'Nil';
		return hrs;
	}

	getSumOfTotalWorkHrs() {
		let totalMin = this.timesheets.map(t => t.totalworkhour).reduce((previous, current) => {
			let min = moment.duration(current).asMinutes();
			return previous + min
		}, 0);

		let hrs = moment.duration(totalMin, "minutes").format("hh:mm");
		if (hrs == '0' || hrs == '00') return 'Nil';
		return hrs;
	}

	getSumOfNormalWorkHrSalary() {
		return this.timesheets.map(t => t.normalsalary).reduce((previous, current) => {
			return previous + current
		}, 0);
	}

	getSumOfOTWorkHrSalary() {
		return this.timesheets.map(t => t.otsalary).reduce((previous, current) => {
			return previous + current
		}, 0);
	}

	getSumOfTotalWorkHrSalary() {
		return this.timesheets.map(t => t.totalsalary).reduce((previous, current) => {
			return previous + current
		}, 0);
	}

	getSumOfTotalOogetCommision() {
		return this.timesheets.map(t => t.oogetscommission).reduce((previous, current) => {
			if (current == undefined) {
				current = 0;
			}
			return previous + current
		}, 0);
	}
	// Time Sheet Table Calculation End =======
	// ======================TimeSheet Table Actions End=============

	ngOnInit() {
		// this.contractorTimesheet.sort(
		// 	function (a, b) {
		// 		return new Date(b.date).getTime() - new Date(a.date).getTime()
		// 	});

		// this.contractorPayrolls.sort(
		//     function (a, b) {
		//         return new Date(b.datefrom).getTime() - new Date(a.datefrom).getTime()
		//     });
		// console.log(this.contractorPayrolls);
	}

	// Not used

	changeVerifiedTime(rawValue) {
		// console.log(rawValue);
		const emptyString = '';
		const prefix = '0';
		const rawValueLength = rawValue.length

		// if (rawValue != emptyString && (rawValue[0].concat(rawValue[1]) > 24)) {
		// 	this.editableRow.verifiedpunchintime = prefix.concat(rawValue);
		// }
		// console.log(this.fieldName1);
		// console.log(this.fieldName1.nativeElement.validity.valid);
	}

	/* getDateArray(start, end) {
		var arr = new Array();
		var dt = new Date(start);
		while (dt <= end) {
			arr.push(new Date(dt));
			dt.setDate(dt.getDate() + 1);
		}
		return arr;
	} */

	/* disagreePuchTime(timesheetData, event) {
		console.log(event.checked);

		if (event.checked == true) return false;

		let dialogConfig = new MatDialogConfig();

		dialogConfig.disableClose = true;
		dialogConfig.autoFocus = true;
		dialogConfig.data = {
			'contractid': this.contract_id,
			'timesheetid': timesheetData._id,
			'date': new Date(timesheetData.date),
			'punchintime': new Date(timesheetData.punchintime),
			'punchouttime': new Date(timesheetData.punchouttime),
			'verifiedpunchintime': new Date(timesheetData.verifiedpunchintime),
			'verifiedpunchouttime': new Date(timesheetData.verifiedpunchouttime)
		};
		let dialogRef = this.dialog.open(EditClockInOutComponent, dialogConfig);

		dialogRef.afterClosed().subscribe(result => {
			console.log(result);
			this.checked = true;

			if (result == undefined) return false;

			if (result.callback == true) {
				this.AdjustTime(result);
			}
		})
	} */

	/* AdjustTime(verifiedTime) {
		this._httpService.timesheetAdjust(verifiedTime)
			.subscribe(
				response => {
					if (response.success) {
						console.log("TimeSheet Adjusted");

						this.getTimesheetDetails({ 'contractid': this.contract_id });

						// let snackBarRef = this.snackBar.open('TimeSheet Adjusted Successfully.', 'Close', {
						// 	duration: 5000,
						// });
						// snackBarRef.onAction().subscribe(() => {
						// 	snackBarRef.dismiss();
						// 	console.log('The snack-bar action was triggered!');
						// });

					} else if (!response.success) {
						console.log(response);
					}
				},
				error => {
					console.log(error);
				}
			);
	} */
}
