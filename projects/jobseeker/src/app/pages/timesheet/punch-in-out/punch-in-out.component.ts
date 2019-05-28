import { Component, OnInit, HostListener, ViewChild, OnDestroy } from '@angular/core';
import { ApiCallService } from '../../../services/api-call.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { MatSnackBar, MatDialogConfig, MatDialog, MatButtonToggleGroup } from '@angular/material';
import { DatePipe } from '@angular/common';
import { ConfirmDialogComponent } from '../../../confirm-dialog/confirm-dialog.component';
import * as moment from 'moment';
import 'moment-duration-format';

@Component({
	selector: 'app-punch-in-out',
	templateUrl: './punch-in-out.component.html',
	styleUrls: ['./punch-in-out.component.scss']
})
export class PunchInOutComponent implements OnInit, OnDestroy {
	defaultActiveContract = 5;
	showActiveContract = 5;
	busy: Subscription; // busy Config
	busyA: Subscription;

	public contract_jobs_list: any[] = [];
	public isContractJobsAvailable: boolean;

	public activeContracts: any[] = [];
	public isActiveContractsAvailable;

	public completedContracts: any[] = [];
	public isCompletedContractsAvailable;

	public isContractDetails: boolean;
	public isContractJobDetails: boolean;
	public contractJobDetails: any;
	public isTimeInHide: boolean;
	public isTimeOutHide: boolean;
	public inTime;
	public outTime;
	public ispunchedIn;
	public ispunchedOut;
	public currentTimeSheetLayout: any;

	public punchBehaviour = 'Normal';
	public punchLateReason;

	public isContractStarted: boolean;
	public isContractEnded: boolean;

	@ViewChild('toggleGroup1') toggleGroup1: MatButtonToggleGroup;
	@ViewChild('toggleGroup2') toggleGroup2: MatButtonToggleGroup;

	doReset1() {
		if (this.toggleGroup1 == undefined) return false;
		this.toggleGroup1.value = null;
	}

	doReset2() {
		if (this.toggleGroup2 == undefined) return false;
		this.toggleGroup2.value = null;
	}

	constructor(private _httpService: ApiCallService, private route: ActivatedRoute, public snackBar: MatSnackBar, private datePipe: DatePipe, public dialog: MatDialog) {
		this.getContractJobsList();
	}

	waitUntillInMin;
	contractId;
	contractStatus;

	public waitTime = new Observable<any>((observer: Subscriber<any>) => {
		let CurrentDate = moment().format("YYYY/MM/DD");

		let waitTimeInHrMin;
		if (this.waitUntillInMin >= 60) {
			waitTimeInHrMin = moment.duration(this.waitUntillInMin, "minutes").format("HH:mm");
		} else {
			waitTimeInHrMin = '00:' + this.waitUntillInMin;
		}

		let waitTimeWithDate = new Date(CurrentDate + " " + waitTimeInHrMin);
		let remainingWaitTimeInHr = moment(waitTimeWithDate).format("HH");
		let remainingWaitTimeInMin = moment(waitTimeWithDate).format("mm");

		let parsedTime = '';
		if (remainingWaitTimeInHr !== '00') {
			parsedTime += remainingWaitTimeInHr + "Hr ";
		}
		parsedTime += remainingWaitTimeInMin + "Mins"

		observer.next(parsedTime);

		let remainingWaitTimeWithDate = new Date(waitTimeWithDate.getTime() - 3600);
		let remainingWaitTimeInHrMin = moment(remainingWaitTimeWithDate).format("HH:mm");
		this.waitUntillInMin = moment.duration(remainingWaitTimeInHrMin).asMinutes();

		let intervel = setInterval(() => {
			let CurrentDate = moment().format("YYYY/MM/DD");
			let waitTimeInHrMin;
			if (this.waitUntillInMin >= 60) {
				waitTimeInHrMin = moment.duration(this.waitUntillInMin, "minutes").format("HH:mm");
			} else {
				waitTimeInHrMin = '00:' + this.waitUntillInMin;
			}

			let waitTimeWithDate = new Date(CurrentDate + " " + waitTimeInHrMin);
			let remainingWaitTimeInHr = moment(waitTimeWithDate).format("HH");
			let remainingWaitTimeInMin = moment(waitTimeWithDate).format("mm");

			let parsedTime = '';
			if (remainingWaitTimeInHr !== '00') {
				parsedTime += remainingWaitTimeInHr + "Hr ";
			}
			parsedTime += remainingWaitTimeInMin + "Mins"

			observer.next(parsedTime);
			console.log('call start' + this.waitUntillInMin);
			if (this.waitUntillInMin == 0) {
				console.log('call end' + this.waitUntillInMin);
				observer.complete();
				clearInterval(intervel);
				this.getContractTodayTimesheet(this.contractId);
			}

			let remainingWaitTimeWithDate = new Date(waitTimeWithDate.getTime() - 3600);
			let remainingWaitTimeInHrMin = moment(remainingWaitTimeWithDate).format("HH:mm");
			this.waitUntillInMin = moment.duration(remainingWaitTimeInHrMin).asMinutes();
		}, 60000);
	});

