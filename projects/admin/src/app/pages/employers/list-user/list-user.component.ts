import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Location } from '@angular/common';
import { Subscription, from } from 'rxjs';
import { ApiCallService } from '../../../services/api-call.service';
import { ActivatedRoute } from '@angular/router';
import { MenuPositionX } from '@angular/material';
import { PaginationInstance } from 'ngx-pagination';

@Component({
	selector: 'app-list-user',
	templateUrl: './list-user.component.html',
	styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

	busy: Subscription;
	employerId;
	// empJobId;

	// Mat Menu Configuration
	@Input() xPosition: MenuPositionX;
	@Input() overlapTrigger: boolean;

	public pageSizeOptions = [5, 10, 15, 20, 30, 50, 100, 250];

	// Tab1 Pagination config
	public tab1PaginateConfig: PaginationInstance = {
		id: 'tab1',
		itemsPerPage: 10,
		currentPage: 1
	};
	public tab1search;
	public tab1Filter = '';
	public tab1PaginateControlMaxSize = 10;
	public tab1PaginateControlAutoHide = true;

	// set Company Details
	public employerDetails: any;
	public jobDetails: any;

	constructor(private _httpService: ApiCallService, private route: ActivatedRoute, private _location: Location) {
		this.employerId = this.route.snapshot.params['emp_id'];
		// this.empJobId = this.route.snapshot.params['job_id'];

		this.getListOfUsers({ 'employerid': this.employerId });
		this.getEmployerDetails({ 'employerid': this.employerId });
	}

	public isUserAvailable: boolean;

	public users_list: any[];

	isDefaultEmployer() {
		return localStorage.getItem('ogDefaultEmployer');
	}

	getListOfUsers(employerid) {
		this.busy = this._httpService.getListOfUsers(employerid)
			.subscribe(
				response => {
					if (response.success) {
						if ((response.result).length > 0) {
							this.isUserAvailable = true;
						} else {
							this.isUserAvailable = false;
						}
						this.users_list = response.result;

					} else if (!response.success) {
						// console.log(response);
					}
				},
				error => {
					// console.log(error);
				}
			);
	}

	deleteUser(userid) {
		// console.log(userid);
		return false;
		this.busy = this._httpService.deleteUserProfile({ 'userid': userid })
			.subscribe(
				response => {
					// console.log(response);
					if (response.success) {
						this.getListOfUsers({ 'employerid': this.employerId });
					} else if (!response.success) {
						// console.log(response);
					}
				},
				error => {
					// console.log(error);
				}
			);
	}

	getEmployerDetails(employerid) {
		this.busy = this._httpService.getEmployer(employerid)
			.subscribe(
				response => {
					if (response.success) {
						// this.companyDetails = response.employer;
						this.employerDetails = response.result[0];
					} else if (!response.success) {
						// console.log(response);
					}
				},
				error => {
					// console.log(error);
				}
			);
	}

	backClicked() {
		this._location.back();
	}

	ngOnInit() {
	}
}
