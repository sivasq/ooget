import { Component, OnInit, Input, EventEmitter, HostListener, ViewChild, ElementRef, Output } from '@angular/core';
import { MatSnackBar, MatDatepickerInputEvent, MatTabHeaderPosition, MatRadioChange, MatTabChangeEvent } from '@angular/material';
import { ApiCallService } from '../../../services/api-call.service';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { DatePipe, Location } from '@angular/common';

import { OogetsidenavComponent } from '../../../oogetsidenav/oogetsidenav.component';
import { ConfigService } from '../../../services/config.service';
import { Subscription } from 'rxjs';
import { MultipleSubLocationFilter } from '../../../pipes/custompipes.pipe';

@Component({
	selector: 'app-add-profile',
	templateUrl: './add-profile.component.html',
	styleUrls: ['./add-profile.component.scss']
})
export class AddProfileComponent implements OnInit {

	public isPayNow: string = 'No';
	public notify_sub: string;
	public isPartTimeJob: boolean = false;

	public showfulltimespeccilization;
	public showparttimespeccilization;

	public imgBaseUrl;

	public bankHint;

	public alertofffrom;
	public alertoffto;

	public username;
	public email;
	public country;
	public mobileno;
	public address;
	public nricfinno;
	public age;
	public gender;

	public bankname;
	public bankcode;
	public branchcode;
	public accountno;
	public experiencein;
	public totalexperienceinyears;
	public preferredregion;
	public preferredlocation;
	public preferredspecialization;
	public workingenvironment;
	public employmenttype;
	public notificationalerttype;
	public alertswitchedoffdays;

	public profileImage: any = 'assets/img/avatars/profile-placeholder.png';
	public idProofFront: any = 'assets/img/avatars/id-front-placeholder.png';
	public idProofBack: any = 'assets/img/avatars/id-back-placeholder.png';

	public reqBankDetails: boolean;

	public pastExpDetails = {
		pastExp: [
			{ previouscompanyname: '', previouscompanyposition: '', previousjobresponsibility: '', previousjobfrom: null, previousjobto: null }
		]
	};

	emailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	@Input() selectedIndex: number | null;
	currentlyActiveIndexTab: number | null = 0;

	@ViewChild('imgFileInput') myProfileImageInputVariable: ElementRef;
	@ViewChild('idFrontFileInput') myIdProofFrontInputVariable: ElementRef;
	@ViewChild('idBackFileInput') myIdProofBackInputVariable: ElementRef;

	//busy Config
	busy: Subscription;

	// public Specializations: any = [];

