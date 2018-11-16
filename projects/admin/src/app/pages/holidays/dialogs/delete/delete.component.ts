import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, Inject } from '@angular/core';
import { DataService } from '../../../../services/data.service';

@Component({
	selector: 'app-delete',
	templateUrl: './delete.component.html',
	styleUrls: ['./delete.component.scss']
})
export class DeleteComponent {

	constructor(public dialogRef: MatDialogRef<DeleteComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any, public dataService: DataService) { }

	onNoClick(): void {
		this.dialogRef.close();
	}

	confirmDelete(): void {
		let holidayId = { "holidayid": this.data.holidayid};
		this.dialogRef.close(holidayId);
		// this.dataService.deleteIssue(holidayId);
	}
}
