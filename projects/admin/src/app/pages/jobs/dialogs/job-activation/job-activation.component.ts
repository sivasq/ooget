import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
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

	constructor(public dialogRef: MatDialogRef<JobActivationComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any, private datePipe: DatePipe, private _httpService: ApiCallService, public snackBar: MatSnackBar, private asyncSubscriber: AsyncSubscriber) {
		this.appearance$ = asyncSubscriber.getAppearance.pipe();
	}

	ngOnInit() {
		// console.log(this.data);
	}

	public jobDetails: any = {
		chargerate: '',
		markuprate: '',
		markupratetype: '',
		salary: '',
		markuprateincurrency: '',
	}

	onNoClick(): void {
		this.dialogRef.close({ 'callback': false });
	}

	addPayInfoToJob(payData): void {
		let employerId = { "employerid": this.data.companyid };
		payData = Object.assign(payData, employerId);

		let jobId = { "jobid": this.data.jobid };
		payData = Object.assign(payData, jobId);

		let jobStatus = { "jobstatus": "live" };
		payData = Object.assign(payData, jobStatus);

		let callback = { "callback": true };
		payData = Object.assign(payData, callback);

		// this.dialogRef.close(payData);

		this._httpService.addPayInfoToJob(payData)
			.subscribe(
				response => {
					if (response.success) {
						console.log("Pay Info Added Successfully");

						this.dialogRef.close();

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

	vlidateChargingRate() {
		if ((this.jobDetails.chargerate != undefined && this.jobDetails.chargerate != "") && (this.jobDetails.markuprate != undefined && this.jobDetails.markuprate != "") && this.jobDetails.markupratetype != undefined) {
			// console.log(this.jobDetails.chargerate);
			// console.log(this.jobDetails.markuprate);
			// console.log(this.jobDetails.markupratetype);

			if (this.jobDetails.markupratetype == "percentage") {
				this.jobDetails.salary = (((1 - (Number(this.jobDetails.markuprate) / 100)) * Number(this.jobDetails.chargerate)).toFixed(1));
				this.jobDetails.markuprateincurrency = ((Number(this.jobDetails.chargerate) - (1 - (Number(this.jobDetails.markuprate) / 100)) * Number(this.jobDetails.chargerate)).toFixed(1));
			}

			if (this.jobDetails.markupratetype == "sgdollar") {
				this.jobDetails.salary = (Number(this.jobDetails.chargerate) - Number(this.jobDetails.markuprate)).toFixed(1);
				this.jobDetails.markuprateincurrency = Number(this.jobDetails.markuprate).toFixed(1);
			}
		}
	}


}
