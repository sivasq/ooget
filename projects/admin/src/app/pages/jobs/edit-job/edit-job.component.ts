import { Component, OnInit, EventEmitter, HostListener } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material';
import { MatSnackBar } from '@angular/material';
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
import { JobLocation, JobRegion } from '../../../classes/jobLocation';
import { WorkingEnvironment } from '../../../classes/workingEnvironment';
import { EmploymentType } from '../../../classes/employmentType';
import { isArray } from 'util';

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
		project_name: '',
		department: '',
		employment_type: '',
		job_name: '',
		description: '',

		specializations: '',
		otherjobspecialization: '',
		working_environment: [],

		pax_total: '',
		grace_period: '',
		over_time_rounding: '',
		jobperiodfrom: '',
		jobperiodto: '',
		starttime: '',
		endtime: '',
		work_days_type: '',
		sunday: '',
		monday: '',
		tuesday: '',
		wednesday: '',
		thursday: '',
		friday: '',
		saturday: '',

		postal_code: '',
		// addressblock: '',
		address: '',
		unit_no: '',
		region: '',
		location: '',

		charge_rate: '',
		markup_rate: '',
		markup_in: '',
		jobseeker_salary: '',
		markup_amount: '',

		auto_offered: '',
		auto_accepted: '',

		breaks: [],
	};

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

	// busy Config
	busy: Subscription;

	public maxpax: number[];
	public graceperiods: number[];
	public overtimeroundings: number[];
	public FullTimeSpecializations: Specialization[];
	public PartTimeSpecializations: Specialization[];
	public Regions: JobRegion[];
	public Locations: JobLocation[];
	public WorkingEnvironments: WorkingEnvironment[];
	public EmploymentTypes: EmploymentType[];

	constructor(private _httpService: ApiCallService, public snackBar: MatSnackBar, private route: ActivatedRoute, public router: Router, private datePipe: DatePipe, private asyncSubscriber: AsyncSubscriber, private mockDataService: MockDataService) {

		this.appearance$ = asyncSubscriber.getAppearance.pipe();

		this.companyid = this.route.snapshot.params['emp_id'];
		this.jobid = this.route.snapshot.params['job_id'];
		// this.otherspecialization = false;

		const jobId = {
			jobid: this.route.snapshot.params['job_id'],
			companyid: this.route.snapshot.params['emp_id'],
		};
		this.getJobDetails(jobId);

		this.getEmployerDetails({ employerid: this.companyid });

		this.getEmploymentTypes();
		this.getWorkingEnvironments();
		this.getJobRegions();
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
	getJobRegions(): void {
		this.mockDataService.getJobRegions()
			.subscribe(Regions => this.Regions = Regions);
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
		const event = this.jobDetails.starttime;

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
		const event = this.jobDetails.starttime;

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
		const event = this.jobDetails.endtime;
		this.breakMaxEndTime = new Date(event.getTime() - 600000); // - 10 min in ms
		this.breakMaxEndTime.toLocaleDateString();
	}

	breakStartTimeChange(event, index) {
		// console.log(event);
		// console.log(index);
		const endtime = new Date(event.value.getTime() + 3600000); // + 1 hr in ms
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
		if (event == null) { return false; }

		if (event == 2) {
			this.isPartTimeJob = false;
		} else {
			this.isPartTimeJob = true;
		}

		if (event == 2) {
			this.showfulltimespeccilization = true;
		} else {
			this.showfulltimespeccilization = false;
		}

		if (event == 1) {
			this.showparttimespeccilization = true;
		} else {
			this.showparttimespeccilization = false;
		}
	}

	vlidateChargingRate() {
		if ((this.jobDetails.charge_rate != undefined && this.jobDetails.charge_rate != '') && (this.jobDetails.markup_rate != undefined && this.jobDetails.markup_rate != '') && this.jobDetails.markup_in != undefined) {
			// console.log(this.jobDetails.charge_rate);
			// console.log(this.jobDetails.markup_rate);
			// console.log(this.jobDetails.markup_in);

			if (this.jobDetails.markup_in == '%') {
				this.jobDetails.jobseeker_salary = (((1 - (Number(this.jobDetails.markup_rate) / 100)) * Number(this.jobDetails.charge_rate)).toFixed(1));
				this.jobDetails.markup_amount = ((Number(this.jobDetails.charge_rate) - (1 - (Number(this.jobDetails.markup_rate) / 100)) * Number(this.jobDetails.charge_rate)).toFixed(1));
			}

			if (this.jobDetails.markup_in == '$') {
				this.jobDetails.jobseeker_salary = (Number(this.jobDetails.charge_rate) - Number(this.jobDetails.markup_rate)).toFixed(1);
				this.jobDetails.markup_amount = Number(this.jobDetails.markup_rate).toFixed(1);
			}
		}
	}

	convertNextDay(date) {
		const previousDate = new Date(date);
		const nextday = new Date(previousDate.getTime() + 86400000); // + 1 hr in ms
		return nextday;
	}

	getEmployerDetails(employerId) {
		this.busy = this._httpService.getEmployer(employerId)
			.subscribe(
				response => {
					if (response.success) {
						this.companyDetails = response.result[0];
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
						const currentDate = this.datePipe.transform(new Date(), 'yyyy/MM/dd');
						let result = response.result;
						this.jobDetails.project_name = result.project_name;
						this.jobDetails.department = result.department;
						this.jobDetails.employment_type = result.employment_type;
						this.jobDetails.job_name = result.job_name;
						this.jobDetails.description = result.description;

						this.employmenttypeChange(result.employment_type);

						this.jobDetails.specializations = Number(result.specializations);
						this.jobDetails.otherjobspecialization = result.otherjobspecialization;
						this.jobDetails.working_environment = this.stringToArray(result.working_environment);

						this.jobDetails.pax_total = result.pax_total;
						this.jobDetails.grace_period = Number(result.grace_period);
						this.jobDetails.over_time_rounding = Number(result.over_time_rounding);
						this.jobDetails.jobperiodfrom = new Date(result.from);
						this.jobDetails.jobperiodto = new Date(result.to);

						if (new Date(currentDate + ' ' + result.start_time) > new Date(currentDate + ' ' + result.end_time)) {
							this.jobDetails.starttime = new Date(currentDate + ' ' + result.start_time);
							this.jobDetails.endtime = this.convertNextDay(currentDate + ' ' + result.end_time);
						} else {
							this.jobDetails.starttime = new Date(currentDate + ' ' + result.start_time);
							this.jobDetails.endtime = new Date(currentDate + ' ' + result.end_time);
						}

						this.jobDetails.work_days_type = String(result.work_days_type);
						if (result.workdays) {
							this.jobDetails.sunday = result.workdays.sunday;
							this.jobDetails.monday = result.workdays.monday;
							this.jobDetails.tuesday = result.workdays.tuesday;
							this.jobDetails.wednesday = result.workdays.wednesday;
							this.jobDetails.thursday = result.workdays.thursday;
							this.jobDetails.friday = result.workdays.friday;
							this.jobDetails.saturday = result.workdays.saturday;
						}

						this.jobDetails.postal_code = result.postal_code;
						// this.jobDetails.addressblock = response.job.addressblock;
						this.jobDetails.address = result.address;
						this.jobDetails.unit_no = result.unit_no;
						this.jobDetails.region = Number(result.region);
						this.jobDetails.location = Number(result.location);

						this.jobDetails.charge_rate = result.charge_rate;
						this.jobDetails.markup_rate = result.markup_rate;
						this.jobDetails.markup_in = result.markup_in;
						this.jobDetails.jobseeker_salary = result.jobseeker_salary;
						this.jobDetails.markup_amount = result.markup_amount;

						this.jobDetails.auto_offered = result.auto_offered;
						this.jobDetails.auto_accepted = result.auto_accepted;

						const oldBreaks = result.breaklist;
						if (oldBreaks.length > 0) {
							for (let i = 0; i < oldBreaks.length; i++) {
								if (new Date(currentDate + ' ' + oldBreaks[i].breakstart) > new Date(currentDate + ' ' + oldBreaks[i].breakend)) {
									this.jobDetails.breaks.push({
										breakname: oldBreaks[i].break_name,
										starttime: new Date(currentDate + ' ' + oldBreaks[i].from),
										endtime: this.convertNextDay(currentDate + ' ' + oldBreaks[i].to),
									});
								} else {
									this.jobDetails.breaks.push({
										breakname: oldBreaks[i].break_name,
										starttime: new Date(currentDate + ' ' + oldBreaks[i].from),
										endtime: new Date(currentDate + ' ' + oldBreaks[i].to),
									});
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

		const jobid = { 'jobid': this.route.snapshot.params['job_id'] };
		employerJobData = Object.assign(employerJobData, jobid);

		const companyid = { 'employer_id': this.companyid };
		employerJobData = Object.assign(employerJobData, companyid);

		const minOverTime = { 'over_time_minimum': 30 };
		employerJobData = Object.assign(employerJobData, minOverTime);

		// Job Perid From
		const jobperiodfrom = { 'from': this.datePipe.transform(employerJobData.jobperiodfrom, 'yyyy-MM-dd') };
		employerJobData = Object.assign(employerJobData, jobperiodfrom);

		// Job Perid To
		const jobperiodto = { 'to': this.datePipe.transform(employerJobData.jobperiodto, 'yyyy-MM-dd') };
		employerJobData = Object.assign(employerJobData, jobperiodto);

		// Job Start Time
		const starttime = { 'start_time': this.datePipe.transform(employerJobData.starttime, 'HH:mm') };
		employerJobData = Object.assign(employerJobData, starttime);

		// Job End Time
		const endtime = { 'end_time': this.datePipe.transform(employerJobData.endtime, 'HH:mm') };
		employerJobData = Object.assign(employerJobData, endtime);

		const workingEnvironment = { 'working_environment': this.ArrayToString(employerJobData.working_environment) };
		employerJobData = Object.assign(employerJobData, workingEnvironment);

		// let jobspecialization = { "jobspecialization": employerJobData.jobspecialization.specialization };
		// employerJobData = Object.assign(employerJobData, jobspecialization);

		// let autooffer = { "auto_offered": employerJobData.auto_offered == true ? "true" : "false" };
		// employerJobData = Object.assign(employerJobData, autooffer);

		// let autoofferaccept = { "auto_accepted": employerJobData.auto_accepted == true ? "true" : "false" };
		// employerJobData = Object.assign(employerJobData, autoofferaccept);

		// let jobaddedby = { "jobaddedby": "ooget-team" };
		// employerJobData = Object.assign(employerJobData, jobaddedby);

		// let jobstatus = { "jobstatus": "live" };
		// employerJobData = Object.assign(employerJobData, jobstatus);

		const newBreaks: any[] = [];
		const oldBreaks = this.jobDetails.breaks;
		if (oldBreaks.length > 0) {
			for (let i = 0; i < oldBreaks.length; i++) {
				newBreaks.push({
					break_name: oldBreaks[i].breakname,
					from: this.datePipe.transform(oldBreaks[i].starttime, 'HH:mm'),
					to: this.datePipe.transform(oldBreaks[i].endtime, 'HH:mm'),
				});
			}
		}

		const Breaks = { 'break': newBreaks };
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
						console.log('Job Updated Successfully');
						const snackBarRef = this.snackBar.open('Job Updated Successfully.', 'Close', {
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
	trackByIndex(index: number, item) {
		return index;
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
