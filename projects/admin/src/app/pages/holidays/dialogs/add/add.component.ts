import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, Inject } from '@angular/core';
import { HolidayDataService } from '../../../../services/holiday-data.service';
import { FormControl, Validators } from '@angular/forms';
import { Holiday } from '../../models/holiday';
import { DatePipe } from '@angular/common';
import { AsyncSubscriber } from '../../../../services/async.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-add',
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.scss']
})
export class AddComponent {

	appearance$: Observable<any>;
	// public today = new Date();
	public tomorrow = new Date().addDays(1);

	constructor(public dialogRef: MatDialogRef<AddComponent>,
		@Inject(MAT_DIALOG_DATA) public data: Holiday,
		public holidayDataService: HolidayDataService, private datePipe: DatePipe, private asyncSubscriber: AsyncSubscriber) {
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

	public confirmAdd(): void {
		let holidaydate = { 'date': this.datePipe.transform(this.data.date, 'yyyy-MM-dd') };
		this.data = Object.assign(this.data, holidaydate);
		this.dialogRef.close(this.data);
		// this.dataService.addholiday(this.data);
	}
}