	getContractJobsList() {
		this.busyA = this._httpService.getContractJobsList()
			.subscribe(
				response => {
					if (response.success) {
						if ((response.result).length > 0) {
							this.isContractJobsAvailable = true;
							this.contract_jobs_list = response.result;

							this.activeContracts = response.result.filter((data: any) => data.deleted === 0);
							if ((this.activeContracts).length > 0) {
								this.isActiveContractsAvailable = true;
							} else {
								this.isActiveContractsAvailable = false;
							}

							this.completedContracts = response.result.filter((data: any) => data.deleted === 1);
							if ((this.completedContracts).length > 0) {
								this.isCompletedContractsAvailable = true;
							} else {
								this.isCompletedContractsAvailable = false;
							}

						} else {
							this.isContractJobsAvailable = false;
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

	convertNextDay(date) {
		let previousDate = new Date(date);
		let nextday = new Date(previousDate.getTime() + 86400000); // + 1 hr in ms
		return nextday;
	}

	getContractTodayTimesheet(contractId) {
		this.isContractDetails = false;
		this.waitUntillInMin == 0;
		this.busy = this._httpService.getContractTodayTimesheet({ 'contract_id': contractId })
			.subscribe(
				response => {
					if (response.success) {
						this.isContractDetails = true;
						this.currentTimeSheetLayout = response.result;
						console.log(typeof response.result);
						this.waitUntillInMin = response.waittill;
						this.contractId = response.contractid;
						if (typeof this.currentTimeSheetLayout.result === 'object') {
							this.contractStatus = 'open';
							this.ispunchedIn = this.currentTimeSheetLayout.result.clock_in == null ? false : true;
							this.ispunchedOut = this.currentTimeSheetLayout.result.clock_out == null ? false : true;
							console.log(this.ispunchedIn);
							this.inTime = this.currentTimeSheetLayout.result.clock_in;
							this.outTime = this.currentTimeSheetLayout.result.clock_out;
							console.log(this.inTime);
						}

						if (this.currentTimeSheetLayout.includes('')) {

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

	getContractDetails(contractId) {
		// this.isContractDetails = false;
		// this.isContractJobDetails = false;
		this.busy = this._httpService.getContractDetails({ 'contractid': contractId })
			.subscribe(
				response => {
					if (response.success) {
						this.isContractDetails = true;
						this.isContractJobDetails = true;
						this.contractJobDetails = response.contract;
						let contract_jobs_timesheet = response.contract.timesheet;

						let contactStartDate = response.contract.jobid.jobperiodfrom;
						// contactStartDate = contactStartDate.split("/").reverse().join("/");

						let today = this.datePipe.transform(Date.now(), 'y/MM/dd', '+0800');
						this.isContractStarted = today >= contactStartDate;
						console.log(this.isContractStarted);

						let contractEndDate = response.contract.jobid.jobperiodto;
						this.isContractEnded = today > contractEndDate;
						console.log(this.isContractEnded);

						//get matched object
						// let todaysheet = contract_jobs_timesheet.filter(item => item.date == this.datePipe.transform(Date.now(), 'y/MM/dd', '+0800'));

						//set empty
						// this.inTime = '';
						// this.outTime = '';

						// if (todaysheet.length != 0) {
						// 	//check keys in object
						// 	this.isTimeInHide = Object.keys(todaysheet[0]).some(item => item == 'punchintime');
						// 	console.log(this.isTimeInHide);
						// 	if (this.isTimeInHide) { this.inTime = todaysheet[0].punchintime }
						// 	this.isTimeOutHide = Object.keys(todaysheet[0]).some(item => item == 'punchouttime');
						// 	if (this.isTimeOutHide) { this.outTime = todaysheet[0].punchouttime }
						// } else {
						// 	this.isTimeInHide = false;
						// 	this.isTimeOutHide = true;
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

	punchIn(contractid, timesheetid) {
		this.busy = this._httpService.punchIn({ 'contractid': contractid, 'timesheetid': timesheetid })
			.subscribe(
				response => {
					if (response.success) {

						// this.isTimeInHide = true;
						// this.isTimeOutHide = false;

						// this.inTime = response.punchin[0].timesheet[0].punchintime;

						// let contract_jobs_timesheet = response.punchin[0].timesheet;
						//get matched object
						// let todaysheet = contract_jobs_timesheet.filter(item => item.date == this.datePipe.transform(Date.now(), 'y/MM/dd'));
						// console.log(todaysheet);

						// if (todaysheet.length != 0) {
						// 	this.inTime = todaysheet[0].punchintime;
						// }
						this.ispunchedIn = true;
						this.ispunchedOut = false;
						this.currentTimeSheetLayout.timesheet.punchedin = true;
						this.inTime = response.punchin;

						// this.inTime = todaysheet[0].punchintime
						let snackBarRef = this.snackBar.open('TimeIn Success.', 'Close', {
							duration: 5000,
						});

						snackBarRef.onAction().subscribe(() => {
							snackBarRef.dismiss();
							console.log('The snack-bar action was triggered!');
						});
					} else if (!response.success) {
						if (response.message == 'verifiedalready') {
							let snackBarRef = this.snackBar.open('You Cannot Punch In, Please check with your Employer', 'Close', {
								duration: 5000,
							});

							snackBarRef.onAction().subscribe(() => {
								snackBarRef.dismiss();
								console.log('The snack-bar action was triggered!');
							});
						}
					}
				},
				error => {
					console.log(error);
				}
			);
	}

	punchOut(contractid, timesheetid) {
		this.busy = this._httpService.punchOut({ 'contractid': contractid, 'timesheetid': timesheetid })
			.subscribe(
				response => {
					if (response.success) {

						// this.isTimeInHide = true;
						// this.isTimeOutHide = true;
						// this.outTime = response.punchout[0].timesheet[0].punchouttime;

						// let contract_jobs_timesheet = response.punchout[0].timesheet;
						//get matched object
						// let todaysheet = contract_jobs_timesheet.filter(item => item.date == this.datePipe.transform(Date.now(), 'y/MM/dd'));

						// if (todaysheet.length != 0) {
						// 	this.outTime = todaysheet[0].punchouttime;
						// }
						this.ispunchedIn = true;
						this.ispunchedOut = true;
						this.currentTimeSheetLayout.timesheet.punchedout = true;
						this.outTime = response.punchout;
						let snackBarRef = this.snackBar.open('TimeOut Success.', 'Close', {
							duration: 5000,
						});

						snackBarRef.onAction().subscribe(() => {
							snackBarRef.dismiss();
							console.log('The snack-bar action was triggered!');
						});
					} else if (!response.success) {
						if (response.message == 'verifiedalready') {
							let snackBarRef = this.snackBar.open('You Cannot Punch Out, Please check with your Employer', 'Close', {
								duration: 5000,
							});

							snackBarRef.onAction().subscribe(() => {
								snackBarRef.dismiss();
								console.log('The snack-bar action was triggered!');
							});
						} else if (response.message == 'punchinfirst') {
							let snackBarRef = this.snackBar.open('You are not yet Punched In', 'Close', {
								duration: 5000,
							});

							snackBarRef.onAction().subscribe(() => {
								snackBarRef.dismiss();
								console.log('The snack-bar action was triggered!');
							});
						} else {
							// let inTime = new Date(response.verifiedpunchintime);
							let inTime = new Date(response.punchintime);
							let waitTime = new Date(inTime.getTime() + 900000);
							let parsedWaitTime = this.datePipe.transform(waitTime, 'dd/MM/yyyy HH:mm');
							let snackBarRef = this.snackBar.open('Please Wait Until ' + parsedWaitTime + ' To PunchOut.', 'Close', {
								duration: 10000,
							});

							snackBarRef.onAction().subscribe(() => {
								snackBarRef.dismiss();
								console.log('The snack-bar action was triggered!');
							});
						}
					}
				},
				error => {
					console.log(error);
				}
			);
	}

	showContactOogetDialog(event) {
		if (event.value == 'Sick') {
			let dialogConfig = new MatDialogConfig();

			dialogConfig.disableClose = true;
			dialogConfig.autoFocus = true;
			dialogConfig.data = {
				// boxTitle:"Confirmation",
				confirmMsg: "<h4>Please contact Ooget Admin at 62483537</h4>",
				okButtonText: "Ok",
				noButtonText: "",
				actionalign: "center"
			};
			let dialogref = this.dialog.open(ConfirmDialogComponent, dialogConfig);

			dialogref.afterClosed().subscribe(
				data => {
					console.log(data);
				}
			);
		}
	}

	submitLateReason(contractid, timesheetid, lateReasonForm) {
		this._httpService.sendPunchLateReason({ 'contractid': contractid, 'timesheetid': timesheetid, 'latereason': this.punchLateReason })
			.subscribe(
				response => {
					if (response.success) {
						console.log(response);
						this.currentTimeSheetLayout.timesheet.lateintimation = true;
						lateReasonForm.resetForm();
						let snackBarRef = this.snackBar.open("Your Late Intimation Sent Successfully", 'Close', {
							duration: 5000,
						});

						snackBarRef.afterDismissed().subscribe(() => {
							this.punchBehaviour = "Normal";
							console.log('The snack-bar was dismissed');
						});

						snackBarRef.onAction().subscribe(() => {
							this.punchBehaviour = "Normal";
							console.log('The snack-bar action was triggered!');
						});

						snackBarRef.dismiss();

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
		// let today = Date.now();
		// console.log(this.datePipe.transform(Date.now(), 'y/MM/d'));
	}

	ngOnDestroy() {
		if (this.busy) {
			this.busy.unsubscribe();
		}
	}
}
