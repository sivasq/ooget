import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, Inject } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { FormControl, Validators } from '@angular/forms';
import { Issue } from '../../models/issue';
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
		@Inject(MAT_DIALOG_DATA) public data: Issue,
		public dataService: DataService, private datePipe: DatePipe, private asyncSubscriber: AsyncSubscriber) {
		this.appearance$ = asyncSubscriber.getAppearance.pipe();
		}

	formControl = new FormControl('', [
		Validators.required
		// Validators.email,
	]);

	getErrorMessage() {
		return this.formControl.hasError('required') ? 'Required field' :
			this.formControl.hasError('email') ? 'Not a valid email' :
				'';
	}

	submit() {
		// emppty stuff
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

	public confirmAdd(): void {
		let holidaydate = { "holidaydate": this.datePipe.transform(this.data.holidaydate, 'yyyy/MM/dd') };
		this.data = Object.assign(this.data, holidaydate);
		this.dialogRef.close(this.data);
		// this.dataService.addIssue(this.data);
	}
}
