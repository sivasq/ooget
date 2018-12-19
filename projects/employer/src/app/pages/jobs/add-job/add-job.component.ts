import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDatepickerInputEvent, MatTabHeaderPosition, MatDialog, MatDialogConfig } from '@angular/material';
import { ApiCallService } from '../../../services/api-call.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { DatePipe } from '@angular/common';
import { TermsConditionsDialogComponent } from '../../../terms-conditions-dialog/terms-conditions-dialog.component';
import { ConfirmDialogComponent } from '../../../confirm-dialog/confirm-dialog.component';
import { Subscription, Observable } from 'rxjs';
import { AsyncSubscriber } from '../../../services/async.service';

@Component({
	selector: 'app-add-job',
	templateUrl: './add-job.component.html',
	styleUrls: ['./add-job.component.scss']
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
		addressblock: '',
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
	public companyDetails: any = [];

	public maxpax = _.range(50);
	public graceperiods = [0, 5, 10, 15];
	public overtimeroundings = [0, 5, 10, 15];

	//busy Config
	busy: Subscription;

	public Specializations: any = [
		{
			"_id": "432424",
			"specialization": "Actuarial Science/Statistics",
			"defaultpay": "12.00"
		},
		{
			"_id": "432424",
			"specialization": "Advertising/Media Plannning",
			"defaultpay": "11.00"
		},
		{
			"_id": "432424",
			"specialization": "Agriculture/Forestry/Fisheries",
			"defaultpay": "12.00"
		},
		{
			"_id": "432424",
			"specialization": "Architecture/Interior Design",
			"defaultpay": "11.00"
		},
		{
			"_id": "432424",
			"specialization": "Arts/Creative/Graphics Design",
			"defaultpay": "12.00"
		},
		{
			"_id": "432424",
			"specialization": "Aviation/Aircraft Maintenance",
			"defaultpay": "13.00"
		},
		{
			"_id": "432424",
			"specialization": "Banking/Financial Services",
			"defaultpay": "12.00"
		},
		{
			"_id": "432424",
			"specialization": "Biotechnology",
			"defaultpay": "11.00"
		},
		{
			"_id": "432424",
			"specialization": "Chemistry",
			"defaultpay": "12.00"
		},
		{
			"_id": "432424",
			"specialization": "Clerical/Administrative Support",
			"defaultpay": "12.00"
		},
		{
			"_id": "432424",
			"specialization": "Corporate Strategy/Top Management",
			"defaultpay": "12.00"
		},
		{
			"_id": "432424",
			"specialization": "Customer Service",
			"defaultpay": "12.00"
		},
		{
			"_id": "432424",
			"specialization": "Education",
			"defaultpay": "12.00"
		},
		{
			"_id": "432424",
			"specialization": "Engineering - Chemical",
			"defaultpay": "18.00"
		},
		{
			"_id": "432424",
			"specialization": "Engineering - Civil/Construction/Structural",
			"defaultpay": "17.00"
		},
		{
			"_id": "432424",
			"specialization": "Engineering - Electrical",
			"defaultpay": "12.00"
		},
		{
			"_id": "432424",
			"specialization": "Engineering - Electronics/Communication",
			"defaultpay": "14.00"
		},
		{
			"_id": "432424",
			"specialization": "Engineering - Environmental/Health/Safety",
			"defaultpay": "12.00"
		},
		{
			"_id": "432424",
			"specialization": "Engineering - Industrial",
			"defaultpay": "13.00"
		},
		{
			"_id": "432424",
			"specialization": "Engineering - Mechanical/Automotive",
			"defaultpay": "12.00"
		},
		{
			"_id": "432424",
			"specialization": "Engineering - Oil/Gas",
			"defaultpay": "15.00"
		},
		{
			"_id": "432424",
			"specialization": "Entertainment/Performing Arts",
			"defaultpay": "12.00"
		},
		{
			"_id": "432424",
			"specialization": "Finance - Audit/Taxation",
			"defaultpay": "10.00"
		},
		{
			"_id": "432424",
			"specialization": "Finance - Corporate Finance/Investment/Merchant Banking",
			"defaultpay": "12.00"
		},
		{
			"_id": "432424",
			"specialization": "Finance - General/Cost Accounting",
			"defaultpay": "10.00"
		},
		{
			"_id": "432424",
			"specialization": "Food Technology/Nutritionist",
			"defaultpay": "12.00"
		},
		{
			"_id": "432424",
			"specialization": "Food/Beverage/Restaurant Service",
			"defaultpay": "11.00"
		},
		{
			"_id": "432424",
			"specialization": "General Worker (Housekeeper, Driver, Dispatch, Messenger, etc)",
			"defaultpay": "12.00"
		},
		{
			"_id": "432424",
			"specialization": "Geology/Geophysics",
			"defaultpay": "11.00"
		},
		{
			"_id": "432424",
			"specialization": "Healthcare - Doctor/Diagnosis",
			"defaultpay": "11.00"
		},
		{
			"_id": "432424",
			"specialization": "Healthcare - Nurse/Medical Support & Assistant",
			"defaultpay": "12.00"
		},
		{
			"_id": "432424",
			"specialization": "Healthcare - Pharmacy",
			"defaultpay": "11.00"
		},
		{
			"_id": "432424",
			"specialization": "Hotel Managament/Tourism Services",
			"defaultpay": "11.00"
		},
		{
			"_id": "432424",
			"specialization": "Human Resouces",
			"defaultpay": "12.00"
		},
		{
			"_id": "432424",
			"specialization": "IT/Computer - Hardware",
			"defaultpay": "12.00"
		},
		{
			"_id": "432424",
			"specialization": "IT/Computer - Network/System/Database Admin",
			"defaultpay": "12.00"
		},
		{
			"_id": "432424",
			"specialization": "IT/Computer - Software",
			"defaultpay": "10.00"
		},
		{
			"_id": "432424",
			"specialization": "Journalist/Editor",
			"defaultpay": "12.00"
		},
		{
			"_id": "432424",
			"specialization": "Law/Legal Services",
			"defaultpay": "10.00"
		},
		{
			"_id": "432424",
			"specialization": "Logisitcs/Supply Chain",
			"defaultpay": "12.00"
		},
		{
			"_id": "432424",
			"specialization": "Maintenance/Repair (Facilities & Machinery)",
			"defaultpay": "10.00"
		},
		{
			"_id": "432424",
			"specialization": "Manufacturing/Productions Operations",
			"defaultpay": "12.00"
		},
		{
			"_id": "432424",
			"specialization": "Marketing/Business Development",
			"defaultpay": "10.00"
		},
		{
			"_id": "432424",
			"specialization": "Merchandising",
			"defaultpay": "12.00"
		},
		{
			"_id": "432424",
			"specialization": "Others/Category not available",
			"defaultpay": "10.00"
		},
		{
			"_id": "432424",
			"specialization": "Personal Care/Beauty/Finess Service",
			"defaultpay": "12.00"
		},
		{
			"_id": "432424",
			"specialization": "Process Design & Control/Instrumentation",
			"defaultpay": "10.00"
		},
		{
			"_id": "432424",
			"specialization": "Property/Real Estate",
			"defaultpay": "12.00"
		},
		{
			"_id": "432424",
			"specialization": "Public Relations/Communications",
			"defaultpay": "11.00"
		},
		{
			"_id": "432424",
			"specialization": "Pubulishing/Printing",
			"defaultpay": "12.00"
		},
		{
			"_id": "432424",
			"specialization": "Purchasing/Inventory/Material & Warehouse Managament",
			"defaultpay": "13.00"
		},
		{
			"_id": "432424",
			"specialization": "Quality Control/Assurance",
			"defaultpay": "12.00"
		},
		{
			"_id": "432424",
			"specialization": "Quantity Surveying",
			"defaultpay": "12.00"
		},
		{
			"_id": "432424",
			"specialization": "Sales - Corporate",
			"defaultpay": "12.00"
		},
		{
			"_id": "432424",
			"specialization": "Sales - Engineering/Technical/IT",
			"defaultpay": "14.00"
		},
		{
			"_id": "432424",
			"specialization": "Sales - Finance Services (Insurnace, Unit Trust, etc)",
			"defaultpay": "12.00"
		},
		{
			"_id": "432424",
			"specialization": "Sales - Retail/General",
			"defaultpay": "10.00"
		},
		{
			"_id": "432424",
			"specialization": "Sales - Telesales/Telemarketing",
			"defaultpay": "12.00"
		},
		{
			"_id": "432424",
			"specialization": "Science & Technology/Laboratory",
			"defaultpay": "11.00"
		},
		{
			"_id": "432424",
			"specialization": "Secretarial/Executive & Personal Assistant",
			"defaultpay": "12.00"
		},
		{
			"_id": "432424",
			"specialization": "Security/Armed Forces/Protective Services",
			"defaultpay": "12.00"
		},
		{
			"_id": "432424",
			"specialization": "Social & Counselling Service",
			"defaultpay": "12.00"
		},
		{
			"_id": "432424",
			"specialization": "Technical & Helpdesk Support",
			"defaultpay": "12.00"
		},
		{
			"_id": "432424",
			"specialization": "Training & Development",
			"defaultpay": "12.00"
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

	constructor(private _httpService: ApiCallService, public dialog: MatDialog, public snackBar: MatSnackBar, private route: ActivatedRoute, public router: Router, private datePipe: DatePipe, private asyncSubscriber: AsyncSubscriber) {

		this.appearance$ = asyncSubscriber.getAppearance.pipe();

		this.companyid = localStorage.getItem('ogCompanyObjID');

		// this.openTermsConditionsDialog('fileName');
		this.getTermsAcceptanceStatus({ 'companyid': this.companyid })
	}
	//==========================
	getTermsAcceptanceStatus(employerData) {
		this.busy = this._httpService.getTermsAcceptanceStatus(employerData)
			.subscribe(
				response => {
					console.log(response);
					if (response.success) {
						if (response.message.termsaccepted == 'true') {
							// this.openTermsConditionsDialog(response.message.termsaccepted);
						} else if (response.message.termsaccepted == 'false') {
							this.openTermsConditionsDialog(response.message);
						}
					} else if (!response.success) {
						this.router.navigate(['employer/jobs/list']);
					}
				},
				error => {
					console.log(error);
					this.router.navigate(['employer/jobs/list']);
				}
			);
	}

	openTermsConditionsDialog(message) {
		const dialogConfig = new MatDialogConfig();

		dialogConfig.id = 'confirm-dialog';
		dialogConfig.panelClass = 'terms-conditions-dialog';
		dialogConfig.disableClose = true;
		dialogConfig.autoFocus = false;
		// dialogConfig.width = '80vw';
		dialogConfig.data = {
			termsaccepted: message.termsaccepted,
			termsandconditions: message.termsandconditions
		};

		let dialog = this.dialog.open(TermsConditionsDialogComponent, dialogConfig);

		dialog.afterClosed().subscribe(
			data => {
				if (data == 'yes') {
					this.termsAcceptanceUpdate();
					console.log('accepted');
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

	//====================

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

		let autooffer = { "autooffer": employerJobData.autooffer == true ? "true" : "false" };
		employerJobData = Object.assign(employerJobData, autooffer);

		let autoofferaccept = { "autoofferaccept": employerJobData.autoofferaccept == true ? "true" : "false" };
		employerJobData = Object.assign(employerJobData, autoofferaccept);

		let jobaddedby = { "jobaddedby": "ooget-team" };
		employerJobData = Object.assign(employerJobData, jobaddedby);

		let jobstatus = { "jobstatus": "pending" };
		employerJobData = Object.assign(employerJobData, jobstatus);

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
		// this._httpService.jobAddToEmployer(employerJobData)
		// 	.subscribe(
		// 		response => {
		// 			if (response.success) {
		// 				employerJobForm.resetForm();
		// 				console.log("Job Added Successfully");
		// 				let snackBarRef = this.snackBar.open('Job Added Successfully.', 'Close', {
		// 					duration: 5000,
		// 				});

		// 				snackBarRef.onAction().subscribe(() => {
		// 					snackBarRef.dismiss();
		// 					console.log('The snack-bar action was triggered!');
		// 				});
		// 			} else if (!response.success) {
		// 				console.log(response);
		// 			}
		// 		},
		// 		error => {
		// 			console.log(error);
		// 		}
		// 	);
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

	ngOnInit() { }
}
