import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, Inject } from '@angular/core';
import { HolidayDataService } from '../../../../services/holiday-data.service';

@Component({
	selector: 'app-delete',
	templateUrl: './delete.component.html',
	styleUrls: ['./delete.component.scss']
})
export class DeleteComponent {

	constructor(public dialogRef: MatDialogRef<DeleteComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any, public holidayDataService: HolidayDataService) { }

	onNoClick(): void {
		this.dialogRef.close();
	}

	confirmDelete(): void {
		let holidayId = { 'id': this.data.id };
		this.dialogRef.close(holidayId);
		// this.dataService.deleteholiday(holidayId);
	}
}
