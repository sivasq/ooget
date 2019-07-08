import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { DatePipe } from '@angular/common';
import { ApiCallService } from '../../../../services/api-call.service';
import { Observable } from 'rxjs';
import { AsyncSubscriber } from '../../../../services/async.service';

@Component({
	selector: 'app-single-textarea',
	templateUrl: './single-textarea.component.html',
	styleUrls: ['./single-textarea.component.scss']
})
export class SingleTextareaComponent implements OnInit {

	appearance$: Observable<any>;

	public textFields: any = {
		textData: ''
	}

	constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<any>, private asyncSubscriber: AsyncSubscriber) {
		this.appearance$ = asyncSubscriber.getAppearance.pipe();
	}

	onNoClick(): void {
		this.dialogRef.close({ 'callback': false });
	}

	submitData(submitData): void {

		let callback = { "callback": true };
		submitData = Object.assign(submitData, callback);

		this.dialogRef.close(submitData);

		// this._httpService.addPayInfoToJob(payData)
		// 	.subscribe(
		// 		response => {
		// 			if (response.success) {
		// 				console.log("Pay Info Added Successfully");

		// 				this.dialogRef.close();

		// 				let snackBarRef = this.snackBar.open('Pay Info Added Successfully.', 'Close', {
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

		// console.log(submitData);
	}

	ngOnInit() {
	}

}