	public FullTimeSpecializations: any = [
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
			"specialization": "Others/Category not available"
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

	public PartTimeSpecializations: any = [
		{
			"_id": "432424",
			"specialization": "Admin"
		},
		{
			"_id": "432424",
			"specialization": "Beautician  Wellness"
		},
		{
			"_id": "432424",
			"specialization": "Customer Service"
		},
		{
			"_id": "432424",
			"specialization": "Drivers/Delivery"
		},
		{
			"_id": "432424",
			"specialization": "Event"
		},
		{
			"_id": "432424",
			"specialization": "Food & Beverage"
		},
		{
			"_id": "432424",
			"specialization": "Packer/Mover"
		},
		{
			"_id": "432424",
			"specialization": "Retails"
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

	public BankDetails: any = [
		{
			"_id": "432424",
			"fullName": "The Hongkong & Shanghai Banking Corporation Ltd",
			"shortName": "HSBC",
			"bankCode": "7232",
			"hint": '<div>The account number consists of 9 digits. The ACH branch code is normally incorporated into the account. The first 3 digits is the ACH branch code and the subsequent 9 digits is the account number.</div><br/><div>E.g. If the account is 146225193001, the ACH branch code will be 146 and the account number 225193001.</div>'
		},
		{
			"_id": "432424",
			"fullName": "United Overseas Bank Ltd",
			"shortName": "UOB",
			"bankCode": "7375",
			"hint": '<div>The account number consists of 10 digits. Please use the first 3 digits of the account number and refer to Appendix A of <a style="color: #021def;" href="http://www.uobgroup.com.sg/pages/business/cashmgmt/achcode.html" target="_blank">http://www.uobgroup.com.sg/pages/business/cashmgmt/achcode.html</a> to retrieve the corresponding ACH branch code.</div><br/><div>E.g. If the account number is 9102031012, the corresponding ACH branch code will be 030 and the account number 9102031012</div>'
		},
		{
			"_id": "432424",
			"fullName": "DBS Bank Ltd",
			"shortName": "DBS",
			"bankCode": "7171",
			"hint": "<div>Usually the account number consists of 10 digits. Please use the first 3 digits of the account number as the ACH branch code.</div><br/><div>E.g. If the account number is 0290188891, the ACH branch code will be 029 and the account number 0290188891.</div>"
		},
		{
			"_id": "432424",
			"fullName": "POSB",
			"shortName": "POSB",
			"bankCode": "7171",
			"hint": "<div>The account number consists of 9 digits. All POSB accounts must route to their head office using ACH branch code 081.</div>"
		},
		{
			"_id": "432424",
			"fullName": "Oversea-Chinese Banking Corporation Ltd",
			"shortName": "OCBC",
			"bankCode": "7339",
			"hint": "<div>The account number consists of 7 or 9 digits. The ACH branch code is normally incorporated into the account. The first 3 digits is the ACH branch code and the subsequent 7 or 9 digits is the account number.</div><br/><div>E.g. If the account is 501101899001, the ACH branch code will be 501 and the account number 101899001.</div>"
		},
		{
			"_id": "432424",
			"fullName": "Standard Chartered Bank",
			"shortName": "SCB",
			"bankCode": "7144",
			"hint": "<div>The account number consists of 10 digits. The ACH branch code is normally derived from the first 2 digits of the account number and adding a zero in front.</div><br/><div>E.g. If the account number is 0123456789, the ACH branch code will be 001 and the account number 0123456789.</div>"
		},
		{
			"_id": "432424",
			"fullName": "Citibank",
			"shortName": "Citibank",
			"bankCode": "7214",
			"hint": "<div>The account number consists of 10 digits. The ACH branch code varies for corporate and personal accounts.</div><br/><div>E.g. If the branch name is ShentonWay-IB, this will be for corporate account. The ACH branch code will be 001.</div><br/><div>If the branch name is ShentonWay-CSG, this will be for personal account. The ACH branch code will be 011 and the account number 1012345670.</div>"
		}
	]

	constructor(private _httpService: ApiCallService, private urlconfig: ConfigService, public snackBar: MatSnackBar, private route: ActivatedRoute, private datePipe: DatePipe, private capitalize: MultipleSubLocationFilter, private location: Location) {

		this.imgBaseUrl = urlconfig.img_base_url;
		this.getProfileDetails();
	}

	// set currently active tab index
	public tabChanged(tabChangeEvent: MatTabChangeEvent): void {
		this.currentlyActiveIndexTab = tabChangeEvent.index;
	}

	// Profile Image Change Event
	logochange(event) {
		// console.log(event.target.files[0]);
		if (event.target.files && event.target.files[0]) {
			var reader = new FileReader();
			reader.readAsDataURL(event.target.files[0]); // read file as data url
			reader.onload = (event: any) => { // called once readAsDataURL is completed
				this.profileImage = event.target.result;
				// console.log(event.target.result);
			}
		}
	}

	// Id Front Image Change Event
	idfrontchange(event) {
		// console.log(event.target.files[0]);
		if (event.target.files && event.target.files[0]) {
			var reader = new FileReader();
			reader.readAsDataURL(event.target.files[0]); // read file as data url
			reader.onload = (event: any) => { // called once readAsDataURL is completed
				this.idProofFront = event.target.result;
				// console.log(event.target.result);
			}
		}
	}

	// Id Back Image Change Event
	idbackchange(event) {
		// console.log(event.target.files[0]);
		if (event.target.files && event.target.files[0]) {
			var reader = new FileReader();
			reader.readAsDataURL(event.target.files[0]); // read file as data url
			reader.onload = (event: any) => { // called once readAsDataURL is completed
				this.idProofBack = event.target.result;
				// console.log(event.target.result);
			}
		}
	}

	// Pay now change event
	payNowChange(event) {
		if (event.value == "Yes") {
			this.isPayNow = 'Yes';
		} else if (event.value == 'No') {
			this.isPayNow = 'No';
		}
	}

	// Notification Alert Type change Event
	notificationAlertTypeChange(event) {
		if (event.value == "anytime") {
			this.notify_sub = 'anytime';
		} else if (event.value == 'off') {
			this.notify_sub = 'off';
		}
	}

	// Notification Alert Off Range set
	notificationAlertSWOffChange(event) {
		let days = Number(event.value);
		let fromDate: Date = new Date();
		let toDate: Date = new Date();
		toDate.setDate(toDate.getDate() + days);
		// console.log(this.datePipe.transform(fromDate, 'M/d/yyyy'));
		// console.log(this.datePipe.transform(toDate, 'M/d/yyyy'));
		this.alertofffrom = this.datePipe.transform(fromDate, 'MM/dd/yyyy');
		this.alertoffto = this.datePipe.transform(toDate, 'MM/dd/yyyy');
	}

	addExp() {
		this.pastExpDetails.pastExp.push({ previouscompanyname: '', previouscompanyposition: '', previousjobresponsibility: '', previousjobfrom: null, previousjobto: null });
	}

	removeExp(index) {
		index = Number(index);
		// this.pastExpList.splice(index, 1);
		this.pastExpDetails.pastExp.splice(index, 1);
	}

	public trackByIndex(index: number, item) {
		return index;
	}

	isInArray(array, word) {
		// console.log(array.indexOf(word));
		// console.log(array.includes(word));
		// console.log(array.indexOf(word) > -1);
		// console.log(array.indexOf(word.toLowerCase()) > -1);
		return array.includes(word);
	}

	jobSeekerProfileUpdate(jobSeekerProfileData: any, jobSeekerProfileForm) {
		if (!this.isPartTimeJob) {
			jobSeekerProfileData = Object.assign(jobSeekerProfileData, { "previousexperince": this.pastExpDetails.pastExp });
		} else {
			jobSeekerProfileData = Object.assign(jobSeekerProfileData, { "previousexperince": [] });
			jobSeekerProfileData = Object.assign(jobSeekerProfileData, { "totalexperienceinyears": "" });
			jobSeekerProfileData = Object.assign(jobSeekerProfileData, { "experiencein": "" });
		}

		console.log(this.pastExpDetails.pastExp);

		let alertofffrom = Object.assign(jobSeekerProfileData, { "alertofffrom": this.alertofffrom });
		let alertoffto = Object.assign(jobSeekerProfileData, { "alertoffto": this.alertoffto });

		console.log(jobSeekerProfileData);
		this.busy = this._httpService.jobSeekerProfileUpdate(jobSeekerProfileData)
			.subscribe(
				response => {
					if (response.success) {
						let profileImage = this.myProfileImageInputVariable.nativeElement;
						let idProofFront = this.myIdProofFrontInputVariable.nativeElement;
						let idProofBack = this.myIdProofBackInputVariable.nativeElement;

						if (profileImage.files[0] || idProofFront.files[0] || idProofBack.files[0]) {
							this.uploadProfileDocs();
						} else {
							localStorage.setItem('ogUserName', jobSeekerProfileData.username);
							localStorage.setItem('ogUserEmail', jobSeekerProfileData.email);
							location.reload();
							let snackBarRef = this.snackBar.open('Profile Updated Successfully.', 'Close', {
								duration: 5000,
							});

							snackBarRef.onAction().subscribe(() => {
								snackBarRef.dismiss();
							});
						}
					} else if (!response.success) {
					}
				},
				error => {
					console.log(error);
				}
			);
	}

	uploadProfileDocs() {
		const profileImage = this.myProfileImageInputVariable.nativeElement;
		const idProofFront = this.myIdProofFrontInputVariable.nativeElement;
		const idProofBack = this.myIdProofBackInputVariable.nativeElement;

		const formData: FormData = new FormData();
		if (profileImage.files && profileImage.files[0]) {
			formData.append('jobseekerimage', profileImage.files[0]);
		}

		if (idProofFront.files && idProofFront.files[0]) {
			formData.append('jobseekeridprooffront', idProofFront.files[0]);
		}

		if (idProofBack.files && idProofBack.files[0]) {
			formData.append('jobseekeridproofback', idProofBack.files[0]);
		}

		if (profileImage.files[0] || idProofFront.files[0] || idProofBack.files[0]) {
			this.busy = this._httpService.uploadProfileDocs(formData)
				.subscribe(
					response => {
						if (response.success) {
							localStorage.setItem('ogUserLogo', response.jobseekerimage);
							location.reload();

							let snackBarRef = this.snackBar.open('Profile and Documents Updated Successfully.', 'Close', {
								duration: 5000,
							});
							snackBarRef.onAction().subscribe(() => {
								snackBarRef.dismiss();
								// console.log('The snack-bar action was triggered!');
							});
						}
					},
					error => {
						// console.log(error);
					}
				);
		}

	}

	getProfileDetails() {
		this.busy = this._httpService.getProfileDetails()
			.subscribe(
				response => {
					// console.log(response);
					if (response.success) {
						this.username = response.message.username ? response.message.username : '';
						this.email = response.message.email ? response.message.email : '';
						this.country = response.message.country ? response.message.country : '';
						this.mobileno = response.message.mobileno ? response.message.mobileno : '';
						this.address = response.message.address ? response.message.address : '';
						this.nricfinno = response.message.nricfinno ? response.message.nricfinno : '';
						this.age = response.message.age ? response.message.age : '';
						this.gender = response.message.gender ? response.message.gender : '';

						this.bankname = response.message.bankname ? response.message.bankname : '';
						this.accountno = response.message.accountno ? response.message.accountno : '';
						this.bankcode = response.message.bankcode ? response.message.bankcode : '';
						this.branchcode = response.message.branchcode ? response.message.branchcode : '';
						// this.bankChange(this.bankname);

						this.experiencein = response.message.experiencein ? response.message.experiencein : '';
						this.totalexperienceinyears = response.message.totalexperienceinyears ? response.message.totalexperienceinyears : '';

						this.preferredregion = response.message.preferredregion ? response.message.preferredregion : '';
						this.preferredlocation = response.message.preferredlocation ? response.message.preferredlocation : '';
						this.preferredspecialization = response.message.preferredspecialization ? response.message.preferredspecialization : '';
						this.workingenvironment = response.message.workingenvironment ? response.message.workingenvironment : '';
						this.employmenttype = response.message.employmenttype ? response.message.employmenttype : '';

						this.employmenttypeChange(this.employmenttype);

						this.notificationalerttype = response.message.notificationalerttype ? response.message.notificationalerttype : '';

						this.notify_sub = response.message.notificationalerttype ? response.message.notificationalerttype : '';

						this.alertswitchedoffdays = response.message.alertswitchedoffdays ? response.message.alertswitchedoffdays : '';

						this.alertofffrom = response.message.alertofffrom ? response.message.alertofffrom : '';

						this.alertoffto = response.message.alertoffto ? response.message.alertoffto : '';

						let newExp: any[] = [];
						let pastExp = response.message.previousexperince;
						if (pastExp.length > 0) {
							for (let i = 0; i < pastExp.length; i++) {
								newExp.push({
									previouscompanyname: pastExp[i].previouscompanyname, previouscompanyposition: pastExp[i].previouscompanyposition, previousjobresponsibility: pastExp[i].previousjobresponsibility, previousjobfrom: new Date(pastExp[i].previousjobfrom), previousjobto: new Date(pastExp[i].previousjobto)
								})
							}
							this.pastExpDetails.pastExp = newExp;
						}

						this.profileImage = response.message.jobseekerimage ? this.imgBaseUrl + '/' + response.message.jobseekerimage : 'assets/img/avatars/profile-placeholder.png';
						this.idProofFront = response.message.jobseekeridprooffront ? this.imgBaseUrl + '/' + response.message.jobseekeridprooffront : 'assets/img/avatars/id-front-placeholder.png';
						this.idProofBack = response.message.jobseekeridproofback ? this.imgBaseUrl + '/' + response.message.jobseekeridproofback : 'assets/img/avatars/id-back-placeholder.png';

					} else if (!response.success) {
						// console.log(response);
					}
				},
				error => {
					// console.log(error);
				}
			);
	}

	bankChange(event, modeofchange?) {
		if (modeofchange == 'customchange')
		{
			this.branchcode = "";
			this.accountno = "";
			this.bankcode = "";
		}			
		// console.log(event);
		if (event == undefined) {
			this.reqBankDetails = false;
		} else {
			this.reqBankDetails = true;
			let index = this.BankDetails.map(x => x.shortName).indexOf(event);
			// let index = this.BankDetails.findIndex(x => x.shortName === event);
			this.bankcode = this.BankDetails[index].bankCode;
			this.bankHint = this.BankDetails[index].hint;
		}			
	}

	mainlocationChange() {
		this.selectAllSubLocation();
	}

	employmenttypeChange(event) {
		console.log(event);
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

		this.selectAllSpecialization();
	}

	selectAllSubLocation() {
		let availableSubLocation = this.capitalize.transform(this.Locations, this.preferredregion);
		this.preferredlocation = availableSubLocation.map(x => x.sublocation);
		console.log(this.capitalize.transform(this.Locations, this.preferredregion));
	}

	unSelectAllSubLocation() {
		this.preferredlocation = [];
		// console.log(this.preferredlocation);
	}

	selectAllSpecialization() {
		let fulltimepreferredspecialization;
		let parttimepreferredspecialization;

		if (this.showfulltimespeccilization) {
			fulltimepreferredspecialization = this.FullTimeSpecializations.map(x => x.specialization);
		} else {
			fulltimepreferredspecialization = [];
		}

		if (this.showparttimespeccilization) {
			parttimepreferredspecialization = this.PartTimeSpecializations.map(x => x.specialization);
		} else {
			parttimepreferredspecialization = [];
		}
		console.log("fulltime : " + this.showfulltimespeccilization)
		console.log(fulltimepreferredspecialization);
		console.log("parttime : " + this.showparttimespeccilization)
		console.log(parttimepreferredspecialization);
		this.preferredspecialization = fulltimepreferredspecialization.concat(parttimepreferredspecialization);
		console.log(this.preferredspecialization);
	}

	unSelectAllSpecialization() {
		this.preferredspecialization = [];
		// console.log(this.preferredspecialization);
	}

	selectAllWorkEnvironment() {
		this.workingenvironment = this.WorkingEnvironments.map(x => x.Environment);
		// console.log(this.workingenvironment);
	}

	unSelectWorkEnvironment() {
		this.workingenvironment = [];
		// console.log(this.workingenvironment);
	}

	ngOnInit() {
		// this.preferredregion = this.Locations.map(x => x.mainlocation);
		// this.preferredlocation = this.Locations.map(x => x.sublocation);
	}

	omit_special_char(event) {
		// var k;
		// k = event.charCode;  // k = event.keyCode;  (Both can be used)
		// return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
	}
}