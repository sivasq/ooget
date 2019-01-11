import { Component, OnInit, HostListener } from '@angular/core';
import { ApiCallService } from '../../../services/api-call.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatRadioChange, MatDialogConfig, MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../../../confirm-dialog/confirm-dialog.component';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-job-details',
	templateUrl: './job-details.component.html',
	styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {

	public jobDetails: any = [];

	public companyDetails: any = [];

	//busy Config
	busy: Subscription;

	objectKeys = Object.keys;
	public btnName: string = "";
	public rejectBtnName: string = "";
	public isApplied: boolean = false;
	public isNotApplied: boolean = false;
	public isOffered: boolean = false;
	public isUnderContract: boolean = false;
	public isOfferRejected: boolean = false;
	public helpTxt1: string;

	public appliedCandidates: any = [];
	public offeredCandidates: any = [];
	public CandidatesUnderContract: any = [];
	public offerRejected: any = [];
	userId;

	constructor(public router: Router, private _httpService: ApiCallService, private route: ActivatedRoute, public snackBar: MatSnackBar, public dialog: MatDialog) {
		this.userId = localStorage.getItem('ogUserObjID');

		let jobId = {
			jobid: this.route.snapshot.params['job_id'],
		}
		this.getJobDetails(jobId);
		// this.getProfileActiveStatus();
	}

	isInArray(array, word) {
		// console.log(array.indexOf(word));
		// console.log(array.includes(word));
		// console.log(array.indexOf(word) > -1);
		// console.log(array.indexOf(word.toLowerCase()) > -1);
		return array.includes(word);
	}

	isInArrayOfObjects(arrayOfObjects, word) {
		return arrayOfObjects.filter(e => e.name === word).length > 0;
	}

	getJobDetails(jobId) {
		this.busy = this._httpService.getJobDetails(jobId)
			.subscribe(
				response => {
					if (response.success) {
						this.jobDetails = response.job;
						this.companyDetails = response.job.companyid;
						this.appliedCandidates = response.job.jobseekers;
						// this.offeredCandidates = response.job.candidatesseleceted;
						// this.CandidatesUnderContract = response.job.candidatessigned;
						// this.offerRejected = response.job.rejectedcandidates;

						// let isUnderContract = this.isInArray(this.CandidatesUnderContract, this.userId);
						// let isOfferRejected = this.isInArray(this.offerRejected, this.userId);
						// let isUnderOffered = this.isInArray(this.offeredCandidates, this.userId);
						// let isUnderApplied = this.isInArray(this.appliedCandidates, this.userId);

						let isUnderContract = this.appliedCandidates.filter(e => e.jobseekerid === this.userId && e.accepted).length > 0;
						let isOfferRejected = this.appliedCandidates.filter(e => e.jobseekerid === this.userId && e.rejected).length > 0;
						let isUnderOffered = this.appliedCandidates.filter(e => e.jobseekerid === this.userId && e.offered).length > 0;
						let isUnderApplied = this.appliedCandidates.filter(e => e.jobseekerid === this.userId && e.applied).length > 0;

						if (isUnderContract) {
							this.isUnderContract = true;
							this.isOfferRejected = false;
							this.isOffered = false;
							this.isApplied = false;
							this.isNotApplied = false;
							this.btnName = '';
							this.helpTxt1 = 'Contract Signed In';
						} else if (isOfferRejected) {
							this.isUnderContract = false;
							this.isOfferRejected = true;
							this.isOffered = false;
							this.isApplied = false;
							this.isNotApplied = false;
							this.btnName = '';
							this.helpTxt1 = 'Offer Rejected';
						} else if (isUnderOffered) {
							this.isUnderContract = false;
							this.isOfferRejected = false;
							this.isOffered = true;
							this.isApplied = false;
							this.isNotApplied = false;
							this.btnName = 'Accept This Job Offer';
							this.rejectBtnName = 'Reject This Job Offer';
							this.helpTxt1 = 'Job Offered';
						} else if (isUnderApplied) {
							this.isUnderContract = false;
							this.isOfferRejected = false;
							this.isOffered = false;
							this.isApplied = true;
							this.isNotApplied = false;
							this.btnName = "";
							this.helpTxt1 = "Pending Job Offer";
						} else if (!isUnderApplied) {
							this.isUnderContract = false;
							this.isOfferRejected = false;
							this.isOffered = false;
							this.isApplied = false;
							this.isNotApplied = true;
							this.btnName = "Apply This Job";
						}

						// console.log(this.isUnderContract);
						// console.log(this.isOfferRejected);
						// console.log(this.isOffered);
						// console.log(this.isApplied);
						// console.log(this.isNotApplied);

					} else if (!response.success) {
						console.log(response);
					}
				},
				error => {
					console.log(error);
				}
			);
	}

	async sendApplication(jobId) {
		// let activeStatus = localStorage.getItem('ogActiveStatus');
		let response = await this._httpService.getProfileDetails().toPromise();
		if (response.message.activestatus == false) {
			let dialogConfig = new MatDialogConfig();

			dialogConfig.disableClose = true;
			dialogConfig.autoFocus = true;
			dialogConfig.data = {
				// boxTitle:"Confirmation",
				confirmMsg: "<h4>Oh! Sorry! Your Account Still not Activated.</h4>",
				okButtonText: "Ok",
				noButtonText: "",
				actionalign: "center"
			};
			let dialogref = this.dialog.open(ConfirmDialogComponent, dialogConfig);

			dialogref.afterClosed().subscribe(data => console.log('Dialog Closed'));
		} else if (response.message.activestatus == true) {
			this.continueSendApplication(jobId);
		}
	}

	saveJob(jobId) {

	}
	continueSendApplication(jobId) {
		console.log(jobId);
		this._httpService.sendJobApplication({ jobid: jobId })
			.subscribe(
				response => {
					if (response.success) {
						console.log(response);

						this.isNotApplied = false;

						if (response.message == "contractsigned") {
							this.isUnderContract = true;
							this.isOfferRejected = false;
							this.isOffered = false;
							this.isApplied = false;
							this.btnName = '';
							this.helpTxt1 = "You have Successfully Applied & Contract Signed In for this Job.";
						}

						if (response.message == "joboffered") {
							this.isUnderContract = false;
							this.isOfferRejected = false;
							this.isOffered = true;
							this.isApplied = false;
							this.btnName = 'Accept This Job Offer';
							this.helpTxt1 = 'You have been offered to this job'
						}

						if (response.message == "applicationsuccess") {
							this.isUnderContract = false;
							this.isOfferRejected = false;
							this.isOffered = false;
							this.isApplied = true;
							this.btnName = "";
							this.helpTxt1 = "Application Sent";
						}

						if (response.message == "contractsigned") {
							let snackBarRef = this.snackBar.open(this.helpTxt1, 'Goto TimeSheet', {
								duration: 10000,
							});

							snackBarRef.onAction().subscribe(() => {
								snackBarRef.dismiss();
								this.router.navigate(['main/timesheet/punch']);
								console.log('The snack-bar action was triggered!');
							});

						} else {
							let snackBarRef = this.snackBar.open(this.helpTxt1, 'Close', {
								duration: 5000,
							});

							snackBarRef.onAction().subscribe(() => {
								snackBarRef.dismiss();
								console.log('The snack-bar action was triggered!');
							});
						}

					} else if (!response.success) {
						console.log(response);
						if (response.message == "conflictjob") {
							let snackBarRef = this.snackBar.open('The Job you are applying is clashing with other job(Already you are under Contract) Timing', 'Close', {
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

	acceptOffer(jobId) {
		let dialogConfig = new MatDialogConfig();
		dialogConfig.disableClose = true;
		dialogConfig.autoFocus = true;
		dialogConfig.data = {
			boxTitle: "Confirmation",
			confirmMsg: "<p>Are You Sure to Accept This Job Offer ?</p>",
			okButtonText: "Yes",
			noButtonText: "No",
			actionalign: "center"
		};
		let dialogref = this.dialog.open(ConfirmDialogComponent, dialogConfig);

		dialogref.afterClosed().subscribe(
			data => {
				// this.confirmResponse(data)
				if (data == 'yes') {
					this.ConfirmAcceptOffer(jobId);
				} else if (data == 'no') {
					console.log('no');
				}
			}
		);
	}

	ConfirmAcceptOffer(jobId) {
		console.log(jobId);
		this._httpService.acceptOffer({ jobid: jobId, contractstatus: 'open' })
			.subscribe(
				response => {
					if (response.success) {
						console.log(response);
						this.isUnderContract = true;
						this.isOfferRejected = false;
						this.isOffered = false;
						this.isApplied = false;
						this.isNotApplied = false;
						this.helpTxt1 = 'Contract Signed In'
						const snackBarRef = this.snackBar.open('You have Successfully Accepted New Job Contract.', 'Close', {
							duration: 5000,
						});

						snackBarRef.onAction().subscribe(() => {
							snackBarRef.dismiss();
							console.log('The snack-bar action was triggered!');
						});

					} else if (!response.success) {
						console.log(response);
						if (response.message == "conflictjob") {
							let snackBarRef = this.snackBar.open('The Job you are applying is clashing with other job(Already you are under Contract) Timing', 'Close', {
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

	rejectOffer(jobId) {
		let dialogConfig = new MatDialogConfig();
		dialogConfig.disableClose = true;
		dialogConfig.autoFocus = true;
		dialogConfig.data = {
			boxTitle: "Confirmation",
			confirmMsg: "<p>Are You Sure to Reject This Job Offer ?</p>",
			okButtonText: "Yes",
			noButtonText: "No",
			actionalign: "center"
		};
		let dialogref = this.dialog.open(ConfirmDialogComponent, dialogConfig);

		dialogref.afterClosed().subscribe(
			data => {
				// this.confirmResponse(data)
				if (data == 'yes') {
					this.ConfirmRejectOffer(jobId);
				} else if (data == 'no') {
					console.log('no');
				}
			}
		);
	}

	ConfirmRejectOffer(jobId) {
		console.log(jobId);
		this._httpService.rejectOffer({ jobid: jobId, contractstatus: 'open' })
			.subscribe(
				response => {
					if (response.success) {
						console.log(response);
						this.isUnderContract = false;
						this.isOfferRejected = true;
						this.isOffered = false;
						this.isApplied = false;
						this.isNotApplied = false;
						this.helpTxt1 = 'Offer Rejected'
						const snackBarRef = this.snackBar.open('You have Successfully Rejected Job Offer.', 'Close', {
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

	ngOnInit() {
		let userId = "5aaf96720bb68d18dcfcffb3";
		let appliedjobseekers: any = [
			{
				"jobseekerid": "5aaf96720bb68d18dcfcffb3",
				"status": "applied",
				"applied": true,
				"offered": true,
				"appliedAt": "2018/08/09 11:43:59",
				"_id": "5b6bdba72007d827506c38e5"
			}
		]

		let isUnderContract = appliedjobseekers.filter(e => e.jobseekerid === userId && e.accepted).length > 0;
		let isOfferRejected = appliedjobseekers.filter(e => e.jobseekerid === userId && e.rejected).length > 0;
		let isUnderOffered = appliedjobseekers.filter(e => e.jobseekerid === userId && e.offered).length > 0;
		let isUnderApplied = appliedjobseekers.filter(e => e.jobseekerid === userId && e.applied).length > 0;

		console.log('Applied', isUnderApplied);
		console.log('Offered', isUnderOffered);
		console.log('Rejected', isOfferRejected);
		console.log('Accepted', isUnderContract);
	}
}
