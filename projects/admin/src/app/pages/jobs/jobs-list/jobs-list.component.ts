import { Component, OnInit, ViewEncapsulation, Input, HostListener, ViewChild } from '@angular/core';
import { ApiCallService } from '../../../services/api-call.service';
import { ActivatedRoute } from '@angular/router';
import { PaginationInstance } from 'ngx-pagination';
import { MenuPositionX, MatSnackBar, MatDialog, MatDialogConfig } from '@angular/material';
import { Subscription } from 'rxjs';
import { ConfirmDialogComponent } from '../../../confirm-dialog/confirm-dialog.component';

@Component({
	selector: 'app-jobs-list',
	templateUrl: './jobs-list.component.html',
	styleUrls: ['./jobs-list.component.scss']
})
export class JobsListComponent implements OnInit {

	// public pageSizeOptions = [3, 6, 12, 24, 48, 96];

	//Mat Menu Configuration
	// @Input() xPosition: MenuPositionX
	// @Input() overlapTrigger: boolean

	// Tab1 Pagination config
	// public tab1PaginateConfig: PaginationInstance = {
	// 	id: 'tab1',
	// 	itemsPerPage: 6,
	// 	currentPage: 1
	// };
	// public tab1search;
	// public tab1Filter: string = '';
	// public tab1PaginateControlMaxSize: number = 5;
	// public tab1PaginateControlAutoHide: boolean = true;

	// Tab2 Pagination config
	// public tab2PaginateConfig: PaginationInstance = {
	// 	id: 'tab2',
	// 	itemsPerPage: 6,
	// 	currentPage: 1
	// };
	// public tab2search;
	// public tab2Filter: string = '';
	// public tab2PaginateControlMaxSize: number = 5;
	// public tab2PaginateControlAutoHide: boolean = true;

	// Tab3 Pagination config
	// public tab3PaginateConfig: PaginationInstance = {
	// 	id: 'tab3',
	// 	itemsPerPage: 6,
	// 	currentPage: 1
	// };
	// public tab3search;
	// public tab3Filter: string = '';
	// public tab3PaginateControlMaxSize: number = 5;
	// public tab3PaginateControlAutoHide: boolean = true;

	// Tab4 Pagination config
	// public tab4PaginateConfig: PaginationInstance = {
	// 	id: 'tab4',
	// 	itemsPerPage: 6,
	// 	currentPage: 1
	// };
	// public tab4search;
	// public tab4Filter: string = '';
	// public tab4PaginateControlMaxSize: number = 5;
	// public tab4PaginateControlAutoHide: boolean = true;

	//set filtered jobs
	public allJobs: any[] = [];
	public pendingJobs: any[] = [];
	public liveJobs: any[] = [];
	public closedJobs: any[] = [];

	//set Job Lists
	public isJobsAvailable: boolean;

	//set Company Details
	public companyDetails: any = '';

	//busy Config
	busy: Subscription;

	constructor(private _httpService: ApiCallService, private route: ActivatedRoute, public snackBar: MatSnackBar, public dialog: MatDialog) { }

	//get employers jobs list
	getSingleEmployersJobsList(employerId): any {
		this.busy = this._httpService.getSingleEmployersJobsList(employerId)
			.subscribe(
				response => {
					if (response.success) {
						this.companyDetails = response.company;
						if (response.jobs.length > 0) {
							this.isJobsAvailable = true;

							// let jobs = response.jobs;
							response.jobs.map(job => {
								return Object.assign(job, { "companyid": this.companyDetails });
							});

							//get all jobs
							this.allJobs = response.jobs;

							//filter pending Jobs
							this.pendingJobs = response.jobs.filter((book: any) => book.jobstatus === "pending");

							//filter live jobs
							this.liveJobs = response.jobs.filter((book: any) => book.jobstatus === "live");

							//filter closed jobs
							this.closedJobs = response.jobs.filter((book: any) => book.jobstatus === "closed");
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
			confirmMsg: "<h4>Do you want to close Hiring for this Job ?</h4>",
			okButtonText: "Yes",
			noButtonText: "No",
			actionalign: "center"
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
		this.busy = this._httpService.closeJobHiring({ jobid: jobId, hiringstatus: 'closed' })
			.subscribe(
				response => {
					if (response.success) {
						console.log(response);
						this.getSingleEmployersJobsList({ 'companyid': employerId });
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

	ngOnInit() {
		let employerId = {
			companyid: this.route.snapshot.params['emp_id'],
		}
		this.getSingleEmployersJobsList(employerId);
	}
}
