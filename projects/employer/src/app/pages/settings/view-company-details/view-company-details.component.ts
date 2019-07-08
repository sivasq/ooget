import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ApiCallService } from '../../../services/api-call.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { ConfigService } from '../../../services/config.service';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { isArray } from 'util';

@Component({
	selector: 'app-view-company-details',
	templateUrl: './view-company-details.component.html',
	styleUrls: ['./view-company-details.component.scss']
})
export class ViewCompanyDetailsComponent implements OnInit {

	navMode: string = '';
	navOpen: boolean;
	public baseUrl;
	// @ViewChild('docFileInput') docFileInput: ElementRef;

	@ViewChild('docFileInput') myInputVariable: ElementRef;

	public companyDetails: any = [];
	objectKeys = Object.keys;
	public companyCodeGenerator: boolean = false;

	public docName;
	public companyid;
	// public companyCodes = {
	// 	companyid: '',
	// 	companycode: ''
	// }
	busy: Subscription;

	constructor(private _httpService: ApiCallService, private route: ActivatedRoute, public snackBar: MatSnackBar, private configService: ConfigService, private datePipe: DatePipe) {

		this.baseUrl = configService.base_url;
		this.companyid = this.route.snapshot.params['emp_id'];
		this.getCompanyDetails();
	}

	getCompanyDetails() {
		this.busy = this._httpService.getEmployer()
			.subscribe(
				response => {
					if (response.success) {
						this.companyDetails = isArray(response.result) ? response.result[0] : '';
						// this.companyCodes.companyid = response.company._id;
						// console.log(this.companyDetails);

					} else if (!response.success) {
						// console.log(response);
					}
				},
				error => {
					// console.log(error);
				}
			);
	}

	ngOnInit() {

	}

}
