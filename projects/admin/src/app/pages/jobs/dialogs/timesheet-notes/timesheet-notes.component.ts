import { Component, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material';
import { DatePipe } from '@angular/common';
import { AsyncSubscriber } from '../../../../services/async.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-timesheet-notes',
	templateUrl: './timesheet-notes.component.html',
	styleUrls: ['./timesheet-notes.component.scss']
})
export class TimesheetNotesComponent implements OnInit {
	appearance$: Observable<any>;
	constructor(private bottomSheetRef: MatBottomSheetRef<TimesheetNotesComponent>, @Inject(MAT_BOTTOM_SHEET_DATA) public data: any, private datePipe: DatePipe, private asyncSubscriber: AsyncSubscriber) {
		this.appearance$ = asyncSubscriber.getAppearance.pipe();
	}

	public TimesheetNotes;
	public editText = 'Edit';
	public showNotesEditor: boolean = true;
	public haveNotes: boolean;

	submit() {
		// emppty stuff
	}

	onNoClick(): void {
		this.bottomSheetRef.dismiss({ 'callback': false });
	}

	stopEdit(): void {
		let verifiedTime = {};

		let contractid = { 'contractid': this.data.contractid };
		verifiedTime = Object.assign(verifiedTime, contractid);

		let timesheetid = { 'timesheetid': this.data.timesheetid };
		verifiedTime = Object.assign(verifiedTime, timesheetid);

		let notes = { 'notes': this.TimesheetNotes };
		verifiedTime = Object.assign(verifiedTime, notes);

		let callback = { 'callback': true };
		verifiedTime = Object.assign(verifiedTime, callback);

		this.bottomSheetRef.dismiss(verifiedTime);

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

		// console.log(verifiedTime);
	}

	ngOnInit() {
		this.TimesheetNotes = this.data.notes;

		if (this.data.notes) {
			this.haveNotes = true;
			this.showNotesEditor = false;
			// console.log(this.haveNotes);
		}
	}

	toggleShowEditor() {
		this.showNotesEditor = !this.showNotesEditor;
		if (this.showNotesEditor) {
			this.editText = 'Cancel';
		} else {
			this.editText = 'Edit';
		}
	}

}
