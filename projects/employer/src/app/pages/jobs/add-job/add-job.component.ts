import { Component, OnInit, NgZone, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { MatDatepickerInputEvent, MatSelect } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { MatTabHeaderPosition } from '@angular/material';
import { ApiCallService } from '../../../services/api-call.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { DatePipe } from '@angular/common';
import { TermsConditionsDialogComponent } from '../../../terms-conditions-dialog/terms-conditions-dialog.component';
import { ConfirmDialogComponent } from '../../../confirm-dialog/confirm-dialog.component';
import { Subscription, Observable } from 'rxjs';
import { AsyncSubscriber } from '../../../services/async.service';
import { Specialization } from '../../../classes/specialization';
import { JobLocation, JobRegion } from '../../../classes/jobLocation';
import { WorkingEnvironment } from '../../../classes/workingEnvironment';
import { EmploymentType } from '../../../classes/employmentType';
import { MockDataService } from '../../../services/mock-data.service';
import { isArray } from 'util';

@Component({
	selector: 'app-add-job',
	templateUrl: './add-job.component.html',
	styleUrls: ['./add-job.component.scss']
})
export class AddJobComponent implements OnInit {
	public dialogInitialTimeAt = new Date();

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
		over_time_rounding: 15,
		jobperiodfrom: '',
		jobperiodto: '',
		starttime: '',
		endtime: '',
		work_days_type: '',
		sunday: false,
		monday: true,
		tuesday: true,
		wednesday: true,
		thursday: true,
		friday: true,
		saturday: false,

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

		auto_offered: true,
		auto_accepted: true,

		breaks: [],
	};

	public workMinEndTime;
	public breakMinStartTime;
	public breakMaxEndTime;

	public region: string;

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

	public maxpax: number[];
	public graceperiods: number[];
	public overtimeroundings: number[];
	public FullTimeSpecializations: Specialization[];
	public PartTimeSpecializations: Specialization[];
	public Regions: JobRegion[];
	public Locations: JobLocation[];
	public WorkingEnvironments: WorkingEnvironment[];
	public EmploymentTypes: EmploymentType[];

	// busy Config
	busy: Subscription;
	@ViewChild('tabGroup') tabGroup;
	@ViewChild(MatSelect) mySelect;
	constructor(private ngZone: NgZone, private renderer: Renderer2, private el: ElementRef, private _httpService: ApiCallService, public dialog: MatDialog, public snackBar: MatSnackBar, private route: ActivatedRoute, public router: Router, private datePipe: DatePipe, private asyncSubscriber: AsyncSubscriber, private mockDataService: MockDataService) {
		this.dialogInitialTimeAt.setHours(0, 0, 0);

		this.appearance$ = asyncSubscriber.getAppearance.pipe();

		this.companyid = localStorage.getItem('ogCompanyObjID');

		// this.openTermsConditionsDialog('fileName');
		// this.getTermsAcceptanceStatus({ 'companyid': this.companyid });

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

	// ==========================
	getTermsAcceptanceStatus() {
		this.busy = this._httpService.getEmployer()
			.subscribe(
				response => {
					// console.log(response);
					if (response.success) {
						if (response.response.result[0].TermsConditions == 1) {
							// this.openTermsConditionsDialog(response.message.termsaccepted);
						} else if (response.response.result[0].TermsConditions == 0) {
							this.openTermsConditionsDialog(response.response.result[0]);
						}
					} else if (!response.success) {
						this.router.navigate(['employer/jobs/list']);
					}
				},
				error => {
					// console.log(error);
					this.router.navigate(['employer/jobs/list']);
				}
			);
	}

	openTermsConditionsDialog(CompanyDetails) {
		const dialogConfig = new MatDialogConfig();

		dialogConfig.id = 'confirm-dialog';
		dialogConfig.panelClass = 'terms-conditions-dialog';
		dialogConfig.disableClose = true;
		dialogConfig.autoFocus = false;
		// dialogConfig.width = '80vw';
		dialogConfig.data = {
			termsaccepted: CompanyDetails.TermsConditions,
			termsandconditions: CompanyDetails.TermsConditions_file
		};

		let dialog = this.dialog.open(TermsConditionsDialogComponent, dialogConfig);

		dialog.afterClosed().subscribe(
			data => {
				if (data == 'yes') {
					this.termsAcceptanceUpdate();
					// console.log('accepted');
				} else if (data == 'no') {
					this.router.navigate(['employer/jobs/list']);
				}
			}
		);
	}

	termsAcceptanceUpdate() {
		this.busy = this._httpService.termsAcceptanceUpdate({ 'companyid': this.companyid, 'termsaccepted': 'true' })
			.subscribe(
				response => {
					if (response.success) {
						let snackBarRef = this.snackBar.open('You Have Accepted Terms & Conditions', 'Close', {
							duration: 5000,
						});

						snackBarRef.onAction().subscribe(() => {
							snackBarRef.dismiss();
							// console.log('The snack-bar action was triggered!');
						});
					} else if (!response.success) {
						// console.log(response);
					}
				},
				error => {
					// console.log(error);
				}
			);
	}

	// ====================

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
		// console.log(event);
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

			if (this.jobDetails.markup_in == 'percentage') {
				this.jobDetails.jobseeker_salary = (((1 - (Number(this.jobDetails.markup_rate) / 100)) * Number(this.jobDetails.charge_rate)).toFixed(1));
				this.jobDetails.markup_amount = ((Number(this.jobDetails.charge_rate) - (1 - (Number(this.jobDetails.markup_rate) / 100)) * Number(this.jobDetails.charge_rate)).toFixed(1));
			}

			if (this.jobDetails.markup_in == 'sgdollar') {
				this.jobDetails.jobseeker_salary = (Number(this.jobDetails.charge_rate) - Number(this.jobDetails.markup_rate)).toFixed(1);
				this.jobDetails.markup_amount = Number(this.jobDetails.markup_rate).toFixed(1);
			}
		}
	}

	setFocus(selector: string): void {
		this.ngZone.runOutsideAngular(() => {
			setTimeout(() => {
				this.renderer.selectRootElement('#' + selector).focus();
			}, 0);
		});
	}

	changeTab(tab) {
		this.tabGroup.selectedIndex = tab;
	}

	jobAddToEmployer(employerJobData: any, employerJobForm) {

		let manetoryFields = [
			['project_name', 'department', 'employment_type', 'job_name', 'description'],
			['specializations', 'otherjobspecialization', 'working_environment'],
			['pax_total', 'grace_period', 'over_time_rounding', 'jobperiodfrom', 'jobperiodto', 'starttime', 'endtime', 'work_days_type'],
			['breakname'],
			['postal_code', 'address', 'unit_no', 'region', 'location']
		];

		for (let tab = 0; tab < manetoryFields.length; tab++) {
			let breaks = false;
			if (tab == 3) {
				if (this.jobDetails.breaks.length > 0) {
					for (let i = 0; i < this.jobDetails.breaks.length; i++) {
						if (this.jobDetails.breaks[i].breakname == '' || this.jobDetails.breaks[i].starttime == '' || this.jobDetails.breaks[i].endtime == '') {
							this.changeTab(tab);
							breaks = true;
							break;
						}
					}
				}
			} else {
				for (let i = 0; i < manetoryFields[tab].length; i++) {
					// console.log(employerJobData[manetoryFields[tab][i]])
					if (typeof employerJobData[manetoryFields[tab][i]] != undefined) {
						if (employerJobData[manetoryFields[tab][i]] == '') {
							this.changeTab(tab);
							// this.setFocus(manetoryFields[tab][i]);
							// this.mySelect.focused = true;
							breaks = true;
							break;
						}
					}
				}
			}
			if (breaks) { break; }
		}

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

		const autooffer = { 'auto_offered': employerJobData.auto_offered == true ? 'true' : 'false' };
		employerJobData = Object.assign(employerJobData, autooffer);

		const autoofferaccept = { 'auto_accepted': employerJobData.auto_accepted == true ? 'true' : 'false' };
		employerJobData = Object.assign(employerJobData, autoofferaccept);

		if (employerJobData.specializations == 'Others') {
			const specialization = { 'specializations': employerJobData.otherjobspecialization };
			employerJobData = Object.assign(employerJobData, specialization);
		}

		// let jobstatus = { "jobstatus": "pending" };
		// employerJobData = Object.assign(employerJobData, jobstatus);

		let newBreaks: any[] = [];
		let oldBresks = this.jobDetails.breaks;
		if (oldBresks.length > 0) {
			for (let i = 0; i < oldBresks.length; i++) {
				newBreaks.push({
					break_name: oldBresks[i].breakname,
					from: this.datePipe.transform(oldBresks[i].starttime, 'HH:mm'),
					to: this.datePipe.transform(oldBresks[i].endtime, 'HH:mm'),
				});
			}
		}

		let Breaks = { 'break': newBreaks };
		employerJobData = Object.assign(employerJobData, Breaks);

		if (!employerJobForm.valid) { return false; }

		// console.log(employerJobData);
		this._httpService.addNewJob(employerJobData)
			.subscribe(
				response => {
					if (response.success) {
						employerJobForm.resetForm();
						// console.log("Job Added Successfully");
						let snackBarRef = this.snackBar.open('Job Added Successfully.', 'Close', {
							duration: 5000,
						});

						snackBarRef.onAction().subscribe(() => {
							snackBarRef.dismiss();
							// console.log('The snack-bar action was triggered!');
						});

						this.router.navigate(['employer/jobs/list']);
					} else if (!response.success) {
						// console.log(response);
					}
				},
				error => {
					// console.log(error);
				}
			);
	}

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
