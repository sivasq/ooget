import { Component, OnInit, Input, HostListener } from '@angular/core';
import { ApiCallService } from '../../../services/api-call.service';
import { ActivatedRoute } from '@angular/router';
import { MenuPositionX } from '@angular/material';
import { PaginationInstance } from 'ngx-pagination';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { JsonToTextService } from '../../../services/json-to-text.service';
import { PayrollProcessService } from '../../../services/payroll-process.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-livejobs',
	templateUrl: './livejobs.component.html',
	styleUrls: ['./livejobs.component.scss']
})
export class LivejobsComponent implements OnInit {

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

	//set pending jobs availability
	public isLiveJobAvailable: boolean = false;
	public liveJobCount: Number;

	//set pending jobs array
	public jobs_list_live: any[];

	constructor(private _httpService: ApiCallService, private route: ActivatedRoute, public datePipe: DatePipe, public toUpperCase: UpperCasePipe, public texts: JsonToTextService, public payroll: PayrollProcessService) {
		this.getLiveJobsList();
	}

	getPendingJobsList() {
		this.busy = this._httpService.getPendingJobsList()
			.subscribe(
				response => {
					if (response.success) {
						if ((response.pendingjobs).length > 0) {
							this.isLiveJobAvailable = true;
						} else {
							this.isLiveJobAvailable = false;
						}

						// console.log(response.pendingjobs);
						this.jobs_list_live = response.pendingjobs;

					} else if (!response.success) {

						console.log(response);
					}
				},
				error => {
					console.log(error);
				}
			);
	}

	getLiveJobsList(): any {
		this.busy = this._httpService.getSingleEmployersJobsList({ companyid: '5c30634988c71614a016d064' })
			.subscribe(
				response => {
					if (response.success) {
						if ((response.jobs).length > 0) {
							//filter live jobs
							this.jobs_list_live = response.jobs.filter((book: any) => book.jobstatus === "live");
							if ((this.jobs_list_live).length > 0) {
								this.isLiveJobAvailable = true;
							} else {
								this.isLiveJobAvailable = false;
							}

						} else {
							this.isLiveJobAvailable = false;
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

	ngOnInit() {
		// let payrollData = this.payroll.processPayroll();
		// this.processPayrollGenerate(payrollData);
	}

}
