import { Component, OnInit, Input } from '@angular/core';
import { MenuPositionX, MatSnackBar, MatDialog, MatDialogConfig } from '@angular/material';
import { ApiCallService } from '../../../services/api-call.service';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from '../../../services/config.service';
import { Subscription } from 'rxjs';
import { ConfirmDialogComponent } from '../../../confirm-dialog/confirm-dialog.component';

@Component({
	selector: 'app-jobseeker-full-details',
	templateUrl: './jobseeker-full-details.component.html',
	styleUrls: ['./jobseeker-full-details.component.scss']
})
export class JobseekerFullDetailsComponent implements OnInit {

	@Input() xPosition: MenuPositionX

	busy: Subscription;

	public jobSeekerDetails: any = [];
	jobseekerId;
	img_base_url;

	constructor(private _httpService: ApiCallService, private route: ActivatedRoute, public snackBar: MatSnackBar, public dialog: MatDialog, private config: ConfigService) {

		this.img_base_url = config.img_base_url;
		this.jobseekerId = this.route.snapshot.params['js_id'];

		this.getJobSeekerDetails({ 'jobseekerid': this.jobseekerId });
	}

	toggleNricFinEditable(mode) {
		let confirmMsg;
		if (mode == "true") {
			confirmMsg = "Do you want Set Editable for Jobseeker ?"
		}

		if (mode == "false") {
			confirmMsg = "Do you want Remove Editable for Jobseeker ?"
		}

		let dialogConfig = new MatDialogConfig();
		dialogConfig.disableClose = true;
		dialogConfig.autoFocus = true;
		dialogConfig.data = {
			// boxTitle:"Confirmation",
			confirmMsg: "<h4>" + confirmMsg + "</h4>",
			okButtonText: "Yes",
			noButtonText: "No",
			actionalign: "center"
		};
		let dialogref = this.dialog.open(ConfirmDialogComponent, dialogConfig);

		dialogref.afterClosed().subscribe(
			data => {
				// this.confirmResponse(data)
				if (data == 'yes') {
					this.busy = this._httpService.toggleNricFinEditable({ "jobseekerid": this.jobseekerId, "nriceditable": mode })
						.subscribe(
							response => {
								if (response.success) {
									this.jobSeekerDetails.nriceditable = mode;
								} else if (!response.success) {
									console.log(response);
								}
							},
							error => {
								console.log(error);
							}
						);
				} else if (data == 'no') {

				}
			}
		);
	}

	toggleIdProofEditable(mode) {
		let confirmMsg;
		if (mode == "true") {
			confirmMsg = "Do you want Enable to Jobseeker Can change Docments ?"
		}

		if (mode == "false") {
			confirmMsg = "Do you want Disable to Jobseeker Can change Docments ?"
		}

		let dialogConfig = new MatDialogConfig();
		dialogConfig.disableClose = true;
		dialogConfig.autoFocus = true;
		dialogConfig.data = {
			// boxTitle:"Confirmation",
			confirmMsg: "<h4>" + confirmMsg + "</h4>",
			okButtonText: "Yes",
			noButtonText: "No",
			actionalign: "center"
		};
		let dialogref = this.dialog.open(ConfirmDialogComponent, dialogConfig);

		dialogref.afterClosed().subscribe(
			data => {
				// this.confirmResponse(data)
				if (data == 'yes') {
					this.busy = this._httpService.toggleIdProofEditable({ "jobseekerid": this.jobseekerId, "jobseekeridproofeditable": mode })
						.subscribe(
							response => {
								if (response.success) {
									this.jobSeekerDetails.jobseekeridproofeditable = mode;
								} else if (!response.success) {
									console.log(response);
								}
							},
							error => {
								console.log(error);
							}
						);
				} else if (data == 'no') {

				}
			}
		);
	}

	getJobSeekerDetails(jobseekerId) {
		this.busy = this._httpService.getJobSeekerDetails(jobseekerId)
			.subscribe(
				response => {
					if (response.success) {
						this.jobSeekerDetails = response.jobseeker;

					} else if (!response.success) {

						console.log(response);
					}
				},
				error => {
					console.log(error);
				}
			);
	}

	ngOnInit() { }
}