import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiCallService } from '../../../services/api-call.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuPositionX } from '@angular/material';
import { PaginationInstance } from 'ngx-pagination';

@Component({
	selector: 'app-applied-jobseeker-list',
	templateUrl: './applied-jobseeker-list.component.html',
	styleUrls: ['./applied-jobseeker-list.component.scss']
})
export class AppliedJobseekerListComponent implements OnInit {

	busy: Subscription;
	employerId;
	empJobId;

	// Mat Menu Configuration
	@Input() xPosition: MenuPositionX;
	@Input() overlapTrigger: boolean;

	public pageSizeOptions = [3, 6, 12, 24, 48, 96];

	// Tab1 Pagination config
	public tab1PaginateConfig: PaginationInstance = {
		id: 'tab1',
		itemsPerPage: 3,
		currentPage: 1
	};
	public tab1search;
	public tab1Filter: string = '';
	public tab1PaginateControlMaxSize: number = 10;
	public tab1PaginateControlAutoHide: boolean = true;

	//set Company Details
	public companyDetails: any;
	public jobDetails: any;
	jobStatus = ['', 'Pending', 'Live', 'Closed'];

	constructor(private router: Router, private _httpService: ApiCallService, private route: ActivatedRoute) {
		this.employerId = this.route.snapshot.params['emp_id'];
		this.empJobId = this.route.snapshot.params['job_id'];

		let jobId = {
			jobid: this.route.snapshot.params['job_id'],
		}

		this.getAppliedCandidates({ 'jobid': this.route.snapshot.params['job_id'] });
	}

	public isCandidatesAvailable: boolean;

	public candidates_list: any[];

	getAppliedCandidates(jobId) {
		this.busy = this._httpService.getAppliedCandidates(jobId)
			.subscribe(
				response => {
					if (response.success) {
						if ((response.result).length > 0) {
							this.isCandidatesAvailable = true;
						} else {
							this.isCandidatesAvailable = false;
						}

						// console.log(response.job.candidatesapplied);
						this.candidates_list = response.result;
						this.companyDetails = response.result[0];
						this.jobDetails = response.result[0];
						// console.log(this.companyDetails);

					} else if (!response.success) {
						// console.log(response);
					}
				},
				error => {
					// console.log(error);
				}
			);
	}

	toApplicantDetails(candidates) {
		localStorage.setItem('ogApplicant', JSON.stringify(candidates));
		this.router.navigate(['employer/jobs/' + candidates.job_id + '/candidates/' + candidates.jobseeker_id + '/view/' + candidates.id]);
	}
	ngOnInit() { }

}
