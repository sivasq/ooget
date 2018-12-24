import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ApiCallService } from '../../../services/api-call.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { ConfigService } from '../../../services/config.service';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
	selector: 'app-view-company-details',
	templateUrl: './view-company-details.component.html',
	styleUrls: ['./view-company-details.component.scss']
})
export class ViewCompanyDetailsComponent implements OnInit {

	navMode: string = '';
	navOpen: boolean;
	public baseUrl;
	public imgBaseUrl;
	// @ViewChild('docFileInput') docFileInput: ElementRef;

	@ViewChild('docFileInput') myInputVariable: ElementRef;

	public employerDetails: any = [];
	objectKeys = Object.keys;
	public companyCodeGenerator: boolean = false;

	public docName;
	public companyid;
	public companyCodes = {
		companyid: '',
		companycode: ''
	}
	showUpload = true;
	uploaded = false;
	busy: Subscription;

constructor(private _httpService: ApiCallService, private route: ActivatedRoute, public snackBar: MatSnackBar, private configService: ConfigService, private datePipe: DatePipe) {

	this.baseUrl = configService.base_url;
	this.imgBaseUrl = configService.img_base_url;
	this.companyid = this.route.snapshot.params['emp_id'];
	let employerId = {
		companyid: this.route.snapshot.params['emp_id'],
	}
	this.getEmployerDetails(employerId);
}

getEmployerDetails(employerId) {
	this.busy = this._httpService.getCompanyDetails(employerId)
		.subscribe(
			response => {
				if (response.success) {
					// if((response.message).length > 0)
					// {
					// 	this.isEmployerAvailable = true;
					// }else{
					// 	this.isEmployerAvailable = false;
					// }

					this.employerDetails = response.employer;
					this.companyCodes.companyid = response.employer._id;
					console.log(this.employerDetails);

				} else if (!response.success) {
					console.log(response);
				}
			},
			error => {
				console.log(error);
			}
		);
}

getDoc(event) {
	console.log(event.target.files[0]);
	this.showUpload = false;
	this.uploaded = true;
	this.docName = event.target.files[0].name;
	// if (event.target.files && event.target.files[0]) {
	// 	var reader = new FileReader();
	// 	reader.readAsDataURL(event.target.files[0]); // read file as data url
	// 	reader.onload = (event:any) => { // called once readAsDataURL is completed
	// 		this.profileImage = event.target.result;
	// 		console.log(event.target.result);
	// 	}
	// }
}

ngOnInit() {

}

}
