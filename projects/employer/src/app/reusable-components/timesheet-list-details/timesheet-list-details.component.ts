import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatBottomSheet } from '@angular/material';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { isArray } from 'util';
import * as moment from 'moment';
import 'moment-duration-format';
import { TimesheetNotesComponent } from '../../pages/jobs/dialogs/timesheet-notes/timesheet-notes.component';
import { LatereasonComponent } from '../../pages/jobs/dialogs/latereason/latereason.component';
import { EditClockInOutComponent } from '../../pages/jobs/dialogs/edit-clock-in-out/edit-clock-in-out.component';
import { ApiCallService } from '../../services/api-call.service';
import { DatePipe } from '@angular/common';
import { PayrollProcessService } from '../../services/payroll-process.service';

@Component({
	selector: 'app-timesheet-list-details',
	templateUrl: './timesheet-list-details.component.html',
	styleUrls: ['./timesheet-list-details.component.scss']
})
export class TimesheetListDetailsComponent implements OnInit {
	busy: Subscription; // busy Config
	@Input() contractId;
	@Input() contractDetails;

	checked = true; // For Disagree Function
	timesheets: any = [];
	verifiedTimeSheets;
	dailyTimeSheetDataSource = new MatTableDataSource(this.timesheets);
	displayedColumns = ['select', 'work_date', 'in_time', 'out_time', 'clock_verified_in', 'clock_verified_out', 'normalworkhour', 'ot1workhour', 'ot2workhour', 'totalworkhour', 'normalsalary', 'ot1salary', 'ot2salary', 'totalsalary', 'oogetscommission', 'lateinitimation', 'notedialogtrigger'];
	selection = new SelectionModel(true, []);

	verifiedTimePattern = '^([01]?[0-9]|2[0-3]):[0-5][0-9]$';
	editableRow: any;
	editField = '';
	editRowId = '';
	@ViewChild('fieldName1') fieldName1: any;
	@ViewChild('fieldName2') fieldName2: any;

	activeTimesheetPeriod = {
		startDate: '',
		endDate: ''
	};

	constructor(private _httpService: ApiCallService, public dialog: MatDialog, private bottomSheet: MatBottomSheet, public snackBar: MatSnackBar, private datePipe: DatePipe, public payroll: PayrollProcessService) {
		setTimeout(() => {
			this.getCurrentDays();
		}, 1000);
	}

	/** Whether the number of selected elements matches the total number of rows. */
	isAllSelected() {
		// console.log(this.selection);
		const numSelected = this.selection.selected.length;
		// const numRows = this.dailyTimeSheetDataSource.data.length;
		const numRows = this.dailyTimeSheetDataSource.data.filter((data: any) => !data.sheet_verified).length;
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
		if (this.selection.selected.length === 0) { return false; }
		let timesheetids = this.selection.selected.map(data => data._id);
		let verifyTimesheets = { 'contractid': this.contractId, 'timesheetids': timesheetids };
		// console.log(verifyTimesheets);
		this._httpService.verifyTimeSheets(verifyTimesheets)
			.subscribe(
				response => {
					if (response.success) {
						this.selection.clear();
						let snackBarRef = this.snackBar.open('Selected TimeSheets Verified Successfully.', 'Close', {
							duration: 5000,
						});

						snackBarRef.onAction().subscribe(() => {
							snackBarRef.dismiss();
							// console.log('The snack-bar action was triggered!');
						});

						this.getTimesheetDetails({ 'contractid': this.contractId });

					} else if (!response.success) {
						// console.log(response);
					}
				},
				error => {
					// console.log(error);
				}
			);
	}

	changeVerifiedTime(rawValue) {
		// console.log(rawValue);
		const emptyString = '';
		const prefix = '0';
		const rawValueLength = rawValue.length;

		// if (rawValue != emptyString && (rawValue[0].concat(rawValue[1]) > 24)) {
		// 	this.editableRow.clock_verified_in = prefix.concat(rawValue);
		// }
		// console.log(this.fieldName1);
		// console.log(this.fieldName1.nativeElement.validity.valid);
	}

