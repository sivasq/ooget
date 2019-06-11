import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { DatePipe } from '@angular/common';
import { ApiCallService } from '../../../../services/api-call.service';

@Component({
	selector: 'app-edit-clock-in-out',
	templateUrl: './edit-clock-in-out.component.html',
	styleUrls: ['./edit-clock-in-out.component.scss']
})
export class EditClockInOutComponent implements OnInit {

	constructor(public dialogRef: MatDialogRef<EditClockInOutComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any, private datePipe: DatePipe, private _httpService: ApiCallService, public snackBar: MatSnackBar) { }

	ngOnInit() {
		// console.log(this.data);
	}

	minVerifiedTime(startTime) {
		let minVerifiedTime = new Date(startTime);
		return new Date(minVerifiedTime.getTime() + 900000);
	}

	submit() {
		// emppty stuff
	}

	onNoClick(): void {
		this.dialogRef.close({'callback':false});
	}

	stopEdit(): void {
		let verifiedTime = {};
		let verifiedpunchintime = { "verifiedpunchintime": this.datePipe.transform(this.data.verifiedpunchintime, 'yyyy/MM/dd HH:mm') };
		verifiedTime = Object.assign(verifiedTime, verifiedpunchintime);

		let verifiedpunchouttime = { "verifiedpunchouttime": this.datePipe.transform(this.data.verifiedpunchouttime, 'yyyy/MM/dd HH:mm') };
		verifiedTime = Object.assign(verifiedTime, verifiedpunchouttime);

		let contractid = { "contractid": this.data.contractid};
		verifiedTime = Object.assign(verifiedTime, contractid);

		let timesheetid = { "timesheetid": this.data.timesheetid };
		verifiedTime = Object.assign(verifiedTime, timesheetid);

		let callback = { "callback": true };
		verifiedTime = Object.assign(verifiedTime, callback);

		this.dialogRef.close(verifiedTime);

		// this._httpService.timesheetAdjust(verifiedTime)
		// 	.subscribe(
		// 		response => {
		// 			if (response.success) {
		// 				console.log("TimeSheet Adjusted");

		// 				this.dialogRef.close();

		// 				let snackBarRef = this.snackBar.open('TimeSheet Adjusted Successfully.', 'Close', {
		// 					duration: 5000,
		// 				});

		// 				snackBarRef.onAction().subscribe(() => {
		// 					snackBarRef.dismiss();
		// 					console.log('The snack-bar action was triggered!');
		// 				});
		// 			} else if (!response.success) {
		// 				console.log(response);
		// 			}
		// 		},
		// 		error => {
		// 			console.log(error);
		// 		}
		// 	);

		console.log(verifiedTime);
	}

}
