import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiCallService } from '../../../services/api-call.service';
import { Subscription } from 'rxjs';
// import { Angular5Csv } from 'angular5-csv/Angular5-csv';
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

	public today = new Date();

	public contract_id;
	public contractDetails;
	public contractJobDetails;
	public contractorDetails;
	public verifiedTimeSheets;
	public payrollsList: any[] = [];

	public checked = true;

	public contractorPayrolls = [
		{
			"datefrom": "2018/05/16",
			"dateto": "2018/05/31",
			"totalnormalworkhr": "112",
			"totalotworkhr": "20",
			"totalnormalworkhrsalary": "1232",
			"totalothrsalary": "440",
			"totalsalary": "1672",
			"paymentstatus": "paid",
			"paiddate": "2018/05/31",
			"paymenttype": "neft",
			"verified": "true",
			"timesheet": [
				{ "date": "2018/05/16", "punchintime": "09:30", "punchouttime": "16:30", "normalworkhr": "7", "otworkhr": "0", "totalworkhr": "7", "normalworkhrsalary": "70", "othrsalary": "0", "totalsalary": "70" },
				{ "date": "2018/05/17", "punchintime": "09:30", "punchouttime": "16:30", "normalworkhr": "7", "otworkhr": "0", "totalworkhr": "7", "normalworkhrsalary": "70", "othrsalary": "0", "totalsalary": "70" },
				{ "date": "2018/05/18", "punchintime": "09:30", "punchouttime": "16:30", "normalworkhr": "7", "otworkhr": "0", "totalworkhr": "7", "normalworkhrsalary": "70", "othrsalary": "0", "totalsalary": "70" },
				{ "date": "2018/05/19", "punchintime": "09:30", "punchouttime": "16:30", "normalworkhr": "7", "otworkhr": "0", "totalworkhr": "7", "normalworkhrsalary": "70", "othrsalary": "0", "totalsalary": "70" },
				{ "date": "2018/05/20", "punchintime": "09:30", "punchouttime": "16:30", "normalworkhr": "7", "otworkhr": "0", "totalworkhr": "7", "normalworkhrsalary": "70", "othrsalary": "0", "totalsalary": "70" },
				{ "date": "2018/05/21", "punchintime": "09:30", "punchouttime": "16:30", "normalworkhr": "7", "otworkhr": "0", "totalworkhr": "7", "normalworkhrsalary": "70", "othrsalary": "0", "totalsalary": "70" },
				{ "date": "2018/05/22", "punchintime": "09:30", "punchouttime": "16:30", "normalworkhr": "7", "otworkhr": "0", "totalworkhr": "7", "normalworkhrsalary": "70", "othrsalary": "0", "totalsalary": "70" },
				{ "date": "2018/05/23", "punchintime": "09:30", "punchouttime": "16:30", "normalworkhr": "7", "otworkhr": "0", "totalworkhr": "7", "normalworkhrsalary": "70", "othrsalary": "0", "totalsalary": "70" },
				{ "date": "2018/05/24", "punchintime": "09:30", "punchouttime": "16:30", "normalworkhr": "7", "otworkhr": "0", "totalworkhr": "7", "normalworkhrsalary": "70", "othrsalary": "0", "totalsalary": "70" },
				{ "date": "2018/05/25", "punchintime": "09:30", "punchouttime": "16:30", "normalworkhr": "7", "otworkhr": "0", "totalworkhr": "7", "normalworkhrsalary": "70", "othrsalary": "0", "totalsalary": "70" },
				{ "date": "2018/05/26", "punchintime": "09:30", "punchouttime": "16:30", "normalworkhr": "7", "otworkhr": "0", "totalworkhr": "7", "normalworkhrsalary": "70", "othrsalary": "0", "totalsalary": "70" },
				{ "date": "2018/05/27", "punchintime": "09:30", "punchouttime": "16:30", "normalworkhr": "7", "otworkhr": "0", "totalworkhr": "7", "normalworkhrsalary": "70", "othrsalary": "0", "totalsalary": "70" },
				{ "date": "2018/05/28", "punchintime": "09:30", "punchouttime": "16:30", "normalworkhr": "7", "otworkhr": "0", "totalworkhr": "7", "normalworkhrsalary": "70", "othrsalary": "0", "totalsalary": "70" },
				{ "date": "2018/05/29", "punchintime": "09:30", "punchouttime": "16:30", "normalworkhr": "7", "otworkhr": "0", "totalworkhr": "7", "normalworkhrsalary": "70", "othrsalary": "0", "totalsalary": "70" },
				{ "date": "2018/05/30", "punchintime": "09:30", "punchouttime": "16:30", "normalworkhr": "7", "otworkhr": "0", "totalworkhr": "7", "normalworkhrsalary": "70", "othrsalary": "0", "totalsalary": "70" },
				{ "date": "2018/05/31", "punchintime": "09:30", "punchouttime": "16:30", "normalworkhr": "7", "otworkhr": "0", "totalworkhr": "7", "normalworkhrsalary": "70", "othrsalary": "0", "totalsalary": "70" },
			]
		},
		{
			"datefrom": "2018/06/01",
			"dateto": "2018/06/15",
			"totalnormalworkhr": "105",
			"totalotworkhr": "18",
			"totalnormalworkhrsalary": "1155",
			"totalothrsalary": "396",
			"totalsalary": "1551",
			"paymentstatus": "not paid",
			"paiddate": "",
			"paymenttype": "",
			"verified": "false",
			"timesheet": [
				{ "date": "2018/06/1", "punchintime": "09:30", "punchouttime": "16:30", "normalworkhr": "7", "otworkhr": "0", "totalworkhr": "7", "normalworkhrsalary": "70", "othrsalary": "0", "totalsalary": "70" },
				{ "date": "2018/06/2", "punchintime": "09:30", "punchouttime": "16:30", "normalworkhr": "7", "otworkhr": "0", "totalworkhr": "7", "normalworkhrsalary": "70", "othrsalary": "0", "totalsalary": "70" },
				{ "date": "2018/06/3", "punchintime": "09:30", "punchouttime": "16:30", "normalworkhr": "7", "otworkhr": "0", "totalworkhr": "7", "normalworkhrsalary": "70", "othrsalary": "0", "totalsalary": "70" },
				{ "date": "2018/06/4", "punchintime": "09:30", "punchouttime": "16:30", "normalworkhr": "7", "otworkhr": "0", "totalworkhr": "7", "normalworkhrsalary": "70", "othrsalary": "0", "totalsalary": "70" },
				{ "date": "2018/06/5", "punchintime": "09:30", "punchouttime": "16:30", "normalworkhr": "7", "otworkhr": "0", "totalworkhr": "7", "normalworkhrsalary": "70", "othrsalary": "0", "totalsalary": "70" },
				{ "date": "2018/06/6", "punchintime": "09:30", "punchouttime": "16:30", "normalworkhr": "7", "otworkhr": "0", "totalworkhr": "7", "normalworkhrsalary": "70", "othrsalary": "0", "totalsalary": "70" },
				{ "date": "2018/06/7", "punchintime": "09:30", "punchouttime": "16:30", "normalworkhr": "7", "otworkhr": "0", "totalworkhr": "7", "normalworkhrsalary": "70", "othrsalary": "0", "totalsalary": "70" },
				{ "date": "2018/06/8", "punchintime": "09:30", "punchouttime": "16:30", "normalworkhr": "7", "otworkhr": "0", "totalworkhr": "7", "normalworkhrsalary": "70", "othrsalary": "0", "totalsalary": "70" },
				{ "date": "2018/06/9", "punchintime": "09:30", "punchouttime": "16:30", "normalworkhr": "7", "otworkhr": "0", "totalworkhr": "7", "normalworkhrsalary": "70", "othrsalary": "0", "totalsalary": "70" },
				{ "date": "2018/06/10", "punchintime": "09:30", "punchouttime": "16:30", "normalworkhr": "7", "otworkhr": "0", "totalworkhr": "7", "normalworkhrsalary": "70", "othrsalary": "0", "totalsalary": "70" },
				{ "date": "2018/06/11", "punchintime": "09:30", "punchouttime": "16:30", "normalworkhr": "7", "otworkhr": "0", "totalworkhr": "7", "normalworkhrsalary": "70", "othrsalary": "0", "totalsalary": "70" },
				{ "date": "2018/06/12", "punchintime": "09:30", "punchouttime": "16:30", "normalworkhr": "7", "otworkhr": "0", "totalworkhr": "7", "normalworkhrsalary": "70", "othrsalary": "0", "totalsalary": "70" }]
		}
	]

	//busy Config
	busy: Subscription;

	timesheets: any = [];

	dailyTimeSheetDataSource = new MatTableDataSource(this.timesheets);
	displayedColumns = ['select', 'work_date', 'in_time', 'out_time', 'verifiedpunchintime', 'verifiedpunchouttime', 'normalworkhour', 'ot1workhour', 'ot2workhour', 'totalworkhour', 'normalsalary', 'ot1salary', 'ot2salary', 'totalsalary', 'oogetscommission', 'lateinitimation', 'notedialogtrigger'];
	selection = new SelectionModel(true, []);

	public csvOptions = {
		fieldSeparator: ',',
		quoteStrings: '',
		decimalseparator: '.',
		showLabels: true,
		showTitle: false,
		title: 'title',
		useBom: true,
		noDownload: false,
		headers: ["date", "punchintime", "punchouttime", "normalworkhr", "otworkhr", "totalworkhr", "normalworkhrsalary", "othrsalary", "totalsalary", "paystatus", "paiddate", "paymenttype"]
	};

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
		this.getAllPayrollsInContract({ 'contractid': this.contract_id });
	}

	/** Whether the number of selected elements matches the total number of rows. */
	isAllSelected() {
		// console.log(this.selection);
		const numSelected = this.selection.selected.length;
		// const numRows = this.dailyTimeSheetDataSource.data.length;
		const numRows = this.dailyTimeSheetDataSource.data.filter((data: any) => !data.verified).length;
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

	generatePayroll() {
		if (this.verifiedTimeSheets.length == 0) return false;

		this._httpService.generatepayroll({ 'contractid': this.contract_id })
			.subscribe(
				response => {
					if (response.success) {
						console.log("Payroll Generated");
						console.log(response);

						this.getContractDetails({ 'contractid': this.contract_id });
						this.getTimesheetDetails({ 'contractid': this.contract_id });

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
						console.log(response);
					}
				},
				error => {
					console.log(error);
				}
			);
	}
	// ================================================================================
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

	// public verifiedTimeMask = [/[0-9]/, /\d/, ':', /\d/, /\d/];
	// keepCharPositions = true;

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
		// console.log(editableRow);
		// console.log(field);
		// this.editRowId = '';
		// this.editField = '';

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

	// ================================================================================
	getContractDetails(contractId) {
		this.busy = this._httpService.getContractDetails(contractId)
			.subscribe(
				response => {
					if (response.success) {
						this.contractDetails = response.contract;
						this.contractJobDetails = response.contract.jobid;
						this.contractorDetails = response.contract.jobseekerid;
						// this.timesheets = response.contract.timesheet;
						// this.dailyTimeSheetDataSource.data = this.timesheets;

						// if (this.timesheets.length > 0) {
						// 	this.verifiedTimeSheets = this.timesheets.filter(data => data.verified == true);
						// }

					} else if (!response.success) {
						console.log(response);
					}
				},
				error => {
					console.log(error);
				}
			);
	}

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

	downloadTimesheet(timesheetData) {
		// new Angular5Csv(timesheetData, 'TimeSheet', this.csvOptions);
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
	}

	AdjustTime(verifiedTime) {
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
	}

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

	ngOnInit() {

		// this.contractorTimesheet.sort(
		// 	function (a, b) {
		// 		return new Date(b.date).getTime() - new Date(a.date).getTime()
		// 	});
		// let demo = [{
		// 	'data': '5656',
		// 	'data1': '45645',
		// }]
		// console.log(demo);

		this.contractorPayrolls.sort(
			function (a, b) {
				return new Date(b.datefrom).getTime() - new Date(a.datefrom).getTime()
			});
		// console.log(this.contractorPayrolls);

		let hrs = moment.duration(0, "minutes").format("hh:mm", {
			trim: false
		});
		console.log(hrs);
	}

	// ==================================

	public OffDays: any[] = [];

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

	checkPastDay(offDayDate) {
		let today = this.datePipe.transform(Date.now(), 'y/MM/dd', '+0800');
		return today >= offDayDate;
	}

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

	getAllPayrollsInContract(contractId) {
		this.busy = this._httpService.getAllPayrollsInContract(contractId)
			.subscribe(
				response => {
					if (response.success) {
						console.log(response.payrolls);
						this.payrollsList = response.payrolls;
						this.payrollsList.sort(
							function (a, b) {
								return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
							});
						console.log(this.payrollsList);

					} else if (!response.success) {
						console.log(response);
					}
				},
				error => {
					console.log(error);
				}
			);
	}

	// =====================================

	getSumOfNormalWorkHrs() {
		let totalMin = this.timesheets.map(t => t.normalworkhour).reduce((previous, current) => {
			let min = moment.duration(current).asMinutes();
			return previous + min
		}, 0);

		let hrs = moment.duration(totalMin, "minutes").format("hh:mm", {
			trim: false
		});
		// if (hrs == '0' || hrs == '00') return 'Nil';
		return hrs;
	}

	getSumOfOT1point5WorkHrs() {
		let totalMin = this.timesheets.filter(t => t.salarymultiplier == 1 || t.salarymultiplier == 1.5).map(t => t.otworkhour).reduce((previous, current) => {
			let min = moment.duration(current).asMinutes();
			return previous + min
		}, 0);

		let hrs = moment.duration(totalMin, "minutes").format("hh:mm", {
			trim: false
		});
		// if (hrs == '0' || hrs == '00') return 'Nil';
		return hrs;
	}

	getSumOfOT2WorkHrs() {
		let totalMin = this.timesheets.filter(t => t.salarymultiplier == 2).map(t => t.otworkhour).reduce((previous, current) => {
			let min = moment.duration(current).asMinutes();
			return previous + min
		}, 0);

		let hrs = moment.duration(totalMin, "minutes").format("hh:mm", {
			trim: false
		});
		// if (hrs == '0' || hrs == '00') return 'Nil';
		return hrs;
	}

	getSumOfTotalWorkHrs() {
		let totalMin = this.timesheets.map(t => t.totalworkhour).reduce((previous, current) => {
			let min = moment.duration(current).asMinutes();
			return previous + min
		}, 0);

		let hrs = moment.duration(totalMin, "minutes").format("hh:mm", {
			trim: false
		});
		// if (hrs == '0' || hrs == '00') return 'Nil';
		return hrs;
	}

	getSumOfNormalWorkHrSalary() {
		return this.timesheets.map(t => t.normalsalary).reduce((previous, current) => {
			return previous + current
		}, 0);
	}

	getSumOfOT1point5WorkHrSalary() {
		return this.timesheets.filter(t => t.salarymultiplier == 1 || t.salarymultiplier == 1.5).map(t => t.otsalary).reduce((previous, current) => {
			return previous + current
		}, 0);
	}

	getSumOfOT2WorkHrSalary() {
		return this.timesheets.filter(t => t.salarymultiplier == 2).map(t => t.otsalary).reduce((previous, current) => {
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

	public payrollCsvOptions = {
		fieldSeparator: ',',
		quoteStrings: '',
		decimalseparator: '.',
		showLabels: false,
		showTitle: false,
		title: 'PayRoll',
		useBom: true,
		noDownload: false,
		// headers: ["H01 Record Type", "H02 File Creation Date", "H03 Organization ID", "H04 Sender Name", "D01 Record Type", "D02 Product Type", "D03 Originating Account Number", "D04 Originating Account Currency", "D05 Customer Reference or Batch Reference", "D06 Payment Currency", "D07 Batch ID", "D08 Payment Date", "D09 Bank Charges", "D10 Debit Account for Bank Charges", "D11 Receiving Party Name", "D12 Payable To", "D13 Receiving Party Address 1", "D14 Receiving Party Address 2", "D15 Receiving Party Address 3", "D16 Receiving Account Number/IBAN", "D17 Country Specific", "D18 Receiving Bank Code", "D19 Receiving Branch Code", "D20 Clearing Code", "D21 Beneficiary Bank SWIFT BIC", "D22 Beneficiary Bank Name", "D23 Beneficiary Bank Address", "D24 Beneficiary Bank Country", "D25 Routing Code", "D26 Intermediary Bank SWIFT BIC", "D27 Amount Currency", "D28 Amount", "D29 FX Contract Reference 1", "D30 Amount to be Utilized 1", "D31 FX Contract Reference 2", "D32 Amount to be Utilized 2", "D33 Transaction Code", "D34 Particulars / Beneficary or Payer Reference", "D35 DDA Reference (SG HK collection) or Reference", "D36 Payment Details", "D37 Instruction to Ordering Bank", "D38 Beneficiary Resident Status", "D39 Beneficiary Category", "D40 Transaction Relationship", "D41 Payee Role", "D42 Remitter Identity", "D43 Purpose of Payment", "D44 Supplementary Info", "D45 Delivery Mode", "D46 Print At Location/Pick Up Location", "D47 Payable Location", "D48 Mail to Party Name", "D49 Mail to Party Address 1", "D50 Mail to Party Address 2", "D51 Mail to Party Address 3", "D52 Reserved Field", "D53 Postal Code", "D54 Email 1", "D55 Email 2", "D56 Email 3", "D57 Email 4", "D58 Email 5", "D59 Phone Number 1", "D60 Phone Number 2", "D61 Phone Number 3", "D62 Phone Number 4", "D63 Phone Number 5", "D64 Invoice Details", "D65 Client Reference 1", "D66 Client Reference 2", "D67 Client Reference 3", "D68 Client Reference 4", "T01 Record Type", "T02 Total No. of Transactions", "T03 Total Transaction Amount"]
	};

	processPayrollGenerateold(payrollData) {
		console.log("payroll generated");
		let today = new Date();
		let newData: any[] = [];
		let oldData: any[] = [];
		oldData.push(payrollData);
		if (oldData.length > 0) {
			for (let i = 0; i < oldData.length; i++) {
				newData.push({
					'H01 Record Type': 'HEADER',
					'H02 File Creation Date': this.datePipe.transform(today, 'ddMMyyyy'),
					'H03 Organization ID': oldData[i].organizationid ? oldData[i].organizationid : 'OrgID',
					'H04 Sender Name': oldData[i].companyname ? oldData[i].companyname : 'COMPANYNAME',
					'D01 Record Type': 'PAYMENT',
					'D02 Product Type': oldData[i].producttype ? oldData[i].producttype : '',
					'D03 Originating Account Number': oldData[i].originatingaccountnumber ? oldData[i].originatingaccountnumber : '',
					'D04 Originating Account Currency': oldData[i].originatingaccountcurrency ? oldData[i].originatingaccountcurrency : '',
					'D05 Customer Reference or Batch Reference': oldData[i].CustomerReference ? oldData[i].CustomerReference : '',
					'D06 Payment Currency': oldData[i].paymentcurrency ? oldData[i].paymentcurrency : '',
					'D07 Batch ID': oldData[i].batchid ? oldData[i].batchid : '',
					'D08 Payment Date': this.datePipe.transform(today, 'ddMMyyyy'),
					'D09 Bank Charges': oldData[i].BankCharges ? oldData[i].BankCharges : '',
					'D10 Debit Account for Bank Charges': oldData[i].DebitAccountforBankCharges ? oldData[i].DebitAccountforBankCharges : '',
					'D11 Receiving Party Name': oldData[i].benificaryname ? oldData[i].benificaryname : '',
					'D12 Payable To': oldData[i].PayableTo ? oldData[i].PayableTo : '',
					'D13 Receiving Party Address 1': oldData[i].ReceivingPartyAddress1 ? oldData[i].ReceivingPartyAddress1 : '',
					'D14 Receiving Party Address 2': oldData[i].ReceivingPartyAddress2 ? oldData[i].ReceivingPartyAddress2 : '',
					'D15 Receiving Party Address 3': oldData[i].ReceivingPartyAddress3 ? oldData[i].ReceivingPartyAddress3 : '',

					'D16 Receiving Account Number/IBAN': oldData[i].benificaryaccountnumber ? oldData[i].benificaryaccountnumber : '',

					'D17 Country Specific': oldData[i].CountrySpecific ? oldData[i].CountrySpecific : "01",

					'D18 Receiving Bank Code': oldData[i].receivingbankcode ? oldData[i].receivingbankcode : '',
					'D19 Receiving Branch Code': oldData[i].receivingbranchcode ? oldData[i].receivingbranchcode : '',

					'D20 Clearing Code': oldData[i].ClearingCode ? oldData[i].ClearingCode : '',
					'D21 Beneficiary Bank SWIFT BIC': oldData[i].BeneficiaryBankSWIFTBIC ? oldData[i].BeneficiaryBankSWIFTBIC : '',
					'D22 Beneficiary Bank Name': oldData[i].BeneficiaryBankName ? oldData[i].BeneficiaryBankName : '',
					'D23 Beneficiary Bank Address': oldData[i].BeneficiaryBankAddress ? oldData[i].BeneficiaryBankAddress : '',
					'D24 Beneficiary Bank Country': oldData[i].BeneficiaryBankCountry ? oldData[i].BeneficiaryBankCountry : '',
					'D25 Routing Code': oldData[i].RoutingCode ? oldData[i].RoutingCode : '',
					'D26 Intermediary Bank SWIFT BIC': oldData[i].IntermediaryBankSWIFTBIC ? oldData[i].IntermediaryBankSWIFTBIC : '',

					'D27 Amount Currency': oldData[i].AmountCurrency ? oldData[i].AmountCurrency : '0',

					'D28 Amount': oldData[i].amount ? oldData[i].amount : '',

					'D29 FX Contract Reference 1': oldData[i].FXContractReference1 ? oldData[i].FXContractReference1 : '',
					'D30 Amount to be Utilized 1': oldData[i].AmounttobeUtilized1 ? oldData[i].AmounttobeUtilized1 : '',
					'D31 FX Contract Reference 2': oldData[i].FXContractReference2 ? oldData[i].FXContractReference2 : '',
					'D32 Amount to be Utilized 2': oldData[i].AmounttobeUtilized2 ? oldData[i].AmounttobeUtilized2 : '',
					'D33 Transaction Code': oldData[i].TransactionCode ? oldData[i].TransactionCode : '',
					'D34 Particulars / Beneficary or Payer Reference': oldData[i].BeneficaryorPayerReference ? oldData[i].BeneficaryorPayerReference : '',
					'D35 DDA Reference (SG HK collection) or Reference': oldData[i].DDAReference ? oldData[i].DDAReference : '',
					'D36 Payment Details': oldData[i].PaymentDetails ? oldData[i].PaymentDetails : '',
					'D37 Instruction to Ordering Bank': oldData[i].average1 ? oldData[i].name : '',
					'D38 Beneficiary Resident Status': oldData[i].InstructiontoOrderingBank ? oldData[i].InstructiontoOrderingBank : '',
					'D39 Beneficiary Category': oldData[i].BeneficiaryCategory ? oldData[i].BeneficiaryCategory : '',
					'D40 Transaction Relationship': oldData[i].TransactionRelationship ? oldData[i].TransactionRelationship : '',
					'D41 Payee Role': oldData[i].PayeeRole ? oldData[i].PayeeRole : '',
					'D42 Remitter Identity': oldData[i].RemitterIdentity ? oldData[i].RemitterIdentity : '',
					'D43 Purpose of Payment': oldData[i].PurposeofPayment ? oldData[i].PurposeofPayment : '',
					'D44 Supplementary Info': oldData[i].SupplementaryInfo ? oldData[i].SupplementaryInfo : '',

					'D45 Delivery Mode': oldData[i].deliverymode ? oldData[i].deliverymode : 'B',

					'D46 Print At Location/Pick Up Location': oldData[i].PickUpLocation ? oldData[i].PickUpLocation : '',
					'D47 Payable Location': oldData[i].PayableLocation ? oldData[i].PayableLocation : '',
					'D48 Mail to Party Name': oldData[i].MailtoPartyName ? oldData[i].MailtoPartyName : '',
					'D49 Mail to Party Address 1': oldData[i].MailtoPartyAddress1 ? oldData[i].MailtoPartyAddress1 : '',
					'D50 Mail to Party Address 2': oldData[i].MailtoPartyAddress2 ? oldData[i].MailtoPartyAddress2 : '',
					'D51 Mail to Party Address 3': oldData[i].MailtoPartyAddress3 ? oldData[i].MailtoPartyAddress3 : '',
					'D52 Reserved Field': oldData[i].ReservedField ? oldData[i].ReservedField : '',
					'D53 Postal Code': oldData[i].PostalCode ? oldData[i].PostalCode : '',

					'D54 Email 1': oldData[i].email1 ? oldData[i].email1 : '',

					'D55 Email 2': oldData[i].Email2 ? oldData[i].Email2 : '',
					'D56 Email 3': oldData[i].Email3 ? oldData[i].Email3 : '',
					'D57 Email 4': oldData[i].Email4 ? oldData[i].Email4 : '',
					'D58 Email 5': oldData[i].Email5 ? oldData[i].Email5 : '',
					'D59 Phone Number 1': oldData[i].PhoneNumber1 ? oldData[i].PhoneNumber1 : '',
					'D60 Phone Number 2': oldData[i].PhoneNumber2 ? oldData[i].PhoneNumber2 : '',
					'D61 Phone Number 3': oldData[i].PhoneNumber3 ? oldData[i].PhoneNumber3 : '',
					'D62 Phone Number 4': oldData[i].PhoneNumber4 ? oldData[i].PhoneNumber4 : '',
					'D63 Phone Number 5': oldData[i].PhoneNumber5 ? oldData[i].PhoneNumber5 : '',
					'D64 Invoice Details': oldData[i].invoicedetails ? oldData[i].invoicedetails : '',

					'D65 Client Reference 1': oldData[i].ClientReference1 ? oldData[i].ClientReference1 : '',
					'D66 Client Reference 2': oldData[i].ClientReference2 ? oldData[i].ClientReference2 : '',
					'D67 Client Reference 3': oldData[i].ClientReference3 ? oldData[i].ClientReference3 : '',
					'D68 Client Reference 4': oldData[i].ClientReference4 ? oldData[i].ClientReference4 : '',

					'T01 Record Type': 'TRAILER',
					'T02 Total No. of Transactions': oldData[i].totalnooftransactions ? oldData[i].totalnooftransactions : '',
					'T03 Total Transaction Amount': oldData[i].totaltransactionamount ? oldData[i].totaltransactionamount : '',
				})
			}
		}
		// let csvData = new Angular5Csv(newData, 'payroll ' + this.datePipe.transform(today, 'MMMd,y,HH:mm'), this.payrollCsvOptions);
		let csvData = this.texts.textInit(newData, 'payroll ' + this.datePipe.transform(today, 'MMMd,y,HH:mm'), this.payrollCsvOptions);
	}

	processPayrollGenerate(payrollData) {
		console.log(payrollData);
		this.payroll.processPayroll(payrollData.payrollheader, payrollData.payrollbody);
	}
}
