import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material';
import { RegisterComponent } from '../register/register.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ConfigService } from '../services/config.service';

@Component({
	selector: 'app-terms-conditions-dialog',
	templateUrl: './terms-conditions-dialog.component.html',
	styleUrls: ['./terms-conditions-dialog.component.scss']
})
export class TermsConditionsDialogComponent implements OnInit {

	public baseUrl;

	constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, private configService: ConfigService, public dialogRef: MatDialogRef<RegisterComponent>) {
		this.baseUrl = configService.base_url;
	}

	dialogClose(response: any) {
		this.dialogRef.close(response);
	}

	openDialog(data) {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.disableClose = true;
		dialogConfig.autoFocus = true;
		dialogConfig.data = {
			// boxTitle:"Confirmation",
			confirmMsg: '<h4>Are You Sure to Accept Terms & Conditions ?</h4>',
			okButtonText: 'Yes',
			noButtonText: 'No',
			actionalign: 'center'
		};

		let dialogref = this.dialog.open(ConfirmDialogComponent, dialogConfig);

		dialogref.afterClosed()
			.subscribe(
				response => {
					if (response == 'yes') {
						this.dialogClose('yes');
					} else if (response == 'no') {

					}
				}
			);
	}

	ngOnInit() {
	}

}
