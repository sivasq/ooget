import { Component, OnInit, Input, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiCallService } from '../../../services/api-call.service';
import { MenuPositionX } from '@angular/material';
import { PaginationInstance } from 'ngx-pagination';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-applied-jobs',
	templateUrl: './applied-jobs.component.html',
	styleUrls: ['./applied-jobs.component.scss']
})
export class AppliedJobsComponent implements OnInit {

	//busy Config
	busy: Subscription;

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

	//set jobs availability
	public isJobsListAllAvailable: boolean;
	public matchedJobsCount: Number;

	//set jobs array
	public applied_jobs_list: any[];

	constructor(private _httpService: ApiCallService, private route: ActivatedRoute) {
		let employerId = {
			// companyid: localStorage.getItem('ogCompanyObjID'),
		}
		this.getAppliedJobsList();
	}

	getAppliedJobsList() {
		this.busy = this._httpService.getAppliedJobsList()
			.subscribe(
				response => {
					if (response.success) {
						if ((response.appliedjobs).length > 0) {
							this.applied_jobs_list = response.appliedjobs;
							if ((this.applied_jobs_list).length > 0) {
								this.isJobsListAllAvailable = true;
							} else {
								this.isJobsListAllAvailable = false;
							}
						} else {
							// this.isJobsAvailable = false;
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

	ngOnInit() { }

}