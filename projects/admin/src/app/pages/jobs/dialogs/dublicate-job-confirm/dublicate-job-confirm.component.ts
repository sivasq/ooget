import { Component, OnInit, Inject } from '@angular/core';
import { ApiCallService } from '../../../../services/api-call.service';
import { Subscription } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

@Component({
	selector: 'app-dublicate-job-confirm',
	templateUrl: './dublicate-job-confirm.component.html',
	styleUrls: ['./dublicate-job-confirm.component.scss']
})
export class DublicateJobConfirmComponent implements OnInit {

	//set employers availability
	public isEmployerLoading: boolean = true;

	//set employers Array
	public employers_list: any[];
	public selectedEmployer;

	constructor(public router: Router, private _httpService: ApiCallService, public dialogRef: MatDialogRef<DublicateJobConfirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any, ) {
		this.getAllEmployers();
	}

	getAllEmployers() {
		this._httpService.getAllEmployers()
			.subscribe(
				response => {
					this.isEmployerLoading = false;
					if (response.success) {
						if ((response.result).length > 0) {
							this.employers_list = response.result;
						}
					} else if (!response.success) {
						// console.log(response);
					}
				},
				error => {
					this.isEmployerLoading = false;
					// console.log(error);
				}
			);
	}

	makeDuplicate() {
		// this.dialogRef.close(this.selectedEmployer);
		this.router.navigate(['/admin/employers/' + this.selectedEmployer + '/jobs/' + this.data.jobid + '/copyjob']);
	}

	submit() { }

	ngOnInit() { }

}
