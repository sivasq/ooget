import { Component, OnInit, HostListener } from '@angular/core';
import { ApiCallService } from '../../../services/api-call.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConfigService } from '../../../services/config.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DatePipe } from '@angular/common';

@Component({
	selector: 'app-job-details',
	templateUrl: './job-details.component.html',
	styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {
	public imgBaseUrl;

	public jobDetails: any = [];
	objectKeys = Object.keys;
	public companyid;
	public companyDetails: any;

	public candidatesApplied: any[];
	public candidatesOffered: any[];
	public offersAccepted: any[];
	public jobContractors: any[];

	//busy Config
	busy: Subscription;

	constructor(private urlconfig: ConfigService, public router: Router, private _httpService: ApiCallService, private route: ActivatedRoute, public dialog: MatDialog, public snackBar: MatSnackBar, private datePipe: DatePipe) {
		this.imgBaseUrl = urlconfig.img_base_url;
		this.companyid = localStorage.getItem('ogCompanyObjID');
		let jobId = {
			jobid: this.route.snapshot.params['job_id'],
			companyid: localStorage.getItem('ogCompanyObjID'),
		}
		this.getJobDetails(jobId);
		this.getJobContractors(jobId);
	}

	getJobDetails(jobId) {
		this.busy = this._httpService.getJobDetails(jobId)
			.subscribe(
				response => {
					if (response.success) {
						this.jobDetails = response.job;
						this.companyDetails = response.job.companyid;
						this.candidatesApplied = response.job.candidatesapplied;
						this.candidatesOffered = response.job.candidatesseleceted;
						this.offersAccepted = response.job.candidatessigned;
						// console.log(this.jobDetails.jobperiodfrom);
						// console.log(this.jobDetails.jobperiodfrom.split("/").reverse().join("/"));
						this.jobDetails.jobperiodfrom = this.jobDetails.jobperiodfrom.split("/").reverse().join("/");
						this.jobDetails.jobperiodto = this.jobDetails.jobperiodto.split("/").reverse().join("/");
						// this.getDateArray(startDate, endDate);
						console.log(this.jobDetails);
					} else if (!response.success) {
						console.log(response);
					}
				},
				error => {
					console.log(error);
				}
			);
	}

	getJobContractors(jobId) {
		this.busy = this._httpService.getJobContractors(jobId)
			.subscribe(
				response => {
					if (response.success) {
						// console.log(response);
						this.jobContractors = response.contracts;
					} else if (!response.success) {
						// console.log(response);
					}
				},
				error => {
					console.log(error);
				}
			);
	}

	ngOnInit() { }

}