import { Component, OnInit, ViewEncapsulation, Input, HostListener, ViewChild } from '@angular/core';
import { ApiCallService } from '../../../services/api-call.service';
import { ActivatedRoute } from '@angular/router';
import { PaginationInstance } from 'ngx-pagination';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { MenuPositionX } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';
import { ConfirmDialogComponent } from '../../../confirm-dialog/confirm-dialog.component';

@Component({
	selector: 'app-jobs-list',
	templateUrl: './jobs-list.component.html',
	styleUrls: ['./jobs-list.component.scss']
})
export class JobsListComponent implements OnInit {

	// set filtered jobs
	public allJobs: any[] = [];
	public pendingJobs: any[] = [];
	public liveJobs: any[] = [];
	public closedJobs: any[] = [];

	// set Job Lists
	public isJobsAvailable: boolean;

	// set Company Details
	public companyDetails: any = '';

	// busy Config
	busy: Subscription;

	constructor(private _httpService: ApiCallService, private route: ActivatedRoute, public snackBar: MatSnackBar, public dialog: MatDialog) {
	}

	// get employers jobs list
	getSingleEmployersJobsList(employerId): any {
		this.busy = this._httpService.getSingleEmployersJobsList(employerId)
			.subscribe(
				response => {
					if (response.success) {
						if (response.result.length > 0) {
							let jobsList = response.result;
							this.isJobsAvailable = true;

							// let jobs = response.jobs;
							// jobsList.map(job => {
							// 	return Object.assign(job, { 'companyid': this.companyDetails });
							// });

							// get all jobs
							this.allJobs = jobsList;

							// filter pending Jobs
							this.pendingJobs = jobsList.filter((job: any) => job.status == 1);

							// filter live jobs
							this.liveJobs = jobsList.filter((job: any) => job.status == 2);

							// filter closed jobs
							this.closedJobs = jobsList.filter((job: any) => job.status == 3);
							console.log(jobsList);
						} else {
							this.isJobsAvailable = false;
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

	closeJob(event) {
		let dialogConfig = new MatDialogConfig();

		dialogConfig.disableClose = true;
		dialogConfig.autoFocus = true;
		dialogConfig.data = {
			// boxTitle:"Confirmation",
			confirmMsg: '<h4>Do you want to close Hiring for this Job ?</h4>',
			okButtonText: 'Yes',
			noButtonText: 'No',
			actionalign: 'center'
		};
		let dialogref = this.dialog.open(ConfirmDialogComponent, dialogConfig);

		dialogref.afterClosed().subscribe(
			data => {
				if (data == 'yes') {
					this.ConfirmCloseJob(event.employerId, event.jobId)
				} else if (data == 'no') {
					console.log('Dont Close');
				}
			}
		);
	}

	ConfirmCloseJob(employerId, jobId) {
		this.busy = this._httpService.changeJobHiringStatus({ jobid: jobId, recruitmentopen: 0 })
			.subscribe(
				response => {
					if (response.success) {
						console.log(response);
						this.getSingleEmployersJobsList({ 'employerid': employerId });
						let snackBarRef = this.snackBar.open('Hiring Closed Successfully.', 'Close', {
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

	getEmployerDetails(employerId) {
		this.busy = this._httpService.getEmployer(employerId)
			.subscribe(
				response => {
					if (response.success) {
						this.companyDetails = response.result[0];
						// console.log(this.companyDetails);
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
		// let employerId = {
		// 	companyid: this.route.snapshot.params['emp_id'],
		// };
		this.getSingleEmployersJobsList({ 'employerid': this.route.snapshot.params['emp_id'] });
		this.getEmployerDetails({ 'employerid': this.route.snapshot.params['emp_id'] });
	}
}
