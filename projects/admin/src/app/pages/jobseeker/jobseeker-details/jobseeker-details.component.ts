import { Component, OnInit, Input } from '@angular/core';
import { ApiCallService } from '../../../services/api-call.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { MenuPositionX } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { ConfirmDialogComponent } from '../../../confirm-dialog/confirm-dialog.component';
import { Subscription } from 'rxjs';
import { JobRegion, JobLocation } from '../../../classes/jobLocation';
import { Specialization } from '../../../classes/Specialization';
import { WorkingEnvironment } from '../../../classes/WorkingEnvironment';
import { isArray } from 'util';
import { MockDataService } from '../../../services/mock-data.service';

@Component({
	selector: 'app-jobseeker-details',
	templateUrl: './jobseeker-details.component.html',
	styleUrls: ['./jobseeker-details.component.scss']
})
export class JobseekerDetailsComponent implements OnInit {

	@Input() xPosition: MenuPositionX

	public jobSeekerDetails: any = [];
	employerId;
	empJobId;
	jobseekerId;

	busy: Subscription;

	public isUnderOffered: boolean;
	public isOfferRejected: boolean;
	public isUnderContract: boolean;
	public helpTxt;

	gender = ['', 'Male', 'Female'];
	employmentType = ['', 'Part Time', 'Full Time'];
	Regions: JobRegion[];
	JobLocations: JobLocation[];
	Specializations: Specialization[];
	WorkingEnvironments: WorkingEnvironment[];

	constructor(private _httpService: ApiCallService, private route: ActivatedRoute, public snackBar: MatSnackBar, public dialog: MatDialog, private mockDataService: MockDataService) {
		this.employerId = this.route.snapshot.params['emp_id'];
		this.empJobId = this.route.snapshot.params['job_id'];
		this.jobseekerId = this.route.snapshot.params['js_id'];

		let jobseekerId = {
			jobseekerid: this.route.snapshot.params['js_id'],
			jobid: this.empJobId
		};
		this.getWorkingEnvironments();
		this.getJobRegions();
		this.getJobLocations();
		this.getSpecializations();

		this.getJobSeekerDetails({ 'jobseekerid': this.route.snapshot.params['js_id'] });
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

	getWorkingEnvironmentName(envId) {
		if (envId == '' || envId == undefined) { return false; }
		let envIds = this.stringToArray(envId);
		let filteredEnv = envIds.map(envid => {
			return this.WorkingEnvironments.filter(workEnv => workEnv.id == envid);
		});
		let filteredName = filteredEnv.map(env => env[0].name);
		return this.ArrayToString(filteredName);
	}
	isInArray(array, word) {
		// console.log(array.indexOf(word));
		// console.log(array.includes(word));
		// console.log(array.indexOf(word) > -1);
		// console.log(array.indexOf(word.toLowerCase()) > -1);
		return array.includes(word);
	}

	getJobSeekerDetails(jobseekerId) {
		this.busy = this._httpService.getJobseekerApplicationDetails(jobseekerId)
			.subscribe(
				response => {
					if (response.success) {
						if (this.IsJsonString(response.result[0].experience_details)) {
							let expDetails = JSON.parse(response.result[0].experience_details);
							response.result[0].experience_details = expDetails;
							// console.log(expDetails);
						} else {
							response.result[0].experience_details = [];
						}

						this.jobSeekerDetails = response.result[0];

						// let jobsselected: any[] = [];
						// let jobssigned: any[] = [];
						// let jobsrejected: any[] = [];

						// jobsselected = response.jobseeker.jobsselected;
						// jobssigned = response.jobseeker.jobssigned;
						// jobsrejected = response.jobseeker.rejectedjobs;

						// let isUnderContract = this.isInArray(jobssigned, this.empJobId);
						// let isOfferRejected = this.isInArray(jobsrejected, this.empJobId);
						// let isUnderOffered = this.isInArray(jobsselected, this.empJobId);

						let isUnderContract = this.jobSeekerDetails.offer_accepted;
						let isOfferRejected = this.jobSeekerDetails.offer_rejected;
						let isUnderOffered = this.jobSeekerDetails.offered_on;

						if (isUnderContract) {
							this.isUnderContract = true;
							this.isOfferRejected = false;
							this.isUnderOffered = false;
							this.helpTxt = 'He/She is Contract Signed In for this Job';
						} else if (isOfferRejected) {
							this.isUnderContract = false;
							this.isOfferRejected = true;
							this.isUnderOffered = false;
							this.helpTxt = 'He/she Rejected this Job Offer';
						} else if (isUnderOffered) {
							this.isUnderContract = false;
							this.isOfferRejected = false;
							this.isUnderOffered = true;
							this.helpTxt = 'Offer Sent for this Job';
						}
					} else if (!response.success) {
						// console.log(response);
					}
				},
				error => {
					// console.log(error);
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

	selectApplication(applicationId) {
		let dialogConfig = new MatDialogConfig();
		dialogConfig.disableClose = true;
		dialogConfig.autoFocus = true;
		dialogConfig.data = {
			boxTitle: 'Confirmation',
			confirmMsg: '<p>Are You Sure to Select This Candidate ?</p>',
			okButtonText: 'Yes',
			noButtonText: 'No',
			actionalign: 'center'
		};
		let dialogref = this.dialog.open(ConfirmDialogComponent, dialogConfig);

		dialogref.afterClosed().subscribe(
			data => {
				// this.confirmResponse(data)
				if (data == 'yes') {
					this.confirmSelectApplication(applicationId);
				} else if (data == 'no') {
					// console.log('no');
				}
			}
		);
	}

	confirmSelectApplication(applicationId) {
		// console.log({ jobid: this.empJobId, jobseekerid: this.jobseekerId });
		this.busy = this._httpService.selectApplication({ contracts_id: applicationId })
			.subscribe(
				response => {
					if (response.success) {
						this.isUnderContract = false;
						this.isOfferRejected = false;
						this.isUnderOffered = true;

						this.helpTxt = 'Offer Sent for this Job';

						let snackBarRef = this.snackBar.open('The Candidate Selected For This Job.', 'Close', {
							duration: 5000,
						});
						snackBarRef.onAction().subscribe(() => {
							snackBarRef.dismiss();
							// console.log('The snack-bar action was triggered!');
						});
					} else if (!response.success) {
						let snackBarRef = this.snackBar.open('The Candidate Already Selected For This Job.', 'Close', {
							duration: 5000,
						});

						snackBarRef.onAction().subscribe(() => {
							snackBarRef.dismiss();
							// console.log('The snack-bar action was triggered!');
						});
						// console.log(response);
					}
				},
				error => {
					// console.log(error);
				}
			);
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
