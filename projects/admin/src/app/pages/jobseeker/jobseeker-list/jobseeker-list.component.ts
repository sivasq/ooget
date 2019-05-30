import { Component, OnInit, Input } from '@angular/core';
import { ApiCallService } from '../../../services/api-call.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Component({
	selector: 'app-jobseeker-list',
	templateUrl: './jobseeker-list.component.html',
	styleUrls: ['./jobseeker-list.component.scss']
})
export class JobseekerListComponent implements OnInit {

	//set employers Array
	public jobseekers_list: any[] = [];

	//busy Config
	busy: Subscription;

	constructor(private _httpService: ApiCallService, public snackBar: MatSnackBar) { }

	toggleJobseekerStatus(event) {
		this.busy = this._httpService.changeJobseekerStatus({ jobseekerid: event.jobSeekerId, activestatus: event.activeStatus })
			.subscribe(
				response => {
					if (response.success) {
						if (event.activeStatus == true) {
							let snackBarRef = this.snackBar.open('Jobseeker Activated Successfully.', 'Close', {
								duration: 5000,
							});
							snackBarRef.onAction().subscribe(() => {
								snackBarRef.dismiss();
							});
						} else if (event.activeStatus == false) {
							let snackBarRef = this.snackBar.open('Jobseeker Deactivated Successfully.', 'Close', {
								duration: 5000,
							});
							snackBarRef.onAction().subscribe(() => {
								snackBarRef.dismiss();
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
						this.jobseekers_list = response.result;
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
