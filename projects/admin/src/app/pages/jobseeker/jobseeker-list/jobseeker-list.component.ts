import { Component, OnInit, Input } from '@angular/core';
import { ApiCallService } from '../../../services/api-call.service';
import { Subscription } from 'rxjs';
import { MenuPositionX, MatSnackBar } from '@angular/material';
import { PaginationInstance } from 'ngx-pagination';
import { ConfigService } from '../../../services/config.service';

@Component({
	selector: 'app-jobseeker-list',
	templateUrl: './jobseeker-list.component.html',
	styleUrls: ['./jobseeker-list.component.scss']
})
export class JobseekerListComponent implements OnInit {
	// this.imgBaseUrl + '/' + userLogo;
	public imgBaseUrl;

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

	//set employers availability
	public isJobseekerAvailable: boolean = false;
	public jobseekerCount: Number;

	//set employers Array
	public jobseekers_list: any[];

	//busy Config
	busy: Subscription;

	constructor(private urlconfig: ConfigService, private _httpService: ApiCallService, public snackBar: MatSnackBar) {
		this.imgBaseUrl = urlconfig.img_base_url;
	}

	changeJobseekerStatus(event, jobseekerId) {
		console.log(event.checked);
		console.log(jobseekerId);
		this.busy = this._httpService.changeJobseekerStatus({ jobseekerid: jobseekerId, activestatus: event.checked })
			.subscribe(
				response => {
					if (response.success) {
						console.log(response);
						if (event.checked == true) {
							let snackBarRef = this.snackBar.open('Jobseeker Activated Successfully.', 'Close', {
								duration: 5000,
							});
							snackBarRef.onAction().subscribe(() => {
								snackBarRef.dismiss();
								console.log('The snack-bar action was triggered!');
							});
						} else if (event.checked == false) {
							let snackBarRef = this.snackBar.open('Jobseeker Deactivated Successfully.', 'Close', {
								duration: 5000,
							});
							snackBarRef.onAction().subscribe(() => {
								snackBarRef.dismiss();
								console.log('The snack-bar action was triggered!');
							});
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

	getAllJobseekers() {
		this.busy = this._httpService.getAllJobseekers()
			.subscribe(
				response => {
					if (response.success) {
						console.log(response.jobseekers);
						if ((response.jobseekers).length > 0) {
							this.isJobseekerAvailable = true;
							this.jobseekerCount = (response.jobseekers).length;
							this.jobseekers_list = response.jobseekers;
						} else {
							this.isJobseekerAvailable = false;
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
		this.getAllJobseekers();
	}

}
