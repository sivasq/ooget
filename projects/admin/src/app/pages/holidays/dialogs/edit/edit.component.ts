import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { HolidayDataService } from '../../../../services/holiday-data.service';
import { AsyncSubscriber } from '../../../../services/async.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.scss']
})
export class EditComponent {

	appearance$: Observable<any>;

	constructor(public dialogRef: MatDialogRef<EditComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any, public holidayDataService: HolidayDataService, private datePipe: DatePipe, private asyncSubscriber: AsyncSubscriber) {
		this.appearance$ = asyncSubscriber.getAppearance.pipe();
	}

	formControl = new FormControl('', [Validators.required]);

	getErrorMessage() {
		return this.formControl.hasError('required') ? 'Required field' : '';
	}

	submit() {
		// emppty stuff
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

	stopEdit(): void {
		let holidaydate = { 'date': this.datePipe.transform(this.data.date, 'yyyy-MM-dd') };
		this.data = Object.assign(this.data, holidaydate);
		this.dialogRef.close(this.data);
		// this.dataService.updateholiday(this.data);
		// console.log(this.data);
	}
}
