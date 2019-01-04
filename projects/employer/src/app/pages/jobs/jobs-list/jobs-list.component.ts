import { Component, OnInit, ViewEncapsulation, Input, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiCallService } from '../../../services/api-call.service';
import { PaginationInstance } from 'ngx-pagination';
import { MenuPositionX, MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-jobs-list',
	templateUrl: './jobs-list.component.html',
	styleUrls: ['./jobs-list.component.scss'],
})
export class JobsListComponent implements OnInit {

	//Mat Menu Configuration
	@Input() xPosition: MenuPositionX
	@Input() overlapTrigger: boolean

	public pageSizeOptions = [3, 6, 12, 24, 48, 96];

	// Tab1 Pagination config
	public tab1PaginateConfig: PaginationInstance = {
		id: 'tab1',
		itemsPerPage: 6,
		currentPage: 1
	};
	public tab1search;
	public tab1Filter: string = '';
	public tab1PaginateControlMaxSize: number = 10;
	public tab1PaginateControlAutoHide: boolean = true;

	// Tab2 Pagination config
	public tab2PaginateConfig: PaginationInstance = {
		id: 'tab2',
		itemsPerPage: 3,
		currentPage: 1
	};
	public tab2search;
	public tab2Filter: string = '';
	public tab2PaginateControlMaxSize: number = 10;
	public tab2PaginateControlAutoHide: boolean = true;

	// Tab3 Pagination config
	public tab3PaginateConfig: PaginationInstance = {
		id: 'tab3',
		itemsPerPage: 3,
		currentPage: 1
	};
	public tab3search;
	public tab3Filter: string = '';
	public tab3PaginateControlMaxSize: number = 10;
	public tab3PaginateControlAutoHide: boolean = true;

	// Tab4 Pagination config
	public tab4PaginateConfig: PaginationInstance = {
		id: 'tab4',
		itemsPerPage: 3,
		currentPage: 1
	};
	public tab4search;
	public tab4Filter: string = '';
	public tab4PaginateControlMaxSize: number = 10;
	public tab4PaginateControlAutoHide: boolean = true;

	//set filtered jobs
	public jobs_list_all: any[];
	public jobs_list_pending: any[];
	public jobs_list_live: any[];
	public jobs_list_closed: any[];

	//set Job Lists
	public isJobsListAllAvailable: boolean;
	public isJobsListPendingAvailable: boolean;
	public isJobsListLiveAvailable: boolean;
	public isJobsListClosedAvailable: boolean;

	//busy Config
	busy: Subscription;

	constructor(private _httpService: ApiCallService, private route: ActivatedRoute, public snackBar: MatSnackBar) {
		let employerId = {
			companyid: localStorage.getItem('ogCompanyObjID'),
		}
		this.getSingleEmployersJobsList(employerId);
	}

	getSingleEmployersJobsList(employerId) {
		this.busy = this._httpService.getSingleEmployersJobsList(employerId)
			.subscribe(
				response => {
					if (response.success) {
						if ((response.jobs).length > 0) {
							//get all jobs
							this.jobs_list_all = response.jobs;
							if ((this.jobs_list_all).length > 0) {
								this.isJobsListAllAvailable = true;
							} else {
								this.isJobsListAllAvailable = false;
							}

							//filter pending Jobs
							this.jobs_list_pending = response.jobs.filter((book: any) => book.jobstatus === "pending");
							if ((this.jobs_list_pending).length > 0) {
								this.isJobsListPendingAvailable = true;
							} else {
								this.isJobsListPendingAvailable = false;
							}

							//filter live jobs
							this.jobs_list_live = response.jobs.filter((book: any) => book.jobstatus === "live");
							if ((this.jobs_list_live).length > 0) {
								this.isJobsListLiveAvailable = true;
							} else {
								this.isJobsListLiveAvailable = false;
							}

							//filter closed jobs
							this.jobs_list_closed = response.jobs.filter((book: any) => book.jobstatus === "closed");
							if ((this.jobs_list_closed).length > 0) {
								this.isJobsListClosedAvailable = true;
							} else {
								this.isJobsListClosedAvailable = false;
							}
						} else {
							this.isJobsListAllAvailable = false;
							this.isJobsListPendingAvailable = false;
							this.isJobsListLiveAvailable = false;
							this.isJobsListClosedAvailable = false;
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

	closeJob(jobId) {
		this.busy = this._httpService.closeJob({ 'companyid': localStorage.getItem('ogCompanyObjID'), jobid: jobId, jobstatus: 'closed' })
			.subscribe(
				response => {
					if (response.success) {
						console.log(response);
						this.getSingleEmployersJobsList({ 'companyid': localStorage.getItem('ogCompanyObjID') });
						let snackBarRef = this.snackBar.open('Job Closed Successfully.', 'Close', {
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

	ngOnInit() { }

}
