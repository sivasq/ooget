import { Component, OnInit, EventEmitter, HostListener } from '@angular/core';
import { MatSnackBar, MatDatepickerInputEvent } from '@angular/material';
import { ApiCallService } from '../../../services/api-call.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { Subscription, Observable } from 'rxjs';
import { AsyncSubscriber } from '../../../services/async.service';
import { MockDataService } from '../../../services/mock-data.service';
import { Specialization } from '../../../classes/specialization';
import { JobLocation } from '../../../classes/jobLocation';
import { WorkingEnvironment } from '../../../classes/workingEnvironment';
import { EmploymentType } from '../../../classes/employmentType';

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
	selector: 'app-edit-job',
	templateUrl: './edit-job.component.html',
	styleUrls: ['./edit-job.component.scss'],
	providers: [
		{ provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
		{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
	],
})
export class EditJobComponent implements OnInit {

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
		overtimerounding: '',
		jobperiodfrom: '',
		jobperiodto: '',
		starttime: '',
		endtime: '',
		workdaystype: '',
		sunday: '',
		monday: '',
		tuesday: '',
		wednesday: '',
		thursday: '',
		friday: '',
		saturday: '',

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

		autooffer: '',
		autoofferaccept: '',

		breaks: [],
	}

	public workMinEndTime;
	public breakMinStartTime;
	public breakMaxEndTime;

	public companyid: string;
	public jobid: string;

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

	constructor(private _httpService: ApiCallService, public snackBar: MatSnackBar, private route: ActivatedRoute, public router: Router, private datePipe: DatePipe, private asyncSubscriber: AsyncSubscriber, private mockDataService: MockDataService) {

		this.appearance$ = asyncSubscriber.getAppearance.pipe();

		this.companyid = this.route.snapshot.params['emp_id'];
		this.jobid = this.route.snapshot.params['job_id'];
		// this.otherspecialization = false;

		let jobId = {
			jobid: this.route.snapshot.params['job_id'],
			companyid: this.route.snapshot.params['emp_id'],
		}
		this.getJobDetails(jobId);

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

	startTimeChange() {
		let event = this.jobDetails.starttime;

		this.workMinEndTime = new Date(event.getTime() + 3600000); // + 1 hr in ms
		this.workMinEndTime.toLocaleDateString();

		this.jobDetails.endtime = new Date(event.getTime() + 32400000); // + 9 hr in ms
		this.jobDetails.endtime.toLocaleDateString();

		this.breakMinStartTime = new Date(event.getTime() + 600000); // + 10 min in ms
		this.breakMinStartTime.toLocaleDateString();

		this.breakMaxEndTime = new Date(this.jobDetails.endtime.getTime() - 600000); // - 10 min in ms
		this.breakMaxEndTime.toLocaleDateString();
	}

	startTimeChangeOnFetch() {
		let event = this.jobDetails.starttime;

		this.workMinEndTime = new Date(event.getTime() + 3600000); // + 1 hr in ms
		this.workMinEndTime.toLocaleDateString();

		// this.jobDetails.endtime = new Date(event.getTime() + 32400000); // + 9 hr in ms
		// this.jobDetails.endtime.toLocaleDateString();

		this.breakMinStartTime = new Date(event.getTime() + 600000); // + 10 min in ms
		this.breakMinStartTime.toLocaleDateString();

		this.breakMaxEndTime = new Date(this.jobDetails.endtime.getTime() - 600000); // - 10 min in ms
		this.breakMaxEndTime.toLocaleDateString();
	}

	endTimeChange() {
		let event = this.jobDetails.endtime;
		this.breakMaxEndTime = new Date(event.getTime() - 600000); // - 10 min in ms
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
			console.log('Full Time');
		} else {
			this.isPartTimeJob = true;
			console.log('Part Time');
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

	convertNextDay(date) {
		let previousDate = new Date(date);
		let nextday = new Date(previousDate.getTime() + 86400000); // + 1 hr in ms
		return nextday;
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

	getJobDetails(jobId) {
		this.busy = this._httpService.getJobDetails(jobId)
			.subscribe(
				response => {
					if (response.success) {
						let currentDate = this.datePipe.transform(new Date(), 'yyyy/MM/dd');

						this.jobDetails.project = response.job.project;
						this.jobDetails.department = response.job.department;
						this.jobDetails.employmenttype = response.job.employmenttype;
						this.jobDetails.jobtitle = response.job.jobtitle;
						this.jobDetails.jobdescription = response.job.jobdescription;

						this.employmenttypeChange(response.job.employmenttype);

						this.jobDetails.jobspecialization = response.job.jobspecialization;
						this.jobDetails.otherjobspecialization = response.job.otherjobspecialization;
						this.jobDetails.workingenvironment = response.job.workingenvironment;

						this.jobDetails.numberofpax = response.job.numberofpax;
						this.jobDetails.graceperiod = response.job.graceperiod;
						this.jobDetails.overtimerounding = response.job.overtimerounding;
						this.jobDetails.jobperiodfrom = new Date(response.job.jobperiodfrom);
						this.jobDetails.jobperiodto = new Date(response.job.jobperiodto);

						if (new Date(currentDate + " " + response.job.starttime) > new Date(currentDate + " " + response.job.endtime)) {
							this.jobDetails.starttime = new Date(currentDate + " " + response.job.starttime);
							this.jobDetails.endtime = this.convertNextDay(currentDate + " " + response.job.endtime);
						} else {
							this.jobDetails.starttime = new Date(currentDate + " " + response.job.starttime);
							this.jobDetails.endtime = new Date(currentDate + " " + response.job.endtime);
						}

						this.jobDetails.workdaystype = response.job.workdaystype;
						if (response.job.workdays) {
							this.jobDetails.sunday = response.job.workdays.sunday;
							this.jobDetails.monday = response.job.workdays.monday;
							this.jobDetails.tuesday = response.job.workdays.tuesday;
							this.jobDetails.wednesday = response.job.workdays.wednesday;
							this.jobDetails.thursday = response.job.workdays.thursday;
							this.jobDetails.friday = response.job.workdays.friday;
							this.jobDetails.saturday = response.job.workdays.saturday;
						}

						this.jobDetails.addresspostalcode = response.job.addresspostalcode;
						// this.jobDetails.addressblock = response.job.addressblock;
						this.jobDetails.addressstreet = response.job.addressstreet;
						this.jobDetails.addressunit = response.job.addressunit;
						this.jobDetails.locationmain = response.job.addressregion;
						this.jobDetails.addresslocation = response.job.addresslocation;

						this.jobDetails.chargerate = response.job.chargerate;
						this.jobDetails.markuprate = response.job.markuprate;
						this.jobDetails.markupratetype = response.job.markupratetype;
						this.jobDetails.salary = response.job.salary;
						this.jobDetails.markuprateincurrency = response.job.markuprateincurrency;

						this.jobDetails.autooffer = response.job.autooffer;
						this.jobDetails.autoofferaccept = response.job.autoofferaccept;

						let oldBreaks = response.job.breaktime;
						if (oldBreaks.length > 0) {
							for (let i = 0; i < oldBreaks.length; i++) {
								if (new Date(currentDate + " " + oldBreaks[i].breakstart) > new Date(currentDate + " " + oldBreaks[i].breakend)) {
									this.jobDetails.breaks.push({
										breakname: oldBreaks[i].breakname,
										starttime: new Date(currentDate + " " + oldBreaks[i].breakstart),
										endtime: this.convertNextDay(currentDate + " " + oldBreaks[i].breakend),
									})
								} else {
									this.jobDetails.breaks.push({
										breakname: oldBreaks[i].breakname,
										starttime: new Date(currentDate + " " + oldBreaks[i].breakstart),
										endtime: new Date(currentDate + " " + oldBreaks[i].breakend),
									})
								}
							}
						}

						this.startTimeChangeOnFetch();
						this.endTimeChange();

					} else if (!response.success) {
						console.log(response);
					}
				},
				error => {
					console.log(error);
				}
			);
	}

	jobUpdateToEmployer(employerJobData: any, employerJobForm) {

		let jobid = { "jobid": this.route.snapshot.params['job_id'] };
		employerJobData = Object.assign(employerJobData, jobid);

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
		let oldBreaks = this.jobDetails.breaks;
		if (oldBreaks.length > 0) {
			for (let i = 0; i < oldBreaks.length; i++) {
				newBreaks.push({
					breakname: oldBreaks[i].breakname,
					breakstart: this.datePipe.transform(oldBreaks[i].starttime, 'HH:mm'),
					breakend: this.datePipe.transform(oldBreaks[i].endtime, 'HH:mm'),
				})
			}
		}

		let Breaks = { "breaktime": newBreaks };
		employerJobData = Object.assign(employerJobData, Breaks);

		console.log(employerJobData);

		// let snackBarRef = this.snackBar.open('Backend Process Not Done, Pleae Wait...', 'Close', {
		// 	duration: 5000,
		// });

		// snackBarRef.onAction().subscribe(() => {
		// 	snackBarRef.dismiss();
		// 	console.log('The snack-bar action was triggered!');
		// });

		this._httpService.jobUpdateToEmployer(employerJobData)
			.subscribe(
				response => {
					if (response.success) {
						// employerJobForm.resetForm();
						console.log("Job Updated Successfully");
						let snackBarRef = this.snackBar.open('Job Updated Successfully.', 'Close', {
							duration: 5000,
						});

						snackBarRef.onAction().subscribe(() => {
							snackBarRef.dismiss();
							console.log('The snack-bar action was triggered!');
						});

						this.router.navigate(['admin/employers/' + this.companyid + '/jobs/' + this.jobid + '/view']);

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
