import { Component, OnInit, HostListener } from '@angular/core';
import { ApiCallService } from '../../../services/api-call.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConfigService } from '../../../services/config.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DatePipe } from '@angular/common';
import { JobRegion, JobLocation } from '../../../classes/jobLocation';
import { Specialization } from '../../../classes/Specialization';
import { WorkingEnvironment } from '../../../classes/WorkingEnvironment';
import { Industry } from '../../../classes/industry';
import { MockDataService } from '../../../services/mock-data.service';
import { isArray } from 'util';

@Component({
	selector: 'app-job-details',
	templateUrl: './job-details.component.html',
	styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {
	public baseUrl;

	public jobDetails: any = [];
	objectKeys = Object.keys;
	public companyid;
	public companyDetails: any;

	public candidatesApplied: any[];
	public candidatesOffered: any[];
	public offersAccepted: any[];
	public jobContractors: any[];

	employmentType = ['', 'Part Time', 'Full Time'];
	jobStatus = ['', 'Pending', 'Live', 'Closed'];
	workDaysType = ['', 'Normal', 'Flexible'];
	Regions: JobRegion[];
	JobLocations: JobLocation[];
	Specializations: Specialization[];
	WorkingEnvironments: WorkingEnvironment[];
	Industries: Industry[];

	// busy Config
	busy: Subscription;

	constructor(private urlconfig: ConfigService, public router: Router, private _httpService: ApiCallService, private route: ActivatedRoute, public dialog: MatDialog, public snackBar: MatSnackBar, private datePipe: DatePipe, private mockDataService: MockDataService) {
		this.baseUrl = urlconfig.base_url;
		this.companyid = localStorage.getItem('ogCompanyObjID');
		let jobId = {
			jobid: this.route.snapshot.params['job_id'],
			companyid: localStorage.getItem('ogCompanyObjID'),
		}
		this.getWorkingEnvironments();
		this.getJobRegions();
		this.getJobLocations();
		this.getSpecializations();
		this.getIndustries();
		this.getJobDetails();
		this.getJobContractors(jobId);
	}

	getWorkingEnvironments(): void {
		this.mockDataService.getWorkingEnvironments()
			.subscribe(WorkingEnvironments => this.WorkingEnvironments = WorkingEnvironments);
	}
	getJobRegions(): void {
		this.mockDataService.getJobRegions()
			.subscribe(Regions => this.Regions = Regions);
	}
	getJobLocations(): void {
		this.mockDataService.getJobLocations()
			.subscribe(Locations => this.JobLocations = Locations);
	}
	getSpecializations(): void {
		this.mockDataService.getSpecializations()
			.subscribe(Specializations => this.Specializations = Specializations);
	}
	getIndustries(): void {
		this.mockDataService.getIndustries()
			.subscribe(Industries => this.Industries = Industries);
	}

	getJobSpecializationName(SpecializationId) {
		if (SpecializationId == '' || SpecializationId == undefined) { return false; }

		let filteredSpecializations = this.Specializations.filter(specialization => specialization.id == SpecializationId);
		return filteredSpecializations[0].name;
	}

	getRegionName(regionId) {
		if (regionId == '' || regionId == undefined) { return false; }
		let filteredRegions = this.Regions.filter(region => region.id == regionId);
		return filteredRegions[0].name;
	}

	getJobLocationName(locationId) {
		if (locationId == '' || locationId == undefined) { return false; }
		let filteredLocation = this.JobLocations.filter(location => location.id == locationId);
		return filteredLocation[0].name;
	}

	getIndustryName(industryId) {
		if (industryId == '' || industryId == undefined) { return false; }
		let filteredIndustry = this.Industries.filter(industry => industry.id == industryId);
		return filteredIndustry[0].name;
	}

	getWorkingEnvironmentName(envId) {
		if (envId == '' || envId == undefined) { return false; }
		let envIds = this.stringToArray(envId);
		let filteredEnv = envIds.map(envid => {
			return this.WorkingEnvironments.filter(workEnv => workEnv.id == envid);
		});
		let filteredName = filteredEnv.map(env => env[0].name);
		return this.ArrayToString(filteredName);
	}

	getJobDetails() {
		this.busy = this._httpService.getJobDetails({ 'jobid': this.route.snapshot.params['job_id'] })
			.subscribe(
				response => {
					if (response.success) {
						this.jobDetails = response.result;
						// this.companyDetails = response.job.companyid;
						// this.candidatesApplied = response.job.candidatesapplied;
						// this.candidatesOffered = response.job.candidatesseleceted;
						// this.offersAccepted = response.job.candidatessigned;
						// console.log(this.jobDetails.jobperiodfrom);
						// console.log(this.jobDetails.jobperiodfrom.split("/").reverse().join("/"));
						this.jobDetails.jobperiodfrom = this.jobDetails.from.split('-').reverse().join('-');
						this.jobDetails.jobperiodto = this.jobDetails.to.split('-').reverse().join('-');
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

	ArrayToString(dataArray) {
		if (isArray(dataArray)) {
			dataArray.map(function (e) {
				// return JSON.stringify(e);
				return e;
			});
			return dataArray.join(',');
		}
	}

	stringToArray(dataString) {
		if (typeof dataString !== 'undefined' && dataString) {
			if (dataString.includes(',')) {
				return dataString.split(',').map(Number);
			} else {
				return [dataString].map(Number);
			}
		} else {
			return [];
		}
	}

	ngOnInit() { }

}