	public field1Editable(row, id) {
		// console.log('edit1 called');
		this.editRowId = id;
		this.editField = 'field1';
		setTimeout(() => { // this will make the execution after the above boolean has changed
			this.fieldName1.nativeElement.focus();
		}, 0);

		let clock_verified_in = this.datePipe.transform(row.clock_verified_in, 'HH:mm');
		let clock_verified_out = this.datePipe.transform(row.clock_verified_out, 'HH:mm');

		this.editableRow = {
			'timesheetdate': row.date,
			'clock_verified_in': clock_verified_in,
			'clock_verified_out': clock_verified_out,
			'contractid': row.contracts_id,
			'timesheetid': row.id
		};
	}

	public field2Editable(row, id) {
		// console.log('edit2 called');
		this.editRowId = id;
		this.editField = 'field2';
		setTimeout(() => { // this will make the execution after the above boolean has changed
			this.fieldName2.nativeElement.focus();
		}, 0);

		let clock_verified_in = this.datePipe.transform(row.clock_verified_in, 'HH:mm');
		let clock_verified_out = this.datePipe.transform(row.clock_verified_out, 'HH:mm');

		this.editableRow = {
			'timesheetdate': row.date,
			'clock_verified_in': clock_verified_in,
			'clock_verified_out': clock_verified_out,
			'contractid': row.contracts_id,
			'timesheetid': row.id
		};
	}

	public rowEditableOff() {
		// console.log('editoff called Esc');
		// console.log(event);
		this.editRowId = '';
		this.editField = '';
	}

	convertNextDay(date) {
		let previousDate = new Date(date);
		let nextday = new Date(previousDate.getTime() + 86400000); // + 1 hr in ms
		return nextday;
	}

