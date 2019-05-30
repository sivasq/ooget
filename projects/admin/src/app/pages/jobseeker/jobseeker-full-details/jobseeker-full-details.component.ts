import { Component, OnInit, Input } from '@angular/core';
import { MenuPositionX, MatSnackBar, MatDialog, MatDialogConfig } from '@angular/material';
import { ApiCallService } from '../../../services/api-call.service';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from '../../../services/config.service';
import { Subscription } from 'rxjs';
import { ConfirmDialogComponent } from '../../../confirm-dialog/confirm-dialog.component';
import { isArray } from 'util';
import { MockDataService } from '../../../services/mock-data.service';
import { Industry } from '../../../classes/Industry';
import { WorkingEnvironment } from '../../../classes/WorkingEnvironment';
import { Specialization } from '../../../classes/Specialization';
import { JobLocation, JobRegion } from '../../../classes/jobLocation';
import { BankDetail } from '../../../classes/bankDetail';

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
	base_url;

	gender = ['', 'Male', 'Female'];
	employmentType = ['', 'Part Time', 'Full Time'];
	jobStatus = ['', 'Pending', 'Live', 'Closed'];
	workDaysType = ['', 'Normal', 'Flexible'];
	Regions: JobRegion[];
	JobLocations: JobLocation[];
	Specializations: Specialization[];
	WorkingEnvironments: WorkingEnvironment[];
	Industries: Industry[];
	BankDetails: BankDetail[];

	constructor(private _httpService: ApiCallService, private route: ActivatedRoute, public snackBar: MatSnackBar, public dialog: MatDialog, private config: ConfigService, private mockDataService: MockDataService) {

		this.base_url = config.base_url;
		this.jobseekerId = this.route.snapshot.params['js_id'];

		this.getBankDetails();
		this.getWorkingEnvironments();
		this.getJobRegions();
		this.getJobLocations();
		this.getSpecializations();
		this.getIndustries();

		this.getJobSeekerDetails({ 'jobseekerid': this.jobseekerId });
	}

	getBankDetails(): void {
		this.mockDataService.getBankDetails()
			.subscribe(BankDetails => this.BankDetails = BankDetails);
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

		// let filteredSpecializations = this.Specializations.filter(specialization => specialization.id == SpecializationId);
		// return filteredSpecializations[0].name;
		let SpecializationIds = this.stringToArray(SpecializationId);
		let filteredEnv = SpecializationIds.map(SpecializationId => {
			return this.Specializations.filter(Specialization => Specialization.id == SpecializationId);
		});
		let filteredName = filteredEnv.map(env => env[0].name);
		return this.ArrayToString(filteredName);
		// console.log(this.ArrayToString(filteredName));
		// return filteredName;
	}

	getRegionName(regionId) {
		if (regionId == '' || regionId == undefined) { return false; }
		// let filteredRegions = this.Regions.filter(region => region.id == regionId);
		// return filteredRegions[0].name;
		let regionIds = this.stringToArray(regionId);
		let filteredEnv = regionIds.map(regionid => {
			return this.Regions.filter(Region => Region.id == regionid);
		});
		let filteredName = filteredEnv.map(env => env[0].name);
		return this.ArrayToString(filteredName);
	}

	getJobLocationName(locationId) {
		if (locationId == '' || locationId == undefined) { return false; }
		// let filteredLocation = this.JobLocations.filter(location => location.id == locationId);
		// return filteredLocation[0].name;
		let locationIds = this.stringToArray(locationId);
		let filteredEnv = locationIds.map(locationId => {
			return this.JobLocations.filter(JobLocation => JobLocation.id == locationId);
		});
		let filteredName = filteredEnv.map(env => env[0].name);
		return this.ArrayToString(filteredName);
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

	parseStringToArray(stringArray) {
		console.log(stringArray);
		if (stringArray === undefined) { return JSON.parse('[]'); }
		console.log(JSON.parse(stringArray));
		return JSON.parse(stringArray);
	}

	toggleNricFinEditable(mode) {
		let confirmMsg;
		if (mode == 'true') {
			confirmMsg = 'Do you want Set Editable for Jobseeker ?'
		}

		if (mode == 'false') {
			confirmMsg = 'Do you want Remove Editable for Jobseeker ?'
		}

		let dialogConfig = new MatDialogConfig();
		dialogConfig.disableClose = true;
		dialogConfig.autoFocus = true;
		dialogConfig.data = {
			// boxTitle:"Confirmation",
			confirmMsg: '<h4>' + confirmMsg + '</h4>',
			okButtonText: 'Yes',
			noButtonText: 'No',
			actionalign: 'center'
		};
		let dialogref = this.dialog.open(ConfirmDialogComponent, dialogConfig);

		dialogref.afterClosed().subscribe(
			data => {
				// this.confirmResponse(data)
				if (data == 'yes') {
					this.busy = this._httpService.toggleNricFinEditable({ 'jobseekerid': this.jobseekerId, 'nriceditable': mode })
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
		if (mode == 'true') {
			confirmMsg = 'Do you want Enable to Jobseeker Can change Docments ?';
		}

		if (mode == 'false') {
			confirmMsg = 'Do you want Disable to Jobseeker Can change Docments ?';
		}

		let dialogConfig = new MatDialogConfig();
		dialogConfig.disableClose = true;
		dialogConfig.autoFocus = true;
		dialogConfig.data = {
			// boxTitle:"Confirmation",
			confirmMsg: '<h4>' + confirmMsg + '</h4>',
			okButtonText: 'Yes',
			noButtonText: 'No',
			actionalign: 'center'
		};
		let dialogref = this.dialog.open(ConfirmDialogComponent, dialogConfig);

		dialogref.afterClosed().subscribe(
			data => {
				// this.confirmResponse(data)
				if (data == 'yes') {
					this.busy = this._httpService.toggleIdProofEditable({ 'jobseekerid': this.jobseekerId, 'jobseekeridproofeditable': mode })
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
						if (response.result[0].bank_id != null) {
							let bankDetail = this.BankDetails.filter(bankDetail => bankDetail.id == response.result[0].bank_id);
							if (bankDetail.length > 0) {
								response.result[0].bankname = bankDetail[0].fullName;
								response.result[0].bankcode = bankDetail[0].bankCode;
							} else {
								response.result[0].bankname = null;
								response.result[0].bankcode = null;
							}
						}
						if (this.IsJsonString(response.result[0].experience_details)) {
							let expDetails = JSON.parse(response.result[0].experience_details);
							response.result[0].experience_details = expDetails;
							console.log(expDetails);
						} else {
							response.result[0].experience_details = [];
						}
						console.log(response.result[0]);
						this.jobSeekerDetails = response.result[0];
					} else if (!response.success) {
						console.log(response);
					}
				},
				error => {
					console.log(error);
				}
			);
	}

	IsJsonString(str) {
		try {
			JSON.parse(str);
		} catch (e) {
			return false;
		}
		return true;
	}

	ArrayToString(dataArray) {
		if (isArray(dataArray)) {
			dataArray.map(function (e) {
				// return JSON.stringify(e);
				return e;
			});
			return dataArray.join(', ');
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
