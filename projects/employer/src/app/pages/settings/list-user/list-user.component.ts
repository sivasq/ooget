import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
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
	empJobId;

	//Mat Menu Configuration
	@Input() xPosition: MenuPositionX
	@Input() overlapTrigger: boolean

	public pageSizeOptions = [5, 10, 15, 20, 30, 50, 100, 250];

	// Tab1 Pagination config
	public tab1PaginateConfig: PaginationInstance = {
		id: 'tab1',
		itemsPerPage: 10,
		currentPage: 1
	};
	public tab1search;
	public tab1Filter: string = '';
	public tab1PaginateControlMaxSize: number = 10;
	public tab1PaginateControlAutoHide: boolean = true;

	//set Company Details
	public companyDetails: any;
	public jobDetails: any;

	constructor(private _httpService: ApiCallService, private route: ActivatedRoute) {
		this.employerId = this.route.snapshot.params['emp_id'];
		this.empJobId = this.route.snapshot.params['job_id'];

		this.getListOfUsers();
	}

	public isUserAvailable: boolean;

	public users_list: any[];

	isDefaultEmployer() {
		return localStorage.getItem('ogDefaultEmployer');
	}

	getListOfUsers() {
		this.busy = this._httpService.getListOfUsers()
			.subscribe(
				response => {
					if (response.success) {
						if ((response.supervisors).length > 0) {
							this.isUserAvailable = true;
						} else {
							this.isUserAvailable = false;
						}
						this.users_list = response.supervisors;

					} else if (!response.success) {
						console.log(response);
					}
				},
				error => {
					console.log(error);
				}
			);
	}

	deleteUser(userid) {
		console.log(userid);
		return false;
		this.busy = this._httpService.deleteUserProfile({ "supervisorid": userid })
			.subscribe(
				response => {
					// console.log(response);
					if (response.success) {

						this.getListOfUsers();

					} else if (!response.success) {
						// console.log(response);
					}
				},
				error => {
					// console.log(error);
				}
			);
	}

	ngOnInit() {
	}

}