	public rowEditableSubmit(editableRow, field) {
		if (field === 'field1' && !this.fieldName1.nativeElement.validity.valid) { return false; }
		if (field === 'field2' && !this.fieldName2.nativeElement.validity.valid) { return false; }
		// console.log('editoff called Enter');
		// this.editRowId = '';
		// this.editField = '';

		let jobStartTime: any = this.datePipe.transform(editableRow.timesheetdate + ' ' + this.contractDetails.job_start_time, 'yyyy-MM-dd HH:mm');

		// let inTime: any = this.datePipe.transform(editableRow.timesheetdate + ' ' + editableRow.clock_verified_in, 'yyyy-MM-dd HH:mm');
		// let outTime: any = this.datePipe.transform(editableRow.timesheetdate + ' ' + editableRow.clock_verified_out, 'yyyy-MM-dd HH:mm');

		// if (inTime > outTime) {
		// 	outTime = this.convertNextDay(outTime);
		// }

		let verifiedTime = {};
		if (field === 'field1') {
			let inTime: any = this.datePipe.transform(editableRow.timesheetdate + ' ' + editableRow.clock_verified_in, 'yyyy-MM-dd HH:mm');
			let clock_verified_in = { 'clock_verified_in': this.datePipe.transform(inTime, 'yyyy-MM-dd HH:mm') };
			verifiedTime = Object.assign(verifiedTime, clock_verified_in);

			// let clock_verified_out = { 'clock_verified_out': this.datePipe.transform(outTime, 'yyyy-MM-dd HH:mm') };
			// verifiedTime = Object.assign(verifiedTime, clock_verified_out);

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

		if (field === 'field2') {
			let outTime: any = this.datePipe.transform(editableRow.timesheetdate + ' ' + editableRow.clock_verified_out, 'yyyy-MM-dd HH:mm');
			let clock_verified_out = { 'clock_verified_out': this.datePipe.transform(outTime, 'yyyy-MM-dd HH:mm') };
			verifiedTime = Object.assign(verifiedTime, clock_verified_out);
		}

		// let contractid = { 'contractid': editableRow.contractid };
		// verifiedTime = Object.assign(verifiedTime, contractid);

		let timesheetid = { 'timesheet_id': editableRow.timesheetid };
		verifiedTime = Object.assign(verifiedTime, timesheetid);

		// console.log(verifiedTime);
		if (field == 'field1') {
			this.updatePunchin(verifiedTime);
		}

		if (field == 'field2') {
			this.updatePunchout(verifiedTime);
		}

		this.editRowId = '';
		this.editField = '';
	}

	getTimesheetDetails(TimeSheetArg) {
		this.busy = this._httpService.getTimesheetDetails(TimeSheetArg)
			.subscribe(
				response => {
					if (response.success) {
						if (isArray(response.result) && response.result.length > 0) {
							this.timesheets = response.result;
							this.dailyTimeSheetDataSource.data = this.timesheets;
							this.verifiedTimeSheets = this.timesheets.filter(data => data.sheet_verified == true);
						}
					} else if (!response.success) {
						this.timesheets = [];
						this.dailyTimeSheetDataSource.data = [];
						this.verifiedTimeSheets = [];
					}
				},
				error => {
					// console.log(error);
				}
			);
	}

	updatePunchin(verifiedTime) {
		this._httpService.updatePunchin(verifiedTime)
			.subscribe(
				response => {
					if (response.success) {
						// console.log('TimeSheet Adjusted');

						this.getTimesheetDetails({ 'contractid': this.contractId, 'from': this.activeTimesheetPeriod.startDate, 'to': this.activeTimesheetPeriod.endDate });

						// let snackBarRef = this.snackBar.open('TimeSheet Adjusted Successfully.', 'Close', {
						// 	duration: 5000,
						// });
						// snackBarRef.onAction().subscribe(() => {
						// 	snackBarRef.dismiss();
						// 	console.log('The snack-bar action was triggered!');
						// });

					} else if (!response.success) {
						// console.log(response);
					}
				},
				error => {
					// console.log(error);
				}
			);
	}

	updatePunchout(verifiedTime) {
		this._httpService.updatePunchout(verifiedTime)
			.subscribe(
				response => {
					if (response.success) {
						// console.log('TimeSheet Adjusted');

						this.getTimesheetDetails({ 'contractid': this.contractId, 'from': this.activeTimesheetPeriod.startDate, 'to': this.activeTimesheetPeriod.endDate });

						// let snackBarRef = this.snackBar.open('TimeSheet Adjusted Successfully.', 'Close', {
						// 	duration: 5000,
						// });
						// snackBarRef.onAction().subscribe(() => {
						// 	snackBarRef.dismiss();
						// 	console.log('The snack-bar action was triggered!');
						// });

					} else if (!response.success) {
						// console.log(response);
					}
				},
				error => {
					// console.log(error);
				}
			);
	}

	getDates(year, month, givenDate) {
		// console.log(this.contractId);
		// console.log(moment([year, month - 1]).endOf('month'));
		// let todayDate = moment().format('DD');
		if (Number(givenDate) <= 15) {
			this.activeTimesheetPeriod.startDate = moment([year, month - 1]).startOf('month').format('YYYY-MM-DD');
			this.activeTimesheetPeriod.endDate = moment([year, month - 1]).format('YYYY-MM-15');
			// console.log(this.activeTimesheetPeriod);
		} else if (Number(givenDate) > 15) {
			this.activeTimesheetPeriod.startDate = moment([year, month - 1]).format('YYYY-MM-16');
			// const endDate = moment([year, month - 1]).endOf('month').format('YYYY-MM-DD')
			this.activeTimesheetPeriod.endDate = moment([year, month - 1]).format('YYYY-MM-') + moment([year, month - 1]).daysInMonth();
			// console.log(this.activeTimesheetPeriod);
		}
		this.getTimesheetDetails({ 'contractid': this.contractId, 'from': this.activeTimesheetPeriod.startDate, 'to': this.activeTimesheetPeriod.endDate });
	}

	getPreviousDays() {
		let givenDate = moment(this.activeTimesheetPeriod.startDate).add(-1, 'days');
		let Year = givenDate.format('YYYY');
		let Month = givenDate.format('MM');
		let Day = givenDate.format('DD');
		this.getDates(Year, Month, Day);
	}

	getNextDays() {
		let givenDate = moment(this.activeTimesheetPeriod.endDate).add(1, 'days');
		let Year = givenDate.format('YYYY');
		let Month = givenDate.format('MM');
		let Day = givenDate.format('DD');
		this.getDates(Year, Month, Day);
	}

	getCurrentDays() {
		let givenDate = moment(new Date());
		let Year = givenDate.format('YYYY');
		let Month = givenDate.format('MM');
		let Day = givenDate.format('DD');
		this.getDates(Year, Month, Day);
	}

	NoteAction(TimeSheetData) {
		// console.log(TimeSheetData);

		let bottomSheetConfig = new MatDialogConfig();
		bottomSheetConfig.data = {
			'contractid': this.contractId,
			'timesheetid': TimeSheetData._id,
			'notes': TimeSheetData.notes,
			'date': TimeSheetData.date,
		};
		bottomSheetConfig.autoFocus = false;

		let bottomSheetRef = this.bottomSheet.open(TimesheetNotesComponent, bottomSheetConfig);

		bottomSheetRef.afterDismissed().subscribe((result) => {
			// console.log('Bottom sheet has been dismissed.');
			// console.log(result);
			if (result == undefined) { return false; }

			if (result.callback == true) {
				this.addTimesheetNotes(result);
			}
		});
	}

	addTimesheetNotes(notesData) {
		this._httpService.timesheetNotesUpdate(notesData)
			.subscribe(
				response => {
					if (response.success) {
						// console.log('TimeSheet Notes Updated');
						this.getTimesheetDetails({ 'contractid': this.contractId });

						let snackBarRef = this.snackBar.open('TimeSheet Notes Added Successfully.', 'Close', {
							duration: 5000,
						});

						snackBarRef.onAction().subscribe(() => {
							snackBarRef.dismiss();
							// console.log('The snack-bar action was triggered!');
						});
					} else if (!response.success) {
						// console.log(response);
					}
				},
				error => {
					// console.log(error);
				}
			);
	}

	LateReason(TimeSheetData) {
		// console.log(TimeSheetData);

		let bottomSheetConfig = new MatDialogConfig();
		bottomSheetConfig.data = {
			'contractid': this.contractId,
			'timesheetid': TimeSheetData._id,
			'latereason': TimeSheetData.latereason,
			'lateinitimatedat': TimeSheetData.lateintimatedat,
			'date': TimeSheetData.date,
		};

		let bottomSheetRef = this.bottomSheet.open(LatereasonComponent, bottomSheetConfig);

		bottomSheetRef.afterDismissed().subscribe((result) => {
			// console.log('Bottom sheet has been dismissed.');
		});
	}

	getSumOfNormalWorkHrs() {
		if (this.timesheets.length === 0) { return ''; }
		let totalMin = this.timesheets.map(t => t.normalworkhour).reduce((previous, current) => {
			let min = moment.duration(current).asMinutes();
			return previous + min;
		}, 0);

		let hrs = moment.duration(totalMin, 'minutes').format('hh:mm', {
			trim: false
		});
		// if (hrs == '0' || hrs == '00') return 'Nil';
		return hrs;
	}

	getSumOfOT1point5WorkHrs() {
		if (this.timesheets.length === 0) { return ''; }
		let totalMin = this.timesheets.filter(t => t.salarymultiplier == 1 || t.salarymultiplier == 1.5).map(t => t.otworkhour).reduce((previous, current) => {
			let min = moment.duration(current).asMinutes();
			return previous + min;
		}, 0);

		let hrs = moment.duration(totalMin, 'minutes').format('hh:mm', {
			trim: false
		});
		// if (hrs == '0' || hrs == '00') return 'Nil';
		return hrs;
	}

	getSumOfOT2WorkHrs() {
		if (this.timesheets.length === 0) { return ''; }
		let totalMin = this.timesheets.filter(t => t.salarymultiplier == 2).map(t => t.otworkhour).reduce((previous, current) => {
			let min = moment.duration(current).asMinutes();
			return previous + min;
		}, 0);

		let hrs = moment.duration(totalMin, 'minutes').format('hh:mm', {
			trim: false
		});
		// if (hrs == '0' || hrs == '00') return 'Nil';
		return hrs;
	}

	getSumOfTotalWorkHrs() {
		if (this.timesheets.length === 0) { return ''; }
		let totalMin = this.timesheets.map(t => t.totalworkhour).reduce((previous, current) => {
			let min = moment.duration(current).asMinutes();
			return previous + min;
		}, 0);

		let hrs = moment.duration(totalMin, 'minutes').format('hh:mm', {
			trim: false
		});
		// if (hrs == '0' || hrs == '00') return 'Nil';
		return hrs;
	}

	getSumOfNormalWorkHrSalary() {
		if (this.timesheets.length === 0) { return ''; }
		return this.timesheets.map(t => t.normalsalary).reduce((previous, current) => {
			return previous + current;
		}, 0);
	}

	getSumOfOT1point5WorkHrSalary() {
		if (this.timesheets.length === 0) { return ''; }
		return this.timesheets.filter(t => t.salarymultiplier == 1 || t.salarymultiplier == 1.5).map(t => t.otsalary).reduce((previous, current) => {
			return previous + current;
		}, 0);
	}

	getSumOfOT2WorkHrSalary() {
		if (this.timesheets.length === 0) { return ''; }
		return this.timesheets.filter(t => t.salarymultiplier == 2).map(t => t.otsalary).reduce((previous, current) => {
			return previous + current;
		}, 0);
	}

	getSumOfTotalWorkHrSalary() {
		if (this.timesheets.length === 0) { return ''; }
		return this.timesheets.map(t => t.totalsalary).reduce((previous, current) => {
			return previous + current;
		}, 0);
	}

	getSumOfTotalOogetCommision() {
		if (this.timesheets.length === 0) { return ''; }
		return this.timesheets.map(t => t.oogetscommission).reduce((previous, current) => {
			if (current == undefined) {
				current = 0;
			}
			return previous + current;
		}, 0);
	}

	getDateArray(start, end) {
		var arr = new Array();
		var dt = new Date(start);
		while (dt <= end) {
			arr.push(new Date(dt));
			dt.setDate(dt.getDate() + 1);
		}
		return arr;
	}

	disagreePuchTime(timesheetData, event) {
		// console.log(event.checked);
		if (event.checked === true) { return false; }
		let dialogConfig = new MatDialogConfig();
		dialogConfig.disableClose = true;
		dialogConfig.autoFocus = true;
		dialogConfig.data = {
			'contractid': this.contractId,
			'timesheetid': timesheetData.id,
			'date': new Date(timesheetData.date),
			'punchintime': new Date(timesheetData.punchintime),
			'punchouttime': new Date(timesheetData.punchouttime),
			'clock_verified_in': new Date(timesheetData.clock_verified_in),
			'clock_verified_out': new Date(timesheetData.clock_verified_out)
		};
		let dialogRef = this.dialog.open(EditClockInOutComponent, dialogConfig);

		dialogRef.afterClosed().subscribe(result => {
			// console.log(result);
			this.checked = true;
			if (result === undefined) { return false; }
			if (result.callback === true) {
				this.AdjustTime(result);
			}
		});
	}

	AdjustTime(verifiedTime) {
		this._httpService.timesheetAdjust(verifiedTime)
			.subscribe(
				response => {
					if (response.success) {
						// console.log('TimeSheet Adjusted');
						this.getTimesheetDetails({ 'contractid': this.contractId });
						// let snackBarRef = this.snackBar.open('TimeSheet Adjusted Successfully.', 'Close', {
						// 	duration: 5000,
						// });
						// snackBarRef.onAction().subscribe(() => {
						// 	snackBarRef.dismiss();
						// 	console.log('The snack-bar action was triggered!');
						// });

					} else if (!response.success) {
						// console.log(response);
					}
				},
				error => {
					// console.log(error);
				}
			);
	}

	generatePayroll() {
		if (this.verifiedTimeSheets.length == 0) { return false; }

		this._httpService.generatepayroll({ 'contractid': this.contractId })
			.subscribe(
				response => {
					if (response.success) {
						// console.log('Payroll Generated');
						// console.log(response);

						// this.getContractDetails({ 'contractid': this.contractId });
						this.getTimesheetDetails({ 'contractid': this.contractId });

						this.payroll.processPayroll(response.payroll.payrollheader, response.payroll.payrollbody);

						// this.processPayrollGenerate(response.payroll);
						// let snackBarRef = this.snackBar.open('Selected TimeSheets Verified Successfully.', 'Close', {
						// 	duration: 5000,
						// });

						// snackBarRef.onAction().subscribe(() => {
						// 	snackBarRef.dismiss();
						// 	console.log('The snack-bar action was triggered!');
						// });

					} else if (!response.success) {
						// console.log(response);
					}
				},
				error => {
					// console.log(error);
				}
			);
	}

	ngOnInit() {
	}

}
