import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { DatePipe } from '@angular/common';
import { ApiCallService } from '../../../../services/api-call.service';
import { Observable } from 'rxjs';
import { AsyncSubscriber } from '../../../../services/async.service';

@Component({
	selector: 'app-job-activation',
	templateUrl: './job-activation.component.html',
	styleUrls: ['./job-activation.component.scss']
})
export class JobActivationComponent implements OnInit {

	appearance$: Observable<any>;

	public jobDetails: any = {
		charge_rate: '',
		markup_rate: '',
		markup_in: '',
		jobseeker_salary: '',
		markup_amount: '',
	};

	constructor(public dialogRef: MatDialogRef<JobActivationComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any, private datePipe: DatePipe, private _httpService: ApiCallService, public snackBar: MatSnackBar, private asyncSubscriber: AsyncSubscriber) {
		this.appearance$ = asyncSubscriber.getAppearance.pipe();
	}

	ngOnInit() {
		// console.log(this.data);
	}

	onNoClick(): void {
		this.dialogRef.close({ 'callback': false });
	}

	addPayInfoToJob(payData): void {
		let jobId = { 'jobid': this.data.jobid };
		payData = Object.assign(payData, jobId);

		this._httpService.jobUpdateToEmployer(payData)
			.subscribe(
				response => {
					if (response.success) {
						console.log('Pay Info Added Successfully');

						this.activateJob();

						let snackBarRef = this.snackBar.open('Pay Info Added Successfully.', 'Close', {
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

		console.log(payData);
	}

	activateJob(): void {
		let statusData = {};
		let jobId = { 'jobid': this.data.jobid };
		statusData = Object.assign(statusData, jobId);

		let jobStatus = { 'status': '2' };
		statusData = Object.assign(statusData, jobStatus);

		this._httpService.activateJob(statusData)
			.subscribe(
				response => {
					if (response.success) {
						console.log('Job Activated Successfully');

						this.dialogRef.close({ 'callback': true });

						let snackBarRef = this.snackBar.open('Pay Info Added Successfully.', 'Close', {
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

	vlidateChargingRate() {
		if ((this.jobDetails.charge_rate != undefined && this.jobDetails.charge_rate != '') && (this.jobDetails.markup_rate != undefined && this.jobDetails.markup_rate != '') && this.jobDetails.markup_in != undefined) {
			// console.log(this.jobDetails.charge_rate);
			// console.log(this.jobDetails.markup_rate);
			// console.log(this.jobDetails.markup_in);

			if (this.jobDetails.markup_in == '%') {
				this.jobDetails.jobseeker_salary = (((1 - (Number(this.jobDetails.markup_rate) / 100)) * Number(this.jobDetails.charge_rate)).toFixed(1));
				this.jobDetails.markup_amount = ((Number(this.jobDetails.charge_rate) - (1 - (Number(this.jobDetails.markup_rate) / 100)) * Number(this.jobDetails.charge_rate)).toFixed(1));
			}

			if (this.jobDetails.markup_in == '$') {
				this.jobDetails.jobseeker_salary = (Number(this.jobDetails.charge_rate) - Number(this.jobDetails.markup_rate)).toFixed(1);
				this.jobDetails.markup_amount = Number(this.jobDetails.markup_rate).toFixed(1);
			}
		}
	}
}
