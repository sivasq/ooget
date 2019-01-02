import { Component, OnInit, Input, ViewChild, ViewChildren, HostListener, ElementRef, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, AbstractControl, ValidatorFn, ValidationErrors, FormGroupDirective } from '@angular/forms';
import { ApiCallService } from '../../../services/api-call.service';
import { MatTabChangeEvent, MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';
import { ConfigService } from '../../../services/config.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { MultipleSubLocationFilter } from '../../../pipes/custompipes.pipe';

@Component({
	selector: 'app-add-profile-new',
	templateUrl: './add-profile-new.component.html',
	styleUrls: ['./add-profile-new.component.scss'],
	// encapsulation: ViewEncapsulation.None,
})
export class AddProfileNewComponent implements OnInit {

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

	public Races: any = [
		{
			"name": "Indian",
			"value": "indian"
		},
		{
			"name": "Chinese",
			"value": "chinese"
		},
		{
			"name": "Malay",
			"value": "malay"
		}
	];

	public Nationalitys: any = [
		{
			"name": "Singaporean",
			"value": "singaporean"
		},
		{
			"name": "Permanent",
			"value": "permanent"
		},
	];

	days: any[] = [];
	months: any[] = [];
	years: any[] = [];
	maxDays = 31;
	invalidDobErrorMsg: string = '';

	monthLongValues: any[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

	public today = new Date();
	busy: Subscription; //busy Config
	public oldhide = true;
	public hide = true;
	public rehide = true;
	public passwordPatternError;

	@Input() selectedIndex: number | null;
	currentlyActiveIndexTab: number | null = 0;

	public myProfile: any = {
		username: '',
		// nameinidcard:'',
		email: '',
		country: '',
		race: '',
		residencytype: '',
		mobileno: '',
		address: '',
		nricfinno: '',
		dob_day: '',
		dob_month: '',
		dob_year: '',
		dob: '',
		age: '',
		gender: '',

		ispaynowreg: '',
		bankname: '',
		bankcode: '',
		branchcode: '',
		accountno: '',

		employmenttype: '',
		preferredregion: '',
		preferredlocation: '',
		preferredspecialization: '',
		workingenvironment: '',

		notificationalerttype: '',
		alertswitchedoffdays: '',
		alertofffrom: '',
		alertoffto: '',

		experiencein: '',
		totalexperienceinyears: '',
		previousexperince: [
			{
				previouscompanyname: '',
				previouscompanyposition: '',
				previousjobresponsibility: '',
				previousjobfrom: '',
				previousjobto: ''
			}
		],
	}

	public profileImage: any = 'assets/img/avatars/profile-placeholder.png';
	public idProofFront: any = 'assets/img/avatars/id-front-placeholder.png';
	public idProofBack: any = 'assets/img/avatars/id-back-placeholder.png';

	@ViewChild('imgFileInput') myProfileImageInputVariable: ElementRef;
	@ViewChild('idFrontFileInput') myIdProofFrontInputVariable: ElementRef;
	@ViewChild('idBackFileInput') myIdProofBackInputVariable: ElementRef;

	public reqBankDetails: boolean;
	public bankHint;
	public imgBaseUrl;
	public isJobSeekerProfileFormValid: boolean = true;
	public isNricFinNoReadonly: boolean;
	public isIdProofEditable: boolean;
	public isActive: boolean;
	public passwordErrorMsg;

	public isPartTimeJob: boolean = false;
	public showfulltimespeccilization: boolean;
	public showparttimespeccilization: boolean;

	jobSeekerProfileForm: FormGroup;
	passwordUpdateForm: FormGroup;
	@ViewChild(FormGroupDirective) resetPasswordUpdateForm;

	emailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	agePattern: RegExp = /^[0-9]{1,}$/;
	mobileNoPattern: RegExp = /^[0-9]{1,}$/;
	nricFinNoPattern: RegExp = /^[F,T,S,G,f,t,s,g]{1}[0-9]{7}[A-Za-z]{1}$/;

	constructor(private fb: FormBuilder, private _httpService: ApiCallService, private urlconfig: ConfigService, public snackBar: MatSnackBar, private route: ActivatedRoute, private datePipe: DatePipe, private toUppercase: UpperCasePipe, private multiplesublocationfilter: MultipleSubLocationFilter) {
		this.imgBaseUrl = urlconfig.img_base_url;
		this.buildJobSeekerProfileForm();
		this.buildPasswordUpdateForm();

		this.generateDays();
		this.generateMonths();
		this.generateYears();

		this.getProfileDetails();
	}

	buildPasswordUpdateForm(): void {
		this.passwordUpdateForm = this.fb.group({
			oldpassword: ['', Validators.compose([Validators.required])],
			password: ['', Validators.compose([Validators.required, Validators.minLength(8)]), this.isPatternMatch.bind(this)],
			verify: ['', [Validators.required]],
		})
	}

	buildJobSeekerProfileForm(): void {
		this.jobSeekerProfileForm = this.fb.group({
			// Profile Details
			username: ['', Validators.compose([Validators.required])],
			// nameinidcard: ['', Validators.compose([Validators.required])],
			email: ['', Validators.compose([Validators.required, Validators.pattern(this.emailPattern)]), this.isEmailUnique.bind(this)],
			country: ['Singapore', Validators.compose([Validators.required])],
			race: ['', Validators.compose([Validators.required])],
			residencytype: ['', Validators.compose([Validators.required])],
			mobileno: ['', Validators.compose([Validators.required, Validators.pattern(this.mobileNoPattern)]), this.isMobileUnique.bind(this)],
			address: ['', Validators.compose([Validators.required])],
			nricfinno: ['', Validators.compose([Validators.pattern(this.nricFinNoPattern)]), this.isNricFinUnique.bind(this)],
			// nricfinno: ['', Validators.compose([Validators.required, Validators.pattern(this.nricFinNoPattern)]), this.isNricFinUnique.bind(this)],
			age: ['', Validators.compose([Validators.pattern(this.agePattern)])],
			dob_data: this.fb.group({
				dob_day: [''],
				dob_month: [''],
				dob_year: [''],
			}),
			dob: ['', Validators.compose([Validators.required])],
			// dob: ['', Validators.compose([Validators.required])],
			gender: ['Male', Validators.compose([Validators.required])],
			// Bank Details
			ispaynowreg: ['No'],
			bankname: [''],
			bankcode: [''],
			branchcode: [''],
			accountno: [''],
			// Job Preference
			employmenttype: [''],
			preferredregion: [''],
			preferredlocation: [''],
			preferredspecialization: [''],
			workingenvironment: [''],
			// Notification Alerts Manage
			notificationalerttype: [''],
			alertswitchedoffdays: [''],
			alertofffrom: [''],
			alertoffto: [''],
			// Past Exp
			experiencein: [''],
			totalexperienceinyears: [''],
			previousexperince: this.fb.array([this.createExp()])
		})
	}

	createExp(): FormGroup {
		return this.fb.group({
			previouscompanyname: '',
			previouscompanyposition: '',
			previousjobresponsibility: '',
			previousjobfrom: '',
			previousjobto: ''
		});
	}

	addExp(): void {
		// == Method 1
		// const control = this.jobSeekerProfileForm.get('previousexperince') as FormArray;
		// const control = <FormArray>this.jobSeekerProfileForm.controls['previousexperince'];
		// control.push(this.createExp());

		// == Method 2
		(<FormArray>this.jobSeekerProfileForm.get('previousexperince')).push(this.createExp());

		// Add Validation For current row
		this.pastExpChangeAddInit(this.jobSeekerProfileForm.get(`previousexperince.length`));
		// this.pastExpChangeAddInit(this.jobSeekerProfileForm.controls['previousexperince']['controls'].length);

		// this.jobSeekerProfileForm.get(`previousexperince.${0}.settings`)
	}

	removeExp(index: number) {
		// control refers to your formarray
		const control = this.jobSeekerProfileForm.get('previousexperince') as FormArray;
		// const control = <FormArray>this.jobSeekerProfileForm.controls['previousexperince'];
		// remove the chosen row
		control.removeAt(index);
	}

	// Check Password Pattern Match
	isPatternMatch(control: FormControl) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {

				let regAll = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%\^&*)(+=._-])/;
				if (!regAll.test(control.value)) {
					this.passwordPatternError = "at least one number, one lowercase and one uppercase letter, one special charcter";
					resolve({ 'isPatternMatch': true });
				}

				let regNumber = /[0-9]/;
				if (!regNumber.test(control.value)) {
					this.passwordPatternError = "password must contain at least one number (0-9)";
					resolve({ 'isPatternMatch': true });
				}

				let regSmallAlp = /[a-z]/;
				if (!regSmallAlp.test(control.value)) {
					this.passwordPatternError = "password must contain at least one lowercase letter(a - z)";
					resolve({ 'isPatternMatch': true });
				}

				let regCapsAlp = /[A-Z]/;
				if (!regCapsAlp.test(control.value)) {
					this.passwordPatternError = "password must contain at least one uppercase letter (A-Z)";
					resolve({ 'isPatternMatch': true });
				}

				let regSpecChar = /[!@#$%\^&*)(+=._-]/;
				if (!regSpecChar.test(control.value)) {
					this.passwordPatternError = "password must contain at least one Special character (!@#$%\^&*)(+=._-)";
					resolve({ 'isPatternMatch': true });
				}

				var regSpace = /\s/;
				if (regSpace.test(control.value)) {
					this.passwordPatternError = "space not allowed";
					resolve({ 'isPatternMatch': true });
				}
				resolve(null);
			}, 5);
		});
	}

	// Check Email Unique
	isEmailUnique(control: FormControl) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (this.myProfile.email != control.value) {
					this._httpService.checkEmail({ 'email': control.value }).subscribe((response) => {
						if (response.success) {
							resolve(null);
						} else {
							resolve({ 'isEmailUnique': true });
						}
					}, () => {
						resolve({ 'isEmailUnique': false });
					});
				} else {
					resolve(null);
				}
			}, 50);
		});
	}

	// Check Mobile Unique
	isMobileUnique(control: FormControl) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (this.myProfile.mobileno != control.value) {
					this._httpService.checkMobile({ 'mobileno': control.value }).subscribe((response) => {
						if (response.success) {
							resolve(null);
						} else {
							resolve({ 'isMobileUnique': true });
						}
					}, () => {
						resolve({ 'isMobileUnique': false });
					});
				} else {
					resolve(null);
				}
			}, 50);
		});
	}

	// Check NRIC FIN Unique
	isNricFinUnique(control: FormControl) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (this.myProfile.nricfinno != this.toUppercase.transform(control.value)) {
					this._httpService.checkNricFin({ 'nricfinno': this.toUppercase.transform(control.value) }).subscribe((response) => {
						if (response.success) {
							resolve(null);
						} else {
							resolve({ 'isNricFinUnique': true });
						}
					}, () => {
						resolve({ 'isNricFinUnique': false });
					});
				} else {
					resolve(null);
				}
			}, 50);
		});
	}

	// Job Period Min Date Validator
	dateMinimum(startDate: string): ValidatorFn {
		return (control: AbstractControl) => {
			if ((new Date(startDate) !== null && new Date(control.value) !== null) && new Date(startDate) > new Date(control.value)) {
				return { validEndDate: true };
			} else {
				return null;
			}
		};
	}

	// DOB Validator
	// isValidDob(isValid: any): ValidatorFn {
	// 	return (control: AbstractControl) => {
	// 		// if ((new Date(startDate) !== null && new Date(control.value) !== null) && new Date(startDate) > new Date(control.value)) {
	// 		// 	return { validDob: true };
	// 		// } else {
	// 		// 	return null;
	// 		// }
	// 		if (isValid) {
	// 			return { validDob: true };
	// 		} else {
	// 			return null;
	// 		}
	// 	};
	// }

	// Check Array Contain Elements
	isInArray(array, word) {
		// console.log(array.indexOf(word));
		// console.log(array.includes(word));
		// console.log(array.indexOf(word) > -1);
		// console.log(array.indexOf(word.toLowerCase()) > -1);
		return array.includes(word);
	}

	// set currently active tab index
	tabChanged(tabChangeEvent: MatTabChangeEvent): void {
		this.currentlyActiveIndexTab = tabChangeEvent.index;
		// console.log(this.currentlyActiveIndexTab);
	}

	//If Change Bank
	bankChange(event, modeofchange?) {
		if (modeofchange == 'customchange') {
			this.jobSeekerProfileForm.patchValue({
				'branchcode': '',
				'accountno': '',
				'bankcode': '',
			})
		}

		if (event == undefined || event == '' || event == null) {
			this.bankHint = "No payment if bank details are not filled up. Linked to payment to ensure no download if bank details is blank.";
			this.reqBankDetails = false;

			this.jobSeekerProfileForm.get("bankname").clearValidators();
			this.jobSeekerProfileForm.get("bankname").updateValueAndValidity();

			this.jobSeekerProfileForm.get("branchcode").clearValidators();
			this.jobSeekerProfileForm.get("branchcode").updateValueAndValidity();

			this.jobSeekerProfileForm.get("accountno").clearValidators();
			this.jobSeekerProfileForm.get("accountno").updateValueAndValidity();

			this.jobSeekerProfileForm.get("bankcode").clearValidators();
			this.jobSeekerProfileForm.get("bankcode").updateValueAndValidity();

		} else {
			// this.reqBankDetails = true;
			this.reqBankDetails = false;
			// let index = this.BankDetails.findIndex(x => x.shortName === event);
			let index = this.BankDetails.map(x => x.shortName).indexOf(event);
			this.bankHint = this.BankDetails[index].hint;
			this.jobSeekerProfileForm.patchValue({
				'bankcode': this.BankDetails[index].bankCode,
			})

			// this.jobSeekerProfileForm.get("bankname").setValidators([Validators.required]);
			// this.jobSeekerProfileForm.get("bankname").updateValueAndValidity();

			// this.jobSeekerProfileForm.get("branchcode").setValidators([Validators.required]);
			// this.jobSeekerProfileForm.get("branchcode").updateValueAndValidity();

			// this.jobSeekerProfileForm.get("accountno").setValidators([Validators.required]);
			// this.jobSeekerProfileForm.get("accountno").updateValueAndValidity();

			// this.jobSeekerProfileForm.get("bankcode").setValidators([Validators.required]);
			// this.jobSeekerProfileForm.get("bankcode").updateValueAndValidity();
		}
	}

	// If Employment Type Change
	employmenttypeChange(event) {
		// console.log(event);
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

	// Select All Specialization
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
		// console.log("fulltime : " + this.showfulltimespeccilization)
		// console.log(fulltimepreferredspecialization);
		// console.log("parttime : " + this.showparttimespeccilization)
		// console.log(parttimepreferredspecialization);
		let preferredspecialization = fulltimepreferredspecialization.concat(parttimepreferredspecialization);
		this.jobSeekerProfileForm.patchValue({
			'preferredspecialization': preferredspecialization
		});
		// console.log(preferredspecialization);
	}

	// UnSelect All Specialization
	unSelectAllSpecialization() {
		let preferredspecialization = [];
		this.jobSeekerProfileForm.patchValue({
			'preferredspecialization': preferredspecialization,
		});
	}

	// Main location Change
	mainlocationChange() {
		this.selectAllSubLocation();
	}

	// Select All SubLocation
	selectAllSubLocation() {
		let selectedPreferredRegion = this.jobSeekerProfileForm.get('preferredregion').value;

		let availableSubLocation = this.multiplesublocationfilter.transform(this.Locations, selectedPreferredRegion);
		let preferredlocation = availableSubLocation.map(x => x.sublocation);

		this.jobSeekerProfileForm.patchValue({
			'preferredlocation': preferredlocation
		});
	}

	// UnSelect All SubLocation
	unSelectAllSubLocation() {
		let preferredlocation = [];
		this.jobSeekerProfileForm.patchValue({
			'preferredlocation': preferredlocation
		});
	}

	// Select All WorkEnvironment
	selectAllWorkEnvironment() {
		let workingenvironment = this.WorkingEnvironments.map(x => x.Environment);
		this.jobSeekerProfileForm.patchValue({
			'workingenvironment': workingenvironment,
		});
		// console.log(workingenvironment);
	}

	// UnSelect All WorkEnvironment
	unSelectWorkEnvironment() {
		let workingenvironment = [];
		this.jobSeekerProfileForm.patchValue({
			'workingenvironment': workingenvironment,
		});
		// console.log(this.workingenvironment);
	}

	// Notification Alert Type change Event
	notificationAlertTypeChange(event) {
		if (event == "anytime") {
			this.jobSeekerProfileForm.patchValue({
				'alertswitchedoffdays': '',
				'alertofffrom': '',
				'alertoffto': ''
			});
		} else if (event == 'off') {
			this.jobSeekerProfileForm.patchValue({
				'alertswitchedoffdays': '1',
			});
			this.notificationAlertSWOffChange('1');
		}
	}

	// Notification Alert Off Range set
	notificationAlertSWOffChange(event) {
		let days = Number(event);
		let fromDate: Date = new Date();
		let toDate: Date = new Date();
		toDate.setDate(toDate.getDate() + days);
		let alertofffrom = this.datePipe.transform(fromDate, 'yyyy/MM/dd');
		let alertoffto = this.datePipe.transform(toDate, 'yyyy/MM/dd');

		this.jobSeekerProfileForm.patchValue({
			'alertofffrom': alertofffrom,
			'alertoffto': alertoffto,
		});
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

	//Set Validation for past Exp
	pastExpChangeInit() {
		if (this.jobSeekerProfileForm.controls['previousexperince']['controls'].length >= 0) {
			// iterate each object in array
			for (let Exp of this.jobSeekerProfileForm.controls['previousexperince']['controls']) {
				// listen to changes in each barcode, if change, do something!
				Exp.valueChanges.subscribe(data => {

					if ((data.previouscompanyname != null || data.previouscompanyname != '') || (data.previouscompanyposition != null || data.previouscompanyposition != '') || (data.previousjobresponsibility != null || data.previousjobresponsibility != '') || (data.previousjobfrom != null || data.previousjobfrom != '') || (data.previousjobto != null || data.previousjobto != '')) {

						Exp.get("previouscompanyname").setValidators([Validators.required]);
						Exp.get("previouscompanyname").updateValueAndValidity({ emitEvent: false, onlySelf: false });

						Exp.get("previouscompanyposition").setValidators([Validators.required]);
						Exp.get("previouscompanyposition").updateValueAndValidity({ emitEvent: false, onlySelf: false });

						Exp.get("previousjobresponsibility").setValidators([Validators.required]);
						Exp.get("previousjobresponsibility").updateValueAndValidity({ emitEvent: false, onlySelf: false });

						Exp.get("previousjobfrom").setValidators([Validators.required]);
						Exp.get("previousjobfrom").updateValueAndValidity({ emitEvent: false, onlySelf: false });

						Exp.get("previousjobto").setValidators([Validators.required, this.dateMinimum(data.previousjobfrom)]);
						Exp.get("previousjobto").updateValueAndValidity({ emitEvent: false, onlySelf: false });
					}

					if ((data.previouscompanyname == null || data.previouscompanyname == '') && (data.previouscompanyposition == null || data.previouscompanyposition == '') && (data.previousjobresponsibility == null || data.previousjobresponsibility == '') && (data.previousjobfrom == null || data.previousjobfrom == '') && (data.previousjobto == null || data.previousjobto == '')) {

						Exp.get("previouscompanyname").clearValidators();
						Exp.get("previouscompanyname").updateValueAndValidity({ emitEvent: false, onlySelf: false });

						Exp.get("previouscompanyposition").clearValidators();
						Exp.get("previouscompanyposition").updateValueAndValidity({ emitEvent: false, onlySelf: false });

						Exp.get("previousjobresponsibility").clearValidators();
						Exp.get("previousjobresponsibility").updateValueAndValidity({ emitEvent: false, onlySelf: false });

						Exp.get("previousjobfrom").clearValidators();
						Exp.get("previousjobfrom").updateValueAndValidity({ emitEvent: false, onlySelf: false });

						Exp.get("previousjobto").clearValidators();
						Exp.get("previousjobto").updateValueAndValidity({ emitEvent: false, onlySelf: false });
					}
				})
			}
		}
	}

	// Set Validation for new row at past exp
	pastExpChangeAddInit(index) {
		index = Number(index - 1);
		this.jobSeekerProfileForm.get(`previousexperince.${index}`).valueChanges.subscribe(data => {
			// console.log(data);
			let Exp = this.jobSeekerProfileForm.get(`previousexperince.${index}`);
			// console.log(<FormArray>this.jobSeekerProfileForm.controls['previousexperince'].controls);

			if ((data.previouscompanyname != null || data.previouscompanyname != '') || (data.previouscompanyposition != null || data.previouscompanyposition != '') || (data.previousjobresponsibility != null || data.previousjobresponsibility != '') || (data.previousjobfrom != null || data.previousjobfrom != '') || (data.previousjobto != null || data.previousjobto != '')) {

				Exp.get("previouscompanyname").setValidators([Validators.required]);
				Exp.get("previouscompanyname").updateValueAndValidity({ emitEvent: false, onlySelf: false });

				Exp.get("previouscompanyposition").setValidators([Validators.required]);
				Exp.get("previouscompanyposition").updateValueAndValidity({ emitEvent: false, onlySelf: false });

				Exp.get("previousjobresponsibility").setValidators([Validators.required]);
				Exp.get("previousjobresponsibility").updateValueAndValidity({ emitEvent: false, onlySelf: false });

				Exp.get("previousjobfrom").setValidators([Validators.required]);
				Exp.get("previousjobfrom").updateValueAndValidity({ emitEvent: false, onlySelf: false });

				Exp.get("previousjobto").setValidators([Validators.required, this.dateMinimum(data.previousjobfrom)]);
				Exp.get("previousjobto").updateValueAndValidity({ emitEvent: false, onlySelf: false });
			}

			if ((data.previouscompanyname == null || data.previouscompanyname == '') && (data.previouscompanyposition == null || data.previouscompanyposition == '') && (data.previousjobresponsibility == null || data.previousjobresponsibility == '') && (data.previousjobfrom == null || data.previousjobfrom == '') && (data.previousjobto == null || data.previousjobto == '')) {

				Exp.get("previouscompanyname").clearValidators();
				Exp.get("previouscompanyname").updateValueAndValidity({ emitEvent: false, onlySelf: false });

				Exp.get("previouscompanyposition").clearValidators();
				Exp.get("previouscompanyposition").updateValueAndValidity({ emitEvent: false, onlySelf: false });

				Exp.get("previousjobresponsibility").clearValidators();
				Exp.get("previousjobresponsibility").updateValueAndValidity({ emitEvent: false, onlySelf: false });

				Exp.get("previousjobfrom").clearValidators();
				Exp.get("previousjobfrom").updateValueAndValidity({ emitEvent: false, onlySelf: false });

				Exp.get("previousjobto").clearValidators();
				Exp.get("previousjobto").updateValueAndValidity({ emitEvent: false, onlySelf: false });
			}
		})
	}

	//===========================================================

	// Get Profile Details
	getProfileDetails() {
		this.busy = this._httpService.getProfileDetails()
			.subscribe(
				response => {
					// console.log(response);
					if (response.success) {

						this.isActive = response.message.activestatus ? response.message.activestatus : response.message.activestatus;
						// Profile Tab
						this.myProfile.username = response.message.username ? response.message.username : '';
						// this.myProfile.nameinidcard = response.message.nameinidcard ? response.message.nameinidcard : '';
						this.myProfile.email = response.message.email ? response.message.email : '';
						this.myProfile.country = response.message.country ? response.message.country : '';
						this.myProfile.race = response.message.race ? response.message.race : '';
						this.myProfile.residencytype = response.message.residencytype ? response.message.residencytype : '';
						this.myProfile.mobileno = response.message.mobileno ? response.message.mobileno : '';
						this.myProfile.address = response.message.address ? response.message.address : '';
						this.myProfile.nricfinno = response.message.nricfinno ? response.message.nricfinno : '';

						// Set NRIC FIN Not Editable If Once Added/Updated
						this.isNricFinNoReadonly = response.message.nriceditable ? response.message.nriceditable === 'true' ? false : true : false;

						// this.myProfile.dob = response.message.dob ? new Date(response.message.dob) : null;
						this.myProfile.dob = response.message.dob ? response.message.dob : null;

						// this.myProfile.age = this.CalculateAge(this.myProfile.dob);
						let Date_parts = this.myProfile.dob ? this.myProfile.dob.split('/') : '';

						this.myProfile.dob_day = Date_parts[2];
						this.myProfile.dob_month = Date_parts[1];
						this.myProfile.dob_year = Date_parts[0];

						this.myProfile.gender = response.message.gender ? response.message.gender : '';

						// Bank Tab
						this.myProfile.ispaynowreg = response.message.ispaynowreg ? response.message.ispaynowreg : 'No';
						this.myProfile.bankname = response.message.bankname ? response.message.bankname : '';
						this.myProfile.accountno = response.message.accountno ? response.message.accountno : '';
						this.myProfile.bankcode = response.message.bankcode ? response.message.bankcode : '';
						this.myProfile.branchcode = response.message.branchcode ? response.message.branchcode : '';
						// Job preferences
						this.myProfile.employmenttype = response.message.employmenttype ? response.message.employmenttype : '';
						this.myProfile.preferredregion = response.message.preferredregion ? response.message.preferredregion : '';
						this.myProfile.preferredlocation = response.message.preferredlocation ? response.message.preferredlocation : '';
						this.myProfile.preferredspecialization = response.message.preferredspecialization ? response.message.preferredspecialization : '';
						this.myProfile.workingenvironment = response.message.workingenvironment ? response.message.workingenvironment : '';
						// Notification Alert Types
						this.myProfile.notificationalerttype = response.message.notificationalerttype ? response.message.notificationalerttype : '';
						this.myProfile.alertswitchedoffdays = response.message.alertswitchedoffdays ? response.message.alertswitchedoffdays : '';
						this.myProfile.alertofffrom = response.message.alertofffrom ? response.message.alertofffrom : '';
						this.myProfile.alertoffto = response.message.alertoffto ? response.message.alertoffto : '';

						// Past Exp
						this.myProfile.experiencein = response.message.experiencein ? response.message.experiencein : '';
						this.myProfile.totalexperienceinyears = response.message.totalexperienceinyears ? response.message.totalexperienceinyears : '';

						let newExp: any[] = [];
						let pastExp = response.message.previousexperince;
						if (pastExp.length > 0) {
							for (let i = 0; i < pastExp.length; i++) {
								newExp.push({
									previouscompanyname: pastExp[i].previouscompanyname, previouscompanyposition: pastExp[i].previouscompanyposition, previousjobresponsibility: pastExp[i].previousjobresponsibility, previousjobfrom: new Date(pastExp[i].previousjobfrom), previousjobto: new Date(pastExp[i].previousjobto)
								})
							}
							this.myProfile.previousexperince = newExp;
						}
						// this.myProfile.previousexperince = response.message.previousexperince;

						// Documents
						this.profileImage = response.message.jobseekerimage ? this.imgBaseUrl + '/' + response.message.jobseekerimage : 'assets/img/avatars/profile-placeholder.png';
						this.idProofFront = response.message.jobseekeridprooffront ? this.imgBaseUrl + '/' + response.message.jobseekeridprooffront : 'assets/img/avatars/id-front-placeholder.png';
						this.idProofBack = response.message.jobseekeridproofback ? this.imgBaseUrl + '/' + response.message.jobseekeridproofback : 'assets/img/avatars/id-back-placeholder.png';

						this.isIdProofEditable = response.message.jobseekeridproofeditable ? response.message.jobseekeridproofeditable == "true" ? false : true : false;

						// Patch Form Value
						this.jobSeekerProfileForm.patchValue({
							'username': this.myProfile.username,
							// 'nameinidcard': this.myProfile.nameinidcard,
							'email': this.myProfile.email,
							'country': this.myProfile.country,
							'race': this.myProfile.race,
							'residencytype': this.myProfile.residencytype,
							'mobileno': this.myProfile.mobileno,
							'address': this.myProfile.address,
							'nricfinno': this.myProfile.nricfinno,
							// 'dob': this.myProfile.dob,
							// 'age': this.myProfile.age,
							'gender': this.myProfile.gender,

							'ispaynowreg': this.myProfile.ispaynowreg,
							'bankname': this.myProfile.bankname,
							'accountno': this.myProfile.accountno,
							'bankcode': this.myProfile.bankcode,
							'branchcode': this.myProfile.branchcode,

							'employmenttype': this.myProfile.employmenttype,
							'preferredregion': this.myProfile.preferredregion,
							'preferredlocation': this.myProfile.preferredlocation,
							'preferredspecialization': this.myProfile.preferredspecialization,
							'workingenvironment': this.myProfile.workingenvironment,

							'notificationalerttype': this.myProfile.notificationalerttype,
							'alertswitchedoffdays': this.myProfile.alertswitchedoffdays,
							'alertofffrom': this.myProfile.alertofffrom,
							'alertoffto': this.myProfile.alertoffto,

							'experiencein': this.myProfile.experiencein,
							'totalexperienceinyears': this.myProfile.totalexperienceinyears,
						})

						this.jobSeekerProfileForm.patchValue({
							dob_data: {
								dob_day: this.myProfile.dob_day,
								dob_month: this.myProfile.dob_month,
								dob_year: this.myProfile.dob_year
							}
						});

						// Set PastExp
						// Create Form Group Of Datas
						const pastExpFGs = this.myProfile.previousexperince.map(previousexperince => this.fb.group(previousexperince));
						// Change Form Group into FormArray
						const pastExpFormArray = this.fb.array(pastExpFGs);
						// Set Form Array values into Form
						this.jobSeekerProfileForm.setControl('previousexperince', pastExpFormArray);

					} else if (!response.success) {
						// console.log(response);
					}
				},
				error => {
					// console.log(error);
				}
			);
	}

	// Update Profile Datas
	jobSeekerProfileUpdate() {
		let previousexperince;
		let parsedPastExp: any[] = [];
		// Check Employment Type And process Past Exp
		if (this.isPartTimeJob) {
			this.jobSeekerProfileForm.patchValue({
				'totalexperienceinyears': "",
				'experiencein': "",
			});

			// this.jobSeekerProfileForm.setControl('previousexperince', this.fb.array([]));
			const control = <FormArray>this.jobSeekerProfileForm.controls['previousexperince'];
			for (let i = control.length - 1; i >= 0; i--) {
				// Clear Validator
				this.jobSeekerProfileForm.get(`previousexperince.${i}`).clearValidators();
				this.jobSeekerProfileForm.get(`previousexperince.${i}`).updateValueAndValidity({ emitEvent: false, onlySelf: false });
				// Remove Item
				control.removeAt(i)
			}
		} else {
			const control = <FormArray>this.jobSeekerProfileForm.controls['previousexperince'];
			for (let i = control.length - 1; i >= 0; i--) {
				if (this.jobSeekerProfileForm.get(`previousexperince.${i}.previouscompanyname`).value == "") {
					// Clear Validator
					this.jobSeekerProfileForm.get(`previousexperince.${i}`).clearValidators();
					this.jobSeekerProfileForm.get(`previousexperince.${i}`).updateValueAndValidity({ emitEvent: false, onlySelf: false });
					// Remove Item
					control.removeAt(i)
				} else {
					parsedPastExp.push({
						previouscompanyname: this.jobSeekerProfileForm.get(`previousexperince.${i}.previouscompanyname`).value,
						previouscompanyposition: this.jobSeekerProfileForm.get(`previousexperince.${i}.previouscompanyposition`).value,
						previousjobresponsibility: this.jobSeekerProfileForm.get(`previousexperince.${i}.previousjobresponsibility`).value,
						previousjobfrom: this.datePipe.transform(this.jobSeekerProfileForm.get(`previousexperince.${i}.previousjobfrom`).value, 'yyyy/MM/dd'),
						previousjobto: this.datePipe.transform(this.jobSeekerProfileForm.get(`previousexperince.${i}.previousjobto`).value, 'yyyy/MM/dd')
					})
				}
			}
			previousexperince = { "previousexperince": parsedPastExp }
		}

		if (this.jobSeekerProfileForm.get(`notificationalerttype`).value != "off") {
			this.jobSeekerProfileForm.patchValue({
				'alertswitchedoffdays': "",
				'alertofffrom': "",
				'alertoffto': ""
			});
		}

		// if (this.jobSeekerProfileForm.get(`nricfinno`).value != "") {
		// 	this.jobSeekerProfileForm.patchValue({
		// 		'nricfinno': this.toUppercase.transform(this.jobSeekerProfileForm.get(`nricfinno`).value),
		// 	});
		// }

		if (!this.jobSeekerProfileForm.valid) {
			this.isJobSeekerProfileFormValid = false;
			return false;
		}
		this.isJobSeekerProfileFormValid = true;

		// Convert Dob To Custom Format and send
		// let dob = { "dob": this.datePipe.transform(this.jobSeekerProfileForm.get('dob').value, 'yyyy/MM/dd') };
		let jobSeekerData = this.jobSeekerProfileForm.value;
		// jobSeekerData = Object.assign(jobSeekerData, dob);
		jobSeekerData = Object.assign(jobSeekerData, previousexperince);
		// console.log(jobSeekerData);

		this.busy = this._httpService.jobSeekerProfileUpdate(jobSeekerData)
			.subscribe(
				response => {
					if (response.success) {
						let profileImage = this.myProfileImageInputVariable.nativeElement;
						let idProofFront = this.myIdProofFrontInputVariable.nativeElement;
						let idProofBack = this.myIdProofBackInputVariable.nativeElement;

						if (profileImage.files[0] || idProofFront.files[0] || idProofBack.files[0]) {
							this.uploadProfileDocs();
						} else {
							localStorage.setItem('ogUserName', this.jobSeekerProfileForm.get('username').value);
							localStorage.setItem('ogUserEmail', this.jobSeekerProfileForm.get('email').value);
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

	// Update Profile Docs
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

	// Update Password
	passwordUpdate() {
		if (!this.passwordUpdateForm.valid) return false;
		// console.log(this.passwordUpdateForm.value);

		this.busy = this._httpService.jobseekerPasswordUpdate(this.passwordUpdateForm.value)
			.subscribe(
				response => {
					if (response.success) {
						this.passwordErrorMsg = "";
						let snackBarRef = this.snackBar.open('Password Updated Successfully.', 'Close', {
							duration: 5000,
						});
						snackBarRef.onAction().subscribe(() => {
							snackBarRef.dismiss();
						});
					} else {
						this.passwordErrorMsg = "Old Password is Wrong.";
						setTimeout(() => {
							this.passwordErrorMsg = "";
						}, 3000);

						let snackBarRef = this.snackBar.open('Please Enter Correct Old Password.', 'Close', {
							duration: 5000,
						});
						snackBarRef.onAction().subscribe(() => {
							snackBarRef.dismiss();
						});
					}
				},
				error => {
					// console.log(error);
				}
			);
	}

	// Age Calculate On DOB Change
	CalculateAge(DOB) {
		// console.log(DOB);
		if (DOB != null && DOB != '' && DOB != undefined) {
			DOB = new Date(DOB);
			if (DOB) {
				var timeDiff = Math.abs(Date.now() - DOB);
				//Used Math.floor instead of Math.ceil
				//so 26 years and 140 days would be considered as 26, not 27.
				// console.log(DOB);
				return Number(Math.floor((timeDiff / (1000 * 3600 * 24)) / 365));
			}
		}
	}

	// Days Generate
	generateDays() {
		this.days = [];
		for (let day = 1; day < 10; day++) {
			this.days.push('0' + day);
		}

		for (let day = 10; day <= this.maxDays; day++) {
			this.days.push(day);
		}
	}

	// Months Generate
	generateMonths() {
		for (let month = 1; month < 10; month++) {
			this.months.push({ "monthValue": '0' + month, "monthName": this.monthLongValues[month - 1] });
		}
		for (let month = 10; month <= 12; month++) {
			this.months.push({ "monthValue": month, "monthName": this.monthLongValues[month - 1] });
		}
	}

	// Years Generate
	generateYears() {
		let currentYear = new Date().getFullYear();
		for (let year = currentYear; year >= currentYear - 25; year--) {
			this.years.push(year);
		}
	}

	// leapYear(year) {
	// 	year = Number(year);
	// 	return (year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0);
	// }

	isValidDate(str) {
		var parts = str.split('/');
		if (parts.length < 3)
			return false;
		else {
			var day = parseInt(parts[2]);
			var month = parseInt(parts[1]);
			var year = parseInt(parts[0]);
			if (isNaN(day) || isNaN(month) || isNaN(year)) {
				return false;
			}
			if (day < 1 || year < 1)
				return false;
			if (month > 12 || month < 1)
				return false;
			if ((month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) && day > 31)
				return false;
			if ((month == 4 || month == 6 || month == 9 || month == 11) && day > 30)
				return false;
			if (month == 2) {
				if (((year % 4) == 0 && (year % 100) != 0) || ((year % 400) == 0 && (year % 100) == 0)) {
					if (day > 29)
						return false;
				} else {
					if (day > 28)
						return false;
				}
			}
			return true;
		}
	}

	isValidDob(dob: any): ValidatorFn {
		// console.log(str);
		return (control: AbstractControl) => {
			let currentYear = new Date().getFullYear();
			let parts = dob.split('/');
			if (parts.length < 3)
				return { validDob: true };
			else {
				let day = parseInt(parts[2]);
				let month = parseInt(parts[1]);
				let year = parseInt(parts[0]);

				if (isNaN(day) && isNaN(month) && isNaN(year)) {
					this.invalidDobErrorMsg = "";
					return { validDob: true };
				}

				if (isNaN(day) || isNaN(month) || isNaN(year)) {
					this.invalidDobErrorMsg = "Please Fill All DOB Fields";
					return { validDob: true };
				}

				if (day < 1 || year < 1) {
					this.invalidDobErrorMsg = "Are you sure you entered the right birthday?";
					return { validDob: true };
				}
				if (month > 12 || month < 1) {
					this.invalidDobErrorMsg = "Are you sure you entered the right birthday?";
					return { validDob: true };
				}
				if ((month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) && day > 31) {
					this.invalidDobErrorMsg = "Are you sure you entered the right birthday?";
					return { validDob: true };
				}
				if ((month == 4 || month == 6 || month == 9 || month == 11) && day > 30) {
					this.invalidDobErrorMsg = "Are you sure you entered the right birthday?";
					return { validDob: true };
				}
				if (month == 2) {
					if (((year % 4) == 0 && (year % 100) != 0) || ((year % 400) == 0 && (year % 100) == 0)) {
						if (day > 29) {
							this.invalidDobErrorMsg = "Are you sure you entered the right birthday?";
							return { validDob: true };
						}
					} else {
						if (day > 28) {
							this.invalidDobErrorMsg = "Are you sure you entered the right birthday?";
							return { validDob: true };
						}
					}
				}
				if (year >= currentYear - 8) {
					this.invalidDobErrorMsg = "Are you sure you entered the right birthday?";
					return { validDob: true };
				}
				// if (this.CalculateAge(dob))

				return null;
			}
		};
	}

	ngOnInit() {

		// this.generateDays();
		// this.generateMonths();
		// this.generateYears();

		// const myFormValueChanges$ = this.jobSeekerProfileForm.valueChanges;
		// myFormValueChanges$.subscribe(x => {
		// 	console.log(x);
		// });

		// Add Validation On Past Exp
		setTimeout(() => {
			this.pastExpChangeInit();
		}, 1000);

		// Age Calculate on Dob Change
		// this.jobSeekerProfileForm.get('dob').valueChanges
		// 	.subscribe(dob => {
		// 		let Age = this.CalculateAge(dob);
		// 		this.jobSeekerProfileForm.patchValue({
		// 			'age': Age
		// 		});
		// 	});

		this.jobSeekerProfileForm.get('dob_data').valueChanges
			.subscribe(dob_data => {

				let day = dob_data.dob_day;
				let month = dob_data.dob_month;
				let year = dob_data.dob_year;

				if (day != '' && day != null && day != undefined && day.length < 2) {
					day = '0' + day;
				}
				if (month != '' && month != null && month != undefined && month.length < 2) {
					month = '0' + month;
				}

				let dob = year + '/' + month + '/' + day;

				this.jobSeekerProfileForm.get("dob").setValidators([Validators.required, this.isValidDob(dob)]);
				this.jobSeekerProfileForm.get("dob").updateValueAndValidity({ emitEvent: false, onlySelf: false });

				this.jobSeekerProfileForm.patchValue({
					'dob': dob
				});

				let Age = this.CalculateAge(dob);
				// console.log(this.jobSeekerProfileForm.get('dob').status);
				if (!isNaN(Age) && this.jobSeekerProfileForm.get('dob').status == "VALID") {
					this.jobSeekerProfileForm.patchValue({
						'age': Age
					});
				} else {
					this.jobSeekerProfileForm.patchValue({
						'age': ''
					});
				}

				// if (dob_data.dob_day != undefined && dob_data.dob_day != "" && dob_data.dob_day != null && dob_data.dob_month != undefined && dob_data.dob_month != "" && dob_data.dob_month != null && dob_data.dob_year != undefined && dob_data.dob_year != "" && dob_data.dob_year != null) {

				// 	if (day.length < 2) {
				// 		day = '0' + day;
				// 	}
				// 	if (month.length < 2) {
				// 		month = '0' + month;
				// 	}

				// 	let dob = year + '/' + month + '/' + day;

				// 	this.jobSeekerProfileForm.patchValue({
				// 		'dob': dob
				// 	});

				// 	let Age = this.CalculateAge(dob);
				// 	this.jobSeekerProfileForm.patchValue({
				// 		'age': Age
				// 	});
				// }
			});
	}
}
