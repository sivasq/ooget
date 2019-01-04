import { Component, OnInit, EventEmitter, HostListener } from '@angular/core';
import { MatSnackBar, MatDatepickerInputEvent } from '@angular/material';
import { ApiCallService } from '../../../services/api-call.service';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { DatePipe } from '@angular/common';
import { Subscription, Observable } from 'rxjs';
import { AsyncSubscriber } from '../../../services/async.service';

@Component({
	selector: 'app-edit-job',
	templateUrl: './edit-job.component.html',
	styleUrls: ['./edit-job.component.scss']
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

	//Workday config
	// public workdaystype;
	// public sunday: boolean = false;
	// public monday: boolean = true;
	// public tuesday: boolean = true;
	// public wednesday: boolean = true;
	// public thursday: boolean = true;
	// public friday: boolean = true;
	// public saturday: boolean = false;

	// public starttime;
	// public endtime;

	public workMinEndTime;
	public breakMinStartTime;
	public breakMaxEndTime;

	// public otherspecialization: boolean;

	// public autooffer: boolean = true;
	// public autoofferaccept: boolean = true;

	// public locationmain: string;

	public companyid: string;

	public jobperiodfrom: any;
	public jobperiodto: any;

	public chargerate: string;
	public markuprate: string;
	public markupratetype: string;
	public salary: string;
	public markuprateincurrency: string;

	public isPartTimeJob: boolean;
	// public breaks: any[] = [];
	public companyDetails: any = [];

	public maxpax = _.range(50);
	public graceperiods = [0, 5, 10, 15];
	public overtimeroundings = [0, 5, 10, 15];

	// public jobDetails: any = [];

	//busy Config
	busy: Subscription;

	public Specializations: any = [
		{
			"_id": "432424",
			"specialization": "Actuarial Science/Statistics"
		},
		{
			"_id": "432424",
			"specialization": "Advertising/Media Plannning"
		},
		{
			"_id": "432424",
			"specialization": "Agriculture/Forestry/Fisheries"
		},
		{
			"_id": "432424",
			"specialization": "Architecture/Interior Design"
		},
		{
			"_id": "432424",
			"specialization": "Arts/Creative/Graphics Design"
		},
		{
			"_id": "432424",
			"specialization": "Aviation/Aircraft Maintenance"
		},
		{
			"_id": "432424",
			"specialization": "Banking/Financial Services"
		},
		{
			"_id": "432424",
			"specialization": "Biotechnology"
		},
		{
			"_id": "432424",
			"specialization": "Chemistry"
		},
		{
			"_id": "432424",
			"specialization": "Clerical/Administrative Support"
		},
		{
			"_id": "432424",
			"specialization": "Corporate Strategy/Top Management"
		},
		{
			"_id": "432424",
			"specialization": "Customer Service"
		},
		{
			"_id": "432424",
			"specialization": "Education"
		},
		{
			"_id": "432424",
			"specialization": "Engineering - Chemical"
		},
		{
			"_id": "432424",
			"specialization": "Engineering - Civil/Construction/Structural"
		},
		{
			"_id": "432424",
			"specialization": "Engineering - Electrical"
		},
		{
			"_id": "432424",
			"specialization": "Engineering - Electronics/Communication"
		},
		{
			"_id": "432424",
			"specialization": "Engineering - Environmental/Health/Safety"
		},
		{
			"_id": "432424",
			"specialization": "Engineering - Industrial"
		},
		{
			"_id": "432424",
			"specialization": "Engineering - Mechanical/Automotive"
		},
		{
			"_id": "432424",
			"specialization": "Engineering - Oil/Gas"
		},
		{
			"_id": "432424",
			"specialization": "Entertainment/Performing Arts"
		},
		{
			"_id": "432424",
			"specialization": "Finance - Audit/Taxation"
		},
		{
			"_id": "432424",
			"specialization": "Finance - Corporate Finance/Investment/Merchant Banking"
		},
		{
			"_id": "432424",
			"specialization": "Finance - General/Cost Accounting"
		},
		{
			"_id": "432424",
			"specialization": "Food Technology/Nutritionist"
		},
		{
			"_id": "432424",
			"specialization": "Food/Beverage/Restaurant Service"
		},
		{
			"_id": "432424",
			"specialization": "General Worker (Housekeeper, Driver, Dispatch, Messenger, etc)"
		},
		{
			"_id": "432424",
			"specialization": "Geology/Geophysics"
		},
		{
			"_id": "432424",
			"specialization": "Healthcare - Doctor/Diagnosis"
		},
		{
			"_id": "432424",
			"specialization": "Healthcare - Nurse/Medical Support & Assistant"
		},
		{
			"_id": "432424",
			"specialization": "Healthcare - Pharmacy"
		},
		{
			"_id": "432424",
			"specialization": "Hotel Managament/Tourism Services"
		},
		{
			"_id": "432424",
			"specialization": "Human Resouces"
		},
		{
			"_id": "432424",
			"specialization": "IT/Computer - Hardware"
		},
		{
			"_id": "432424",
			"specialization": "IT/Computer - Network/System/Database Admin"
		},
		{
			"_id": "432424",
			"specialization": "IT/Computer - Software"
		},
		{
			"_id": "432424",
			"specialization": "Journalist/Editor"
		},
		{
			"_id": "432424",
			"specialization": "Law/Legal Services"
		},
		{
			"_id": "432424",
			"specialization": "Logisitcs/Supply Chain"
		},
		{
			"_id": "432424",
			"specialization": "Maintenance/Repair (Facilities & Machinery)"
		},
		{
			"_id": "432424",
			"specialization": "Manufacturing/Productions Operations"
		},
		{
			"_id": "432424",
			"specialization": "Marketing/Business Development"
		},
		{
			"_id": "432424",
			"specialization": "Merchandising"
		},
		{
			"_id": "432424",
			"specialization": "Personal Care/Beauty/Finess Service"
		},
		{
			"_id": "432424",
			"specialization": "Process Design & Control/Instrumentation"
		},
		{
			"_id": "432424",
			"specialization": "Property/Real Estate"
		},
		{
			"_id": "432424",
			"specialization": "Public Relations/Communications"
		},
		{
			"_id": "432424",
			"specialization": "Pubulishing/Printing"
		},
		{
			"_id": "432424",
			"specialization": "Purchasing/Inventory/Material & Warehouse Managament"
		},
		{
			"_id": "432424",
			"specialization": "Quality Control/Assurance"
		},
		{
			"_id": "432424",
			"specialization": "Quantity Surveying"
		},
		{
			"_id": "432424",
			"specialization": "Sales - Corporate"
		},
		{
			"_id": "432424",
			"specialization": "Sales - Engineering/Technical/IT"
		},
		{
			"_id": "432424",
			"specialization": "Sales - Finance Services (Insurnace, Unit Trust, etc)"
		},
		{
			"_id": "432424",
			"specialization": "Sales - Retail/General"
		},
		{
			"_id": "432424",
			"specialization": "Sales - Telesales/Telemarketing"
		},
		{
			"_id": "432424",
			"specialization": "Science & Technology/Laboratory"
		},
		{
			"_id": "432424",
			"specialization": "Secretarial/Executive & Personal Assistant"
		},
		{
			"_id": "432424",
			"specialization": "Security/Armed Forces/Protective Services"
		},
		{
			"_id": "432424",
			"specialization": "Social & Counselling Service"
		},
		{
			"_id": "432424",
			"specialization": "Technical & Helpdesk Support"
		},
		{
			"_id": "432424",
			"specialization": "Training & Development"
		}
	]

	public Locations: any = [
		{
			"_id": "432424",
			"mainlocation": "North",
			"sublocation": "Central Water Catchment"
		},
		{
			"_id": "432424",
			"mainlocation": "North",
			"sublocation": "Lim Chu Kang"
		},
		{
			"_id": "432424",
			"mainlocation": "North",
			"sublocation": "Mandai"
		},
		{
			"_id": "432424",
			"mainlocation": "North",
			"sublocation": "Sembawang"
		},
		{
			"_id": "432424",
			"mainlocation": "North",
			"sublocation": "Simpang"
		},
		{
			"_id": "432424",
			"mainlocation": "North",
			"sublocation": "Sungei Kadut"
		},
		{
			"_id": "432424",
			"mainlocation": "North",
			"sublocation": "Woodlands"
		},
		{
			"_id": "432424",
			"mainlocation": "North",
			"sublocation": "Yishun"
		},

		{
			"_id": "432424",
			"mainlocation": "North East",
			"sublocation": "Ang Mo Kio"
		},
		{
			"_id": "432424",
			"mainlocation": "North East",
			"sublocation": "Hougang"
		},
		{
			"_id": "432424",
			"mainlocation": "North East",
			"sublocation": "North Eastern Islands"
		},
		{
			"_id": "432424",
			"mainlocation": "North East",
			"sublocation": "Punggol"
		},
		{
			"_id": "432424",
			"mainlocation": "North East",
			"sublocation": "Seletar"
		},
		{
			"_id": "432424",
			"mainlocation": "North East",
			"sublocation": "Sengkang"
		},
		{
			"_id": "432424",
			"mainlocation": "North East",
			"sublocation": "Serangoon"
		},

		{
			"_id": "432424",
			"mainlocation": "West",
			"sublocation": "Boon Lay"
		},
		{
			"_id": "432424",
			"mainlocation": "West",
			"sublocation": "Bukit Batok"
		},
		{
			"_id": "432424",
			"mainlocation": "West",
			"sublocation": "Bukit Panjang"
		},
		{
			"_id": "432424",
			"mainlocation": "West",
			"sublocation": "Choa Chu Kang"
		},
		{
			"_id": "432424",
			"mainlocation": "West",
			"sublocation": "Clementi"
		},
		{
			"_id": "432424",
			"mainlocation": "West",
			"sublocation": "Jurong East"
		},
		{
			"_id": "432424",
			"mainlocation": "West",
			"sublocation": "Jurong West"
		},
		{
			"_id": "432424",
			"mainlocation": "West",
			"sublocation": "Pioneer"
		},
		{
			"_id": "432424",
			"mainlocation": "West",
			"sublocation": "Tengah"
		},
		{
			"_id": "432424",
			"mainlocation": "West",
			"sublocation": "Tuas"
		},
		{
			"_id": "432424",
			"mainlocation": "West",
			"sublocation": "Western Islands"
		},
		{
			"_id": "432424",
			"mainlocation": "West",
			"sublocation": "Western Water"
		},
		{
			"_id": "432424",
			"mainlocation": "West",
			"sublocation": "Catchment"
		},

		{
			"_id": "432424",
			"mainlocation": "East",
			"sublocation": "Bedok"
		},
		{
			"_id": "432424",
			"mainlocation": "East",
			"sublocation": "Changi"
		},
		{
			"_id": "432424",
			"mainlocation": "East",
			"sublocation": "Changi Bay"
		},
		{
			"_id": "432424",
			"mainlocation": "East",
			"sublocation": "Pasir Ris"
		},
		{
			"_id": "432424",
			"mainlocation": "East",
			"sublocation": "Paya Lebar"
		},
		{
			"_id": "432424",
			"mainlocation": "East",
			"sublocation": "Tampines"
		},

		{
			"_id": "432424",
			"mainlocation": "Central",
			"sublocation": "Bishan"
		},
		{
			"_id": "432424",
			"mainlocation": "Central",
			"sublocation": "Bukit Merah"
		},
		{
			"_id": "432424",
			"mainlocation": "Central",
			"sublocation": "Bukit Timah"
		},
		{
			"_id": "432424",
			"mainlocation": "Central",
			"sublocation": "Downtown Core"
		},
		{
			"_id": "432424",
			"mainlocation": "Central",
			"sublocation": "Geylang"
		},
		{
			"_id": "432424",
			"mainlocation": "Central",
			"sublocation": "Kallang"
		},
		{
			"_id": "432424",
			"mainlocation": "Central",
			"sublocation": "Marina East"
		},
		{
			"_id": "432424",
			"mainlocation": "Central",
			"sublocation": "Marina South"
		},
		{
			"_id": "432424",
			"mainlocation": "Central",
			"sublocation": "Marine Parade"
		},
		{
			"_id": "432424",
			"mainlocation": "Central",
			"sublocation": "Museum"
		},
		{
			"_id": "432424",
			"mainlocation": "Central",
			"sublocation": "Newton"
		},
		{
			"_id": "432424",
			"mainlocation": "Central",
			"sublocation": "Novena"
		},
		{
			"_id": "432424",
			"mainlocation": "Central",
			"sublocation": "Orchard"
		},
		{
			"_id": "432424",
			"mainlocation": "Central",
			"sublocation": "Outram"
		},
		{
			"_id": "432424",
			"mainlocation": "Central",
			"sublocation": "Queenstown"
		},
		{
			"_id": "432424",
			"mainlocation": "Central",
			"sublocation": "River Valley"
		},
		{
			"_id": "432424",
			"mainlocation": "Central",
			"sublocation": "Rochor"
		},
		{
			"_id": "432424",
			"mainlocation": "Central",
			"sublocation": "Singapore River"
		},
		{
			"_id": "432424",
			"mainlocation": "Central",
			"sublocation": "Southern Islands"
		},
		{
			"_id": "432424",
			"mainlocation": "Central",
			"sublocation": "Straits View"
		},
		{
			"_id": "432424",
			"mainlocation": "Central",
			"sublocation": "Tanglin"
		},
		{
			"_id": "432424",
			"mainlocation": "Central",
			"sublocation": "Toa Payoh"
		}
	]

	public jobPriorityLists: any = [
		{
			"_id": "432424",
			"PriorityType": "normal"
		},
		{
			"_id": "432424",
			"PriorityType": "special"
		}
	]

	public WorkingEnvironments: any = [
		{
			"_id": "432424",
			"Environment": "Office"
		},
		{
			"_id": "432424",
			"Environment": "Factory"
		},
		{
			"_id": "432424",
			"Environment": "Restaurant"
		},
		{
			"_id": "432424",
			"Environment": "Hotel"
		},
		{
			"_id": "432424",
			"Environment": "Warehouse"
		},
		{
			"_id": "432424",
			"Environment": "Outdoor"
		},
		{
			"_id": "432424",
			"Environment": "Supermarket"
		},
		{
			"_id": "432424",
			"Environment": "Retail"
		},
		{
			"_id": "432424",
			"Environment": "Aircon"
		},
		{
			"_id": "432424",
			"Environment": "Non Aircon"
		}
	]

	public EmploymentTypes: any = [
		{
			"_id": "432424",
			"EmploymentType": "Part Time"
		},
		{
			"_id": "432424",
			"EmploymentType": "Full Time"
		}
	]

	constructor(private _httpService: ApiCallService, public snackBar: MatSnackBar, private route: ActivatedRoute, private datePipe: DatePipe, private asyncSubscriber: AsyncSubscriber) {

		this.appearance$ = asyncSubscriber.getAppearance.pipe();

		this.companyid = this.route.snapshot.params['emp_id'];
		// this.otherspecialization = false;

		let jobId = {
			jobid: this.route.snapshot.params['job_id'],
			companyid: this.route.snapshot.params['emp_id'],
		}
		this.getJobDetails(jobId);

		// this.getEmployerDetails({ companyid: this.companyid });
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
		} else {
			this.isPartTimeJob = true;
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
		let companyid = { "companyid": this.companyid };
		employerJobData = Object.assign(employerJobData, companyid);

		let jobId = { "jobid": this.route.snapshot.params['job_id'] };
		employerJobData = Object.assign(employerJobData, jobId);

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

		let autooffer = { "autooffer": employerJobData.autooffer == true ? "true" : "false" };
		employerJobData = Object.assign(employerJobData, autooffer);

		let autoofferaccept = { "autoofferaccept": employerJobData.autoofferaccept == true ? "true" : "false" };
		employerJobData = Object.assign(employerJobData, autoofferaccept);

		let jobaddedby = { "jobaddedby": "ooget-team" };
		employerJobData = Object.assign(employerJobData, jobaddedby);

		let jobstatus = { "jobstatus": "live" };
		employerJobData = Object.assign(employerJobData, jobstatus);

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
