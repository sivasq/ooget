import { Component, OnInit, Input, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiCallService } from '../../../services/api-call.service';
import { MenuPositionX } from '@angular/material';
import { PaginationInstance } from 'ngx-pagination';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-jobs-list',
	templateUrl: './jobs-list.component.html',
	styleUrls: ['./jobs-list.component.scss']
})
export class JobsListComponent implements OnInit {

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
	public allJobsCount: Number;

	//set jobs array
	public jobs_list_all: any[];

	constructor(private _httpService: ApiCallService, private route: ActivatedRoute) {
		let employerId = {
			// companyid: localStorage.getItem('ogCompanyObjID'),
		}
		this.getActiveJobsList();
	}

	getActiveJobsList() {
		this.busy = this._httpService.getSingleEmployersJobsList()
			.subscribe(
				response => {
					if (response.success) {
						if ((response.jobs).length > 0) {
							this.jobs_list_all = response.jobs;
							if ((this.jobs_list_all).length > 0) {
								this.isJobsListAllAvailable = true;
							} else {
								this.isJobsListAllAvailable = false;
							}
						} else {
							// this.isJobsAvailable = false;
						}
						console.log(response);
						// this.jobs_list = response.jobs;
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