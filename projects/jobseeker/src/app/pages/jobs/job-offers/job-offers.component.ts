import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import { MenuPositionX, MatTabChangeEvent } from '@angular/material';
import { ApiCallService } from '../../../services/api-call.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConfigService } from '../../../services/config.service';
import { MockDataService } from '../../../services/mock-data.service';
import { JobLocation } from '../../../classes/jobLocation';
import { Specialization } from '../../../classes/Specialization';

@Component({
	selector: 'app-job-offers',
	templateUrl: './job-offers.component.html',
	styleUrls: ['./job-offers.component.scss']
})
export class JobOffersComponent implements OnInit, OnDestroy {
	// busy Config
	busy: Subscription;
	public baseUrl;

	@Input() selectedIndex: number | null;
	currentlyActiveIndexTab: number | null = 0;

	employmentType = ['', 'Part Time', 'Full Time'];
	jobStatus = ['', 'Pending', 'Live', 'Closed'];

	// Mat Menu Configuration
	@Input() xPosition: MenuPositionX;
	@Input() overlapTrigger: boolean;

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
		itemsPerPage: 6,
		currentPage: 1
	};
	public tab2search;
	public tab2Filter: string = '';
	public tab2PaginateControlMaxSize: number = 5;
	public tab2PaginateControlAutoHide: boolean = true;

	// Tab3 Pagination config
	public tab3PaginateConfig: PaginationInstance = {
		id: 'tab3',
		itemsPerPage: 6,
		currentPage: 1
	};
	public tab3search;
	public tab3Filter: string = '';
	public tab3PaginateControlMaxSize: number = 5;
	public tab3PaginateControlAutoHide: boolean = true;

	// Tab4 Pagination config
	public tab4PaginateConfig: PaginationInstance = {
		id: 'tab4',
		itemsPerPage: 6,
		currentPage: 1
	};
	public tab4search;
	public tab4Filter: string = '';
	public tab4PaginateControlMaxSize: number = 5;
	public tab4PaginateControlAutoHide: boolean = true;

	JobLocations: JobLocation[];
	Specializations: Specialization[];

	// set jobs availability
	public isJobOffersAvailable: boolean;
	public isPendingJobOffersAvailable: boolean;
	public isAcceptedJobOffersAvailable: boolean;
	public isRejectedJobOffersAvailable: boolean;
	public isExpiredJobOffersAvailable: boolean;

	// set jobs array
	public jobOffers: any[];
	public pendingJobOffers: any[];
	public acceptedJobOffers: any[];
	public rejectedJobOffers: any[];
	public expiredJobOffers: any[];

	constructor(private urlconfig: ConfigService, private _httpService: ApiCallService, private route: ActivatedRoute, private mockDataService: MockDataService) {
		this.baseUrl = urlconfig.base_url;
		this.getMyJobOffersList();
		this.getSpecializations();
		this.getJobLocations();
	}

	getSpecializations(): void {
		this.mockDataService.getSpecializations()
			.subscribe(Specializations => {
				this.Specializations = Specializations;
			});
	}
	getJobLocations(): void {
		this.mockDataService.getJobLocations()
			.subscribe(JobLocations => {
				this.JobLocations = JobLocations;
			});
	}

	getJobLocationName(locationId) {
		let filteredLocation = this.JobLocations.filter(location => location.id == locationId);
		return filteredLocation[0].name;
	}

	// set currently active tab index
	tabChanged(tabChangeEvent: MatTabChangeEvent): void {
		this.currentlyActiveIndexTab = tabChangeEvent.index;
		// console.log(this.currentlyActiveIndexTab);
	}

	// offeredJobs:any = [
	// 	{
	// 		"jobid": "5b6d34aec7c3ca13584a78b4",
	// 		"status": "rejected",
	// 		"applied": true,
	// 		"appliedAt": "2018/08/10 15:10:53",
	// 		"offered": true,
	// 		"offeredAt": "2018/08/10 16:28:09",
	// 		"rejected": true,
	// 		"rejectedAt": "2018/08/10 16:29:29",
	// 		"jobdetails": {
	// 			"_id": "5b6d34aec7c3ca13584a78b4",
	// 			"project": "Project1",
	// 			"department": "dept",
	// 			"jobtitle": "Aug10",
	// 			"numberofpax": 2,
	// 			"jobperiodfrom": "2018/08/11",
	// 			"jobperiodto": "2018/08/30",
	// 			"starttime": "09:00",
	// 			"endtime": "18:00",
	// 			"salary": 23.8,
	// 			"jobstatus": "live",
	// 			"jobnumber": "OOGET-2018-0049",
	// 			"companydetails":[]
	// 		}
	// 	},
	// 	{
	// 		"jobid": "5b6d4e4ffb8594111c5b46f4",
	// 		"status": "accepted",
	// 		"applied": true,
	// 		"appliedAt": "2018/08/10 16:35:54",
	// 		"offered": true,
	// 		"offeredAt": "2018/08/10 16:36:19",
	// 		"accepted": true,
	// 		"acceptedAt": "2018/08/10 16:37:15",
	// 		"contractid": "5b6d4ebbfb8594111c5b46fa",
	// 		"jobdetails": {
	// 			"_id": "5b6d4e4ffb8594111c5b46f4",
	// 			"project": "Project2",
	// 			"department": "dept",
	// 			"jobtitle": "Aug10 new",
	// 			"numberofpax": 2,
	// 			"jobperiodfrom": "2018/08/17",
	// 			"jobperiodto": "2018/08/29",
	// 			"starttime": "09:00",
	// 			"endtime": "18:00",
	// 			"salary": 25.6,
	// 			"jobstatus": "live",
	// 			"jobnumber": "OOGET-2018-0050",
	// 			"companydetails": []
	// 		}
	// 	},
	// 	{
	// 		"jobid": "5b6d4e4ffb8594111c5b46f4",
	// 		"status": "offered",
	// 		"applied": true,
	// 		"appliedAt": "2018/08/10 16:35:54",
	// 		"offered": true,
	// 		"offeredAt": "2018/08/10 16:36:19",
	// 		"jobdetails": {
	// 			"_id": "5b6d4e4ffb8594111c5b46f4",
	// 			"project": "Project2",
	// 			"department": "dept",
	// 			"jobtitle": "Aug10 new 1",
	// 			"numberofpax": 2,
	// 			"jobperiodfrom": "2018/08/17",
	// 			"jobperiodto": "2018/08/29",
	// 			"starttime": "09:00",
	// 			"endtime": "18:00",
	// 			"salary": 25.6,
	// 			"jobstatus": "live",
	// 			"jobnumber": "OOGET-2018-0050",
	// 			"companydetails": []
	// 		}
	// 	},
	// 	{
	// 		"jobid": "5b6d4e4ffb8594111c5b46f4",
	// 		"status": "offered",
	// 		"applied": true,
	// 		"appliedAt": "2018/08/10 16:35:54",
	// 		"offered": true,
	// 		"offeredAt": "2018/08/10 16:36:19",
	// 		"accepted": true,
	// 		"acceptedAt": "2018/08/10 16:37:15",
	// 		"jobdetails": {
	// 			"_id": "5b6d4e4ffb8594111c5b46f4",
	// 			"project": "Project2",
	// 			"department": "dept",
	// 			"jobtitle": "Aug10 new 1",
	// 			"numberofpax": 2,
	// 			"jobperiodfrom": "2018/08/17",
	// 			"jobperiodto": "2018/08/29",
	// 			"starttime": "09:00",
	// 			"endtime": "18:00",
	// 			"salary": 25.6,
	// 			"jobstatus": "closed",
	// 			"jobnumber": "OOGET-2018-0050",
	// 			"companydetails": []
	// 		}
	// 	}
	// ]

	// getMyJobOffersList() {
	// 	if ((this.offeredJobs).length > 0) {

	// 		this.jobOffers = this.offeredJobs;
	// 		if ((this.jobOffers).length > 0) {
	// 			this.isJobOffersAvailable = true;
	// 		} else {
	// 			this.isJobOffersAvailable = false;
	// 		}

	// 		this.pendingJobOffers = this.offeredJobs.filter((e) => e.offered && !e.rejected && !e.accepted && e.jobdetails.jobstatus !== 'closed');
	// 		if ((this.pendingJobOffers).length > 0) {
	// 			this.isPendingJobOffersAvailable = true;
	// 		} else {
	// 			this.isPendingJobOffersAvailable = false;
	// 		}

	// 		this.acceptedJobOffers = this.offeredJobs.filter((e) => e.offered && !e.rejected && e.accepted);
	// 		if ((this.acceptedJobOffers).length > 0) {
	// 			this.isAcceptedJobOffersAvailable = true;
	// 		} else {
	// 			this.isAcceptedJobOffersAvailable = false;
	// 		}

	// 		this.rejectedJobOffers = this.offeredJobs.filter((e) => e.offered && e.rejected && !e.accepted);
	// 		if ((this.rejectedJobOffers).length > 0) {
	// 			this.isRejectedJobOffersAvailable = true;
	// 		} else {
	// 			this.isRejectedJobOffersAvailable = false;
	// 		}

	// 		this.expiredJobOffers = this.offeredJobs.filter((e) => e.offered && !e.rejected && !e.accepted && e.jobdetails.jobstatus == 'closed');
	// 		if ((this.expiredJobOffers).length > 0) {
	// 			this.isExpiredJobOffersAvailable = true;
	// 		} else {
	// 			this.isExpiredJobOffersAvailable = false;
	// 		}

	// 		console.log('jobOffers', this.jobOffers);
	// 		console.log('pendingJobOffers', this.pendingJobOffers);
	// 		console.log('acceptedJobOffers', this.acceptedJobOffers);
	// 		console.log('rejectedJobOffers', this.rejectedJobOffers);
	// 		console.log('expiredJobOffers', this.expiredJobOffers);

	// 	} else {
	// 		this.isJobOffersAvailable = false;
	// 		this.isPendingJobOffersAvailable = false;
	// 		this.isAcceptedJobOffersAvailable = false;
	// 		this.isRejectedJobOffersAvailable = false;
	// 		this.isExpiredJobOffersAvailable = false;
	// 	}
	// }

	getMyJobOffersList() {
		this.busy = this._httpService.getOffererJobsList()
			.subscribe(
				response => {
					if (response.success) {
						if ((response.result).length > 0) {

							this.jobOffers = response.result;
							if ((this.jobOffers).length > 0) {
								this.isJobOffersAvailable = true;
							} else {
								this.isJobOffersAvailable = false;
							}

							this.pendingJobOffers = response.result.filter((e) => e.offered_on && !e.offer_rejected && !e.offer_accepted && e.recruitment_open !== 0);
							if ((this.pendingJobOffers).length > 0) {
								this.isPendingJobOffersAvailable = true;
							} else {
								this.isPendingJobOffersAvailable = false;
							}

							this.acceptedJobOffers = response.result.filter((e) => e.offered_on && !e.offer_rejected && e.offer_accepted);
							if ((this.acceptedJobOffers).length > 0) {
								this.isAcceptedJobOffersAvailable = true;
							} else {
								this.isAcceptedJobOffersAvailable = false;
							}

							this.rejectedJobOffers = response.result.filter((e) => e.offered_on && e.offer_rejected && !e.offer_accepted);
							if ((this.rejectedJobOffers).length > 0) {
								this.isRejectedJobOffersAvailable = true;
							} else {
								this.isRejectedJobOffersAvailable = false;
							}

							this.expiredJobOffers = response.result.filter((e) => e.offered_on && !e.offer_rejected && !e.offer_accepted && e.recruitment_open == 0);
							if ((this.expiredJobOffers).length > 0) {
								this.isExpiredJobOffersAvailable = true;
							} else {
								this.isExpiredJobOffersAvailable = false;
							}

							// console.log('jobOffers', this.jobOffers);
							// console.log('pendingJobOffers', this.pendingJobOffers);
							// console.log('acceptedJobOffers', this.acceptedJobOffers);
							// console.log('rejectedJobOffers', this.rejectedJobOffers);
							// console.log('expiredJobOffers', this.expiredJobOffers);

						} else {
							this.isJobOffersAvailable = false;
							this.isPendingJobOffersAvailable = false;
							this.isAcceptedJobOffersAvailable = false;
							this.isRejectedJobOffersAvailable = false;
							this.isExpiredJobOffersAvailable = false;
						}
					} else if (!response.success) {
						// console.log(response);
					}
				},
				error => {
					// console.log(error);
				}
			);
	}

	ngOnInit() { }

	ngOnDestroy() {
		if (this.busy) {
			this.busy.unsubscribe();
		}
	}
}
