import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDatepickerInputEvent } from '@angular/material';
import { ApiCallService } from '../../../services/api-call.service';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { Subscription, Observable } from 'rxjs';
import { AsyncSubscriber } from '../../../services/async.service';
import { JobLocation } from '../../../classes/jobLocation';
import { Specialization } from '../../../classes/specialization';
import { WorkingEnvironment } from '../../../classes/workingEnvironment';
import { EmploymentType } from '../../../classes/employmentType';
import { MockDataService } from '../../../services/mock-data.service';

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
	parse: {
		// dateInput: 'DD/MM/YYYY',
	},
	display: {
		dateInput: 'DD MMM YYYY',
		monthYearLabel: 'MMM YYYY',
		dateA11yLabel: 'LL',
		monthYearA11yLabel: 'MMMM YYYY',
	},
};

@Component({
	selector: 'app-add-job',
	templateUrl: './add-job.component.html',
	styleUrls: ['./add-job.component.scss'],
	providers: [
		{ provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
		{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
	],
})
export class AddJobComponent implements OnInit {

	appearance$: Observable<any>;

	public jobDetails: any = {
		project: '',
		department: '',
		employmenttype: '',
		jobtitle: '',
		jobdescription: '',

		jobspecialization: '',
		otherjobspecialization: '',
		workingenvironment: [],

		numberofpax: '',
		graceperiod: '',
		overtimerounding: 15,
		jobperiodfrom: '',
		jobperiodto: '',
		starttime: '',
		endtime: '',
		workdaystype: '',
		sunday: false,
		monday: true,
		tuesday: true,
		wednesday: true,
		thursday: true,
		friday: true,
		saturday: false,

		addresspostalcode: '',
		// addressblock: '',
		addressstreet: '',
		addressunit: '',
		locationmain: '',
		addresslocation: '',

		chargerate: '',
		markuprate: '',
		markupratetype: '',
		salary: '',
		markuprateincurrency: '',

		autooffer: true,
		autoofferaccept: true,

		breaks: [],
	}

	public workMinEndTime;
	public breakMinStartTime;
	public breakMaxEndTime;

	public locationmain: string;

	public companyid: string;
	public jobperiodfrom: any;
	public jobperiodto: any;

	public chargerate: string;
	public markuprate: string;
	public markupratetype: string;
	public salary: string;
	public markuprateincurrency: string;

	public isPartTimeJob: boolean;
	public showfulltimespeccilization: boolean;
	public showparttimespeccilization: boolean;

	public companyDetails: any = [];

	//busy Config
	busy: Subscription;

	public maxpax: number[];
	public graceperiods: number[];
	public overtimeroundings: number[];
	public FullTimeSpecializations: Specialization[];
	public PartTimeSpecializations: Specialization[];
	public Locations: JobLocation[];
	public WorkingEnvironments: WorkingEnvironment[];
	public EmploymentTypes: EmploymentType[];

	constructor(private _httpService: ApiCallService, public snackBar: MatSnackBar, private route: ActivatedRoute, private datePipe: DatePipe, private asyncSubscriber: AsyncSubscriber, private mockDataService: MockDataService) {

		this.appearance$ = asyncSubscriber.getAppearance.pipe();

		this.companyid = this.route.snapshot.params['emp_id'];

		this.getEmployerDetails({ companyid: this.companyid });

		this.getEmploymentTypes();
		this.getWorkingEnvironments();
		this.getJobLocations();
		this.getFullTimeSpecializations();
		this.getPartTimeSpecializations();
		this.getGracePeriods();
		this.getOverTimeRoundings();
		this.getPaxs();
	}

	getEmploymentTypes(): void {
		this.mockDataService.getEmploymentTypes()
			.subscribe(EmploymentTypes => this.EmploymentTypes = EmploymentTypes);
	}
	getWorkingEnvironments(): void {
		this.mockDataService.getWorkingEnvironments()
			.subscribe(WorkingEnvironments => this.WorkingEnvironments = WorkingEnvironments);
	}
	getJobLocations(): void {
		this.mockDataService.getJobLocations()
			.subscribe(Locations => this.Locations = Locations);
	}
	getFullTimeSpecializations(): void {
		this.mockDataService.getSpecializations()
			.subscribe(Specializations => {
				this.FullTimeSpecializations = Specializations.filter(specialization => specialization.type === 1 || specialization.type === 3);
			});
	}
	getPartTimeSpecializations(): void {
		this.mockDataService.getSpecializations()
			.subscribe(Specializations => {
				this.PartTimeSpecializations = Specializations.filter(specialization => specialization.type === 2 || specialization.type === 3);
			});
	}
	getGracePeriods(): void {
		this.mockDataService.getGracePeriods()
			.subscribe(graceperiods => this.graceperiods = graceperiods);
	}
	getOverTimeRoundings(): void {
		this.mockDataService.getOverTimeRoundings()
			.subscribe(overtimeroundings => this.overtimeroundings = overtimeroundings);
	}
	getPaxs(): void {
		this.mockDataService.getPaxs()
			.subscribe(pax => this.maxpax = pax);
	}

	startTimeChange(event) {
		this.workMinEndTime = new Date(event.value.getTime() + 3600000); // + 1 hr in ms
		this.workMinEndTime.toLocaleDateString();

		this.jobDetails.endtime = new Date(event.value.getTime() + 32400000); // + 9 hr in ms
		this.jobDetails.endtime.toLocaleDateString();

		this.breakMinStartTime = new Date(event.value.getTime() + 600000); // + 10 min in ms
		this.breakMinStartTime.toLocaleDateString();

		this.breakMaxEndTime = new Date(this.jobDetails.endtime.getTime() - 600000); // - 10 min in ms
		this.breakMaxEndTime.toLocaleDateString();
	}

	endTimeChange(event) {
		this.breakMaxEndTime = new Date(event.value.getTime() - 600000); // - 10 min in ms
		this.breakMaxEndTime.toLocaleDateString();
	}

	breakStartTimeChange(event, index) {
		// console.log(event);
		// console.log(index);
		let endtime = new Date(event.value.getTime() + 3600000); // + 1 hr in ms
		endtime.toLocaleDateString();
		this.jobDetails.breaks[index].endtime = endtime;
	}

	// changeSpecialization(event) {
	// 	// console.log(event);
	// 	if (event.value == "Others") {
	// 		this.otherspecialization = true;
	// 	} else {
	// 		this.otherspecialization = false;
	// 	}
	// }

	// Check Array Contain Elements
	isInArray(array, word) {
		// console.log(array.indexOf(word));
		// console.log(array.includes(word));
		// console.log(array.indexOf(word) > -1);
		// console.log(array.indexOf(word.toLowerCase()) > -1);
		return array.includes(word);
	}

	// If Employment Type Change
	employmenttypeChange(event) {
		console.log(event);
		if (event == null) return false;

		if (this.isInArray(event, "Full Time")) {
			this.isPartTimeJob = false;
		} else {
			this.isPartTimeJob = true;
		}

		if (this.isInArray(event, "Full Time")) {
			this.showfulltimespeccilization = true;
		} else {
			this.showfulltimespeccilization = false;
		}

		if (this.isInArray(event, "Part Time")) {
			this.showparttimespeccilization = true;
		}
		else {
			this.showparttimespeccilization = false;
		}
	}

	vlidateChargingRate() {
		if ((this.jobDetails.chargerate != undefined && this.jobDetails.chargerate != "") && (this.jobDetails.markuprate != undefined && this.jobDetails.markuprate != "") && this.jobDetails.markupratetype != undefined) {
			// console.log(this.jobDetails.chargerate);
			// console.log(this.jobDetails.markuprate);
			// console.log(this.jobDetails.markupratetype);

			if (this.jobDetails.markupratetype == "percentage") {
				this.jobDetails.salary = (((1 - (Number(this.jobDetails.markuprate) / 100)) * Number(this.jobDetails.chargerate)).toFixed(1));
				this.jobDetails.markuprateincurrency = ((Number(this.jobDetails.chargerate) - (1 - (Number(this.jobDetails.markuprate) / 100)) * Number(this.jobDetails.chargerate)).toFixed(1));
			}

			if (this.jobDetails.markupratetype == "sgdollar") {
				this.jobDetails.salary = (Number(this.jobDetails.chargerate) - Number(this.jobDetails.markuprate)).toFixed(1);
				this.jobDetails.markuprateincurrency = Number(this.jobDetails.markuprate).toFixed(1);
			}
		}
	}

	getEmployerDetails(employerId) {
		this.busy = this._httpService.getEmployerDetails(employerId)
			.subscribe(
				response => {
					if (response.success) {
						this.companyDetails = response.employer;
						// console.log(this.companyDetails);
					} else if (!response.success) {
						console.log(response);
					}
				},
				error => {
					console.log(error);
				}
			);
	}

	jobAddToEmployer(employerJobData: any, employerJobForm) {
		let companyid = { "companyid": this.companyid };
		employerJobData = Object.assign(employerJobData, companyid);

		let jobperiodfrom = { "jobperiodfrom": this.datePipe.transform(employerJobData.jobperiodfrom, 'yyyy/MM/dd') };
		employerJobData = Object.assign(employerJobData, jobperiodfrom);

		let jobperiodto = { "jobperiodto": this.datePipe.transform(employerJobData.jobperiodto, 'yyyy/MM/dd') };
		employerJobData = Object.assign(employerJobData, jobperiodto);

		let starttime = { "starttime": this.datePipe.transform(employerJobData.starttime, 'HH:mm') };
		employerJobData = Object.assign(employerJobData, starttime);

		let endtime = { "endtime": this.datePipe.transform(employerJobData.endtime, 'HH:mm') };
		employerJobData = Object.assign(employerJobData, endtime);

		// let jobspecialization = { "jobspecialization": employerJobData.jobspecialization.specialization };
		// employerJobData = Object.assign(employerJobData, jobspecialization);

		// let autooffer = { "autooffer": employerJobData.autooffer == true ? "true" : "false" };
		// employerJobData = Object.assign(employerJobData, autooffer);

		// let autoofferaccept = { "autoofferaccept": employerJobData.autoofferaccept == true ? "true" : "false" };
		// employerJobData = Object.assign(employerJobData, autoofferaccept);

		// let jobaddedby = { "jobaddedby": "ooget-team" };
		// employerJobData = Object.assign(employerJobData, jobaddedby);

		// let jobstatus = { "jobstatus": "live" };
		// employerJobData = Object.assign(employerJobData, jobstatus);

		let newBreaks: any[] = [];
		let oldBresks = this.jobDetails.breaks;
		if (oldBresks.length > 0) {
			for (let i = 0; i < oldBresks.length; i++) {
				newBreaks.push({
					breakname: oldBresks[i].breakname,
					breakstart: this.datePipe.transform(oldBresks[i].starttime, 'HH:mm'),
					breakend: this.datePipe.transform(oldBresks[i].endtime, 'HH:mm'),
				})
			}
		}

		let Breaks = { "breaktime": newBreaks };
		employerJobData = Object.assign(employerJobData, Breaks);

		console.log(employerJobData);
		this._httpService.jobAddToEmployer(employerJobData)
			.subscribe(
				response => {
					if (response.success) {
						employerJobForm.resetForm();
						console.log("Job Added Successfully");
						let snackBarRef = this.snackBar.open('Job Added Successfully.', 'Close', {
							duration: 5000,
						});

						snackBarRef.onAction().subscribe(() => {
							snackBarRef.dismiss();
							console.log('The snack-bar action was triggered!');
						});
					} else if (!response.success) {
						console.log(response);
					}
				},
				error => {
					console.log(error);
				}
			);
	}

	// ======================

	addBreak() {
		this.jobDetails.breaks.push({ breakname: '', starttime: '', endtime: '' });
	}
	removeBreak(index) {
		index = Number(index);
		this.jobDetails.breaks.splice(index, 1);
	}
	public trackByIndex(index: number, item) {
		return index;
	}

	ngOnInit() { }
}
