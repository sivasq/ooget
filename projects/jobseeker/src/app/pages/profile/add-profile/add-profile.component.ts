import { Component, OnInit, Input, ViewChild, ViewChildren, HostListener, ElementRef, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, AbstractControl, ValidatorFn, ValidationErrors, FormGroupDirective } from '@angular/forms';
import { ApiCallService } from '../../../services/api-call.service';
import { MatTabChangeEvent, MatSnackBar } from '@angular/material';
import { Subscription, Observable } from 'rxjs';
import { ConfigService } from '../../../services/config.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, UpperCasePipe, JsonPipe } from '@angular/common';
import { MultipleSubLocationFilter } from '../../../pipes/custompipes.pipe';
import { AsyncSubscriber } from '../../../services/async.service';
import { MockDataService } from '../../../services/mock-data.service';
import { EmploymentType } from '../../../classes/EmploymentType';
import { JobLocation, JobRegion } from '../../../classes/jobLocation';
import { Specialization } from '../../../classes/Specialization';
import { WorkingEnvironment } from '../../../classes/workingEnvironment';
import { BankDetail } from '../../../classes/bankDetail';
import { Race } from '../../../classes/race';
import { Nationality } from '../../../classes/Nationality';
import { isArray } from 'util';
import * as moment from 'moment';

@Component({
	selector: 'app-add-profile',
	templateUrl: './add-profile.component.html',
	styleUrls: ['./add-profile.component.scss'],
	// encapsulation: ViewEncapsulation.None,
})
export class AddProfileComponent implements OnInit, OnDestroy {
	appearance$: Observable<any>;
	busy: Subscription; // busy Config

	BankDetails: BankDetail[];
	EmploymentTypes: EmploymentType[];
	Regions: JobRegion[];
	Locations: JobLocation[];
	FullTimeSpecializations: Specialization[];
	PartTimeSpecializations: Specialization[];
	WorkingEnvironments: WorkingEnvironment[];
	Races: Race[];
	Nationalitys: Nationality[];

	days: any[] = [];
	months: any[] = [];
	years: any[] = [];
	maxDays = 31;
	invalidDobErrorMsg: string = '';

	one = 1;
	zero = 0;
	monthLongValues: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

	public today = new Date();
	public oldhide = true;
	public hide = true;
	public rehide = true;
	public passwordPatternError;

	@Input() selectedIndex: number | null;
	currentlyActiveIndexTab: number | null = 0;

	public myProfile: any = {
		firstname: '',
		lastname: '',
		email: '',
		country: '',
		race: '',
		residency_type: '',
		mobile: '',
		address: '',
		nric: '',
		dob_day: '',
		dob_month: '',
		dob_year: '',
		dob: '',
		age: '',
		gender: '',

		ispaynowreg: '',
		bank_id: '',
		bank_code: '',
		branch_code: '',
		account_no: '',

		employment_type: '',
		region: '',
		location: '',
		specializations: '',
		working_environment: '',

		notification: '',
		alertswitchedoffdays: '',
		notification_off_from: '',
		notification_off_to: '',

		experience_in: '',
		experience_year: '',
		experience_details: [
			{
				previouscompanyname: '',
				previouscompanyposition: '',
				previousjobresponsibility: '',
				previousjobfrom: '',
				previousjobto: ''
			}
		],
	};

	public profileImage: any = 'assets/img/avatars/profile-placeholder.png';
	public idProofFront: any = 'assets/img/avatars/id-front-placeholder.png';
	public idProofBack: any = 'assets/img/avatars/id-back-placeholder.png';

	@ViewChild('imgFileInput') myProfileImageInputVariable: ElementRef;
	@ViewChild('idFrontFileInput') myIdProofFrontInputVariable: ElementRef;
	@ViewChild('idBackFileInput') myIdProofBackInputVariable: ElementRef;
	@ViewChild('fileInput') el: ElementRef;

	public reqBankDetails: boolean;
	public bankHint;
	public baseUrl;
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

	gender = [
		{
			id: 1,
			name: 'Male'
		},
		{
			id: 2,
			name: 'Female'
		}
	];

	constructor(public router: Router, private fb: FormBuilder, private _httpService: ApiCallService, private urlconfig: ConfigService, public snackBar: MatSnackBar, private route: ActivatedRoute, private datePipe: DatePipe, private toUppercase: UpperCasePipe, private multiplesublocationfilter: MultipleSubLocationFilter, private asyncSubscriber: AsyncSubscriber, private mockDataService: MockDataService) {
		this.appearance$ = asyncSubscriber.getAppearance.pipe();
		this.baseUrl = urlconfig.base_url;
		this.buildJobSeekerProfileForm();
		this.buildPasswordUpdateForm();

		this.generateDays();
		this.generateMonths();
		this.generateYears();

		this.getProfileDetails();

		this.getEmploymentTypes();
		this.getWorkingEnvironments();
		this.getJobRegions();
		this.getJobLocations();
		// this.getSpecializations();
		this.getFullTimeSpecializations();
		this.getPartTimeSpecializations();
		this.getBankDetails();
		this.getRaces();
		this.getNationalitys();
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
	getBankDetails(): void {
		this.mockDataService.getBankDetails()
			.subscribe(BankDetails => this.BankDetails = BankDetails);
	}
	getRaces(): void {
		this.mockDataService.getRaces()
			.subscribe(Races => this.Races = Races);
	}
	getNationalitys(): void {
		this.mockDataService.getNationalitys()
			.subscribe(Nationalitys => this.Nationalitys = Nationalitys);
	}

	buildPasswordUpdateForm(): void {
		this.passwordUpdateForm = this.fb.group({
			oldpassword: ['', Validators.compose([Validators.required])],
			password: ['', Validators.compose([Validators.required, Validators.minLength(8)]), this.isPatternMatch.bind(this)],
			verify: ['', [Validators.required]],
		});
	}

	buildJobSeekerProfileForm(): void {
		this.jobSeekerProfileForm = this.fb.group({
			// Profile Details
			firstname: ['', Validators.compose([Validators.required])],
			// nameinidcard: ['', Validators.compose([Validators.required])],
			email: ['', Validators.compose([Validators.required, Validators.pattern(this.emailPattern)]), this.isEmailUnique.bind(this)],
			country: ['Singapore', Validators.compose([Validators.required])],
			race: ['', Validators.compose([Validators.required])],
			residency_type: ['', Validators.compose([Validators.required])],
			mobile: ['', Validators.compose([Validators.required, Validators.pattern(this.mobileNoPattern)])],
			// mobile: ['', Validators.compose([Validators.required, Validators.pattern(this.mobileNoPattern)]), this.isMobileUnique.bind(this)],
			address: ['', Validators.compose([Validators.required])],
			nric: ['', Validators.compose([Validators.pattern(this.nricFinNoPattern)])],
			// nric: ['', Validators.compose([Validators.pattern(this.nricFinNoPattern)]), this.isNricFinUnique.bind(this)],
			age: ['', Validators.compose([Validators.pattern(this.agePattern)])],
			dob_data: this.fb.group({
				dob_day: ['', Validators.compose([Validators.required])],
				dob_month: ['', Validators.compose([Validators.required])],
				dob_year: ['', Validators.compose([Validators.required])],
			}),
			dob: ['', Validators.compose([Validators.required])],
			// dob: ['', Validators.compose([Validators.required])],
			gender: [1, Validators.compose([Validators.required])],
			// Bank Details
			ispaynowreg: ['No'],
			bank_id: [''],
			bank_code: [''],
			branch_code: [''],
			account_no: [''],
			// Job Preference
			employment_type: [''],
			region: [''],
			location: [''],
			specializations: [''],
			working_environment: [''],
			// Notification Alerts Manage
			notification: [null],
			alertswitchedoffdays: [''],
			notification_off_from: [null],
			notification_off_to: [null],
			// Past Exp
			experience_in: [''],
			experience_year: [''],
			experience_details: this.fb.array([this.createExp()]),
			profileImage: [''],
			idProofFront: [''],
			idProofBack: ['']
		});
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
		// const control = this.jobSeekerProfileForm.get('experience_details') as FormArray;
		// const control = <FormArray>this.jobSeekerProfileForm.controls['experience_details'];
		// control.push(this.createExp());

		// == Method 2
		(<FormArray>this.jobSeekerProfileForm.get('experience_details')).push(this.createExp());

		// Add Validation For current row
		this.pastExpChangeAddInit(this.jobSeekerProfileForm.get(`experience_details.length`));
		// this.pastExpChangeAddInit(this.jobSeekerProfileForm.controls['experience_details']['controls'].length);

		// this.jobSeekerProfileForm.get(`experience_details.${0}.settings`)
	}

	removeExp(index: number) {
		// control refers to your formarray
		const control = this.jobSeekerProfileForm.get('experience_details') as FormArray;
		// const control = <FormArray>this.jobSeekerProfileForm.controls['experience_details'];
		// remove the chosen row
		control.removeAt(index);
	}

	// Check Password Pattern Match
	isPatternMatch(control: FormControl) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {

				let regAll = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%\^&*)(+=._-])/;
				if (!regAll.test(control.value)) {
					this.passwordPatternError = 'at least one number, one lowercase and one uppercase letter, one special charcter';
					resolve({ 'isPatternMatch': true });
				}

				let regNumber = /[0-9]/;
				if (!regNumber.test(control.value)) {
					this.passwordPatternError = 'password must contain at least one number (0-9)';
					resolve({ 'isPatternMatch': true });
				}

				let regSmallAlp = /[a-z]/;
				if (!regSmallAlp.test(control.value)) {
					this.passwordPatternError = 'password must contain at least one lowercase letter(a - z)';
					resolve({ 'isPatternMatch': true });
				}

				let regCapsAlp = /[A-Z]/;
				if (!regCapsAlp.test(control.value)) {
					this.passwordPatternError = 'password must contain at least one uppercase letter (A-Z)';
					resolve({ 'isPatternMatch': true });
				}

				let regSpecChar = /[!@#$%\^&*)(+=._-]/;
				if (!regSpecChar.test(control.value)) {
					this.passwordPatternError = 'password must contain at least one Special character (!@#$%\^&*)(+=._-)';
					resolve({ 'isPatternMatch': true });
				}

				var regSpace = /\s/;
				if (regSpace.test(control.value)) {
					this.passwordPatternError = 'space not allowed';
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
				if (this.myProfile.mobile != control.value) {
					this._httpService.checkMobile({ 'mobile': control.value }).subscribe((response) => {
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
				if (this.myProfile.nric != this.toUppercase.transform(control.value)) {
					this._httpService.checkUniqueNric({ 'nric': this.toUppercase.transform(control.value) }).subscribe((response) => {
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
		console.log(array);
		console.log(word);
		return array.includes(word);
	}

	// set currently active tab index
	tabChanged(tabChangeEvent: MatTabChangeEvent): void {
		this.currentlyActiveIndexTab = tabChangeEvent.index;
		// console.log(this.currentlyActiveIndexTab);
	}

	// If Change Bank
	bankChange(event, modeofchange?) {
		if (modeofchange == 'customchange') {
			this.jobSeekerProfileForm.patchValue({
				'branch_code': '',
				'account_no': '',
				'bank_code': '',
			});
		}

		if (event == undefined || event == '' || event == null) {
			this.bankHint = 'No payment if bank details are not filled up. Linked to payment to ensure no download if bank details is blank.';
			this.reqBankDetails = false;

			this.jobSeekerProfileForm.get('bank_id').clearValidators();
			this.jobSeekerProfileForm.get('bank_id').updateValueAndValidity();

			this.jobSeekerProfileForm.get('branch_code').clearValidators();
			this.jobSeekerProfileForm.get('branch_code').updateValueAndValidity();

			this.jobSeekerProfileForm.get('account_no').clearValidators();
			this.jobSeekerProfileForm.get('account_no').updateValueAndValidity();

			this.jobSeekerProfileForm.get('bank_code').clearValidators();
			this.jobSeekerProfileForm.get('bank_code').updateValueAndValidity();

		} else {
			// this.reqBankDetails = true;
			this.reqBankDetails = false;
			// let index = this.BankDetails.findIndex(x => x.shortName === event);
			let index = this.BankDetails.map(x => x.id).indexOf(event);
			this.bankHint = this.BankDetails[index].hint;
			this.jobSeekerProfileForm.patchValue({
				'bank_code': this.BankDetails[index].bankCode,
			});

			// this.jobSeekerProfileForm.get("bank_id").setValidators([Validators.required]);
			// this.jobSeekerProfileForm.get("bank_id").updateValueAndValidity();

			// this.jobSeekerProfileForm.get("branch_code").setValidators([Validators.required]);
			// this.jobSeekerProfileForm.get("branch_code").updateValueAndValidity();

			// this.jobSeekerProfileForm.get("account_no").setValidators([Validators.required]);
			// this.jobSeekerProfileForm.get("account_no").updateValueAndValidity();

			// this.jobSeekerProfileForm.get("bank_code").setValidators([Validators.required]);
			// this.jobSeekerProfileForm.get("bank_code").updateValueAndValidity();
		}
	}

	// If Employment Type Change
	employmenttypeChange(event) {
		console.log(event);
		if (this.isInArray(event, 2)) {
			this.isPartTimeJob = false;
		} else {
			this.isPartTimeJob = true;
		}

		if (this.isInArray(event, 2)) {
			this.showfulltimespeccilization = true;
		} else {
			this.showfulltimespeccilization = false;
		}

		if (this.isInArray(event, 1)) {
			this.showparttimespeccilization = true;
		} else {
			this.showparttimespeccilization = false;
		}

		this.selectAllSpecialization();
	}

	// Select All Specialization
	selectAllSpecialization() {
		let fulltimepreferredspecialization;
		let parttimepreferredspecialization;

		if (this.showfulltimespeccilization) {
			fulltimepreferredspecialization = this.FullTimeSpecializations.map(x => x.id);
		} else {
			fulltimepreferredspecialization = [];
		}

		if (this.showparttimespeccilization) {
			parttimepreferredspecialization = this.PartTimeSpecializations.map(x => x.id);
		} else {
			parttimepreferredspecialization = [];
		}
		// console.log("fulltime : " + this.showfulltimespeccilization)
		// console.log(fulltimepreferredspecialization);
		// console.log("parttime : " + this.showparttimespeccilization)
		// console.log(parttimepreferredspecialization);
		let preferredspecialization = fulltimepreferredspecialization.concat(parttimepreferredspecialization);
		this.jobSeekerProfileForm.patchValue({
			'specializations': preferredspecialization
		});
		// console.log(preferredspecialization);
	}

	// UnSelect All Specialization
	unSelectAllSpecialization() {
		let preferredspecialization = [];
		this.jobSeekerProfileForm.patchValue({
			'specializations': preferredspecialization,
		});
	}

	// Main location Change
	mainlocationChange() {
		this.selectAllSubLocation();
	}

	// Select All SubLocation
	selectAllSubLocation() {
		let selectedPreferredRegion = this.jobSeekerProfileForm.get('region').value;
		let availableSubLocation = this.multiplesublocationfilter.transform(this.Locations, selectedPreferredRegion);
		let preferredlocation = availableSubLocation.map(x => x.id);

		this.jobSeekerProfileForm.patchValue({
			'location': preferredlocation
		});
	}

	// UnSelect All SubLocation
	unSelectAllSubLocation() {
		let preferredlocation = [];
		this.jobSeekerProfileForm.patchValue({
			'location': preferredlocation
		});
	}

	// Select All WorkEnvironment
	selectAllWorkEnvironment() {
		let workingenvironment = this.WorkingEnvironments.map(x => x.name);
		this.jobSeekerProfileForm.patchValue({
			'working_environment': workingenvironment,
		});
		// console.log(workingenvironment);
	}

	// UnSelect All WorkEnvironment
	unSelectWorkEnvironment() {
		let workingenvironment = [];
		this.jobSeekerProfileForm.patchValue({
			'working_environment': workingenvironment,
		});
		// console.log(this.workingenvironment);
	}

	// Notification Alert Type change Event
	notificationAlertTypeChange(event) {
		if (event == 1) {
			this.jobSeekerProfileForm.patchValue({
				'alertswitchedoffdays': '',
				'notification_off_from': null,
				'notification_off_to': null
			});
		} else if (event == 0) {
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
		let notification_off_from = this.datePipe.transform(fromDate, 'yyyy/MM/dd');
		let notification_off_to = this.datePipe.transform(toDate, 'yyyy/MM/dd');

		this.jobSeekerProfileForm.patchValue({
			'notification_off_from': notification_off_from,
			'notification_off_to': notification_off_to,
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
			};
			this.jobSeekerProfileForm.get('profileImage').setValue(<File>event.target.files[0]);
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
				this.jobSeekerProfileForm.get('idProofFront').setValue(<File>event.target.files[0]);
			};
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
				this.jobSeekerProfileForm.get('idProofBack').setValue(<File>event.target.files[0]);
			};
		}
	}

	// Set Validation for past Exp
	pastExpChangeInit() {
		if (this.jobSeekerProfileForm.controls['experience_details']['controls'].length >= 0) {
			// iterate each object in array
			for (let Exp of this.jobSeekerProfileForm.controls['experience_details']['controls']) {
				// listen to changes in each barcode, if change, do something!
				Exp.valueChanges.subscribe(data => {

					if ((data.previouscompanyname != null || data.previouscompanyname != '') || (data.previouscompanyposition != null || data.previouscompanyposition != '') || (data.previousjobresponsibility != null || data.previousjobresponsibility != '') || (data.previousjobfrom != null || data.previousjobfrom != '') || (data.previousjobto != null || data.previousjobto != '')) {

						Exp.get('previouscompanyname').setValidators([Validators.required]);
						Exp.get('previouscompanyname').updateValueAndValidity({ emitEvent: false, onlySelf: false });

						Exp.get('previouscompanyposition').setValidators([Validators.required]);
						Exp.get('previouscompanyposition').updateValueAndValidity({ emitEvent: false, onlySelf: false });

						Exp.get('previousjobresponsibility').setValidators([Validators.required]);
						Exp.get('previousjobresponsibility').updateValueAndValidity({ emitEvent: false, onlySelf: false });

						Exp.get('previousjobfrom').setValidators([Validators.required]);
						Exp.get('previousjobfrom').updateValueAndValidity({ emitEvent: false, onlySelf: false });

						Exp.get('previousjobto').setValidators([Validators.required, this.dateMinimum(data.previousjobfrom)]);
						Exp.get('previousjobto').updateValueAndValidity({ emitEvent: false, onlySelf: false });
					}

					if ((data.previouscompanyname == null || data.previouscompanyname == '') && (data.previouscompanyposition == null || data.previouscompanyposition == '') && (data.previousjobresponsibility == null || data.previousjobresponsibility == '') && (data.previousjobfrom == null || data.previousjobfrom == '') && (data.previousjobto == null || data.previousjobto == '')) {

						Exp.get('previouscompanyname').clearValidators();
						Exp.get('previouscompanyname').updateValueAndValidity({ emitEvent: false, onlySelf: false });

						Exp.get('previouscompanyposition').clearValidators();
						Exp.get('previouscompanyposition').updateValueAndValidity({ emitEvent: false, onlySelf: false });

						Exp.get('previousjobresponsibility').clearValidators();
						Exp.get('previousjobresponsibility').updateValueAndValidity({ emitEvent: false, onlySelf: false });

						Exp.get('previousjobfrom').clearValidators();
						Exp.get('previousjobfrom').updateValueAndValidity({ emitEvent: false, onlySelf: false });

						Exp.get('previousjobto').clearValidators();
						Exp.get('previousjobto').updateValueAndValidity({ emitEvent: false, onlySelf: false });
					}
				});
			}
		}
	}

	// Set Validation for new row at past exp
	pastExpChangeAddInit(index) {
		index = Number(index - 1);
		this.jobSeekerProfileForm.get(`experience_details.${index}`).valueChanges.subscribe(data => {
			// console.log(data);
			let Exp = this.jobSeekerProfileForm.get(`experience_details.${index}`);
			// console.log(<FormArray>this.jobSeekerProfileForm.controls['experience_details'].controls);

			if ((data.previouscompanyname != null || data.previouscompanyname != '') || (data.previouscompanyposition != null || data.previouscompanyposition != '') || (data.previousjobresponsibility != null || data.previousjobresponsibility != '') || (data.previousjobfrom != null || data.previousjobfrom != '') || (data.previousjobto != null || data.previousjobto != '')) {

				Exp.get('previouscompanyname').setValidators([Validators.required]);
				Exp.get('previouscompanyname').updateValueAndValidity({ emitEvent: false, onlySelf: false });

				Exp.get('previouscompanyposition').setValidators([Validators.required]);
				Exp.get('previouscompanyposition').updateValueAndValidity({ emitEvent: false, onlySelf: false });

				Exp.get('previousjobresponsibility').setValidators([Validators.required]);
				Exp.get('previousjobresponsibility').updateValueAndValidity({ emitEvent: false, onlySelf: false });

				Exp.get('previousjobfrom').setValidators([Validators.required]);
				Exp.get('previousjobfrom').updateValueAndValidity({ emitEvent: false, onlySelf: false });

				Exp.get('previousjobto').setValidators([Validators.required, this.dateMinimum(data.previousjobfrom)]);
				Exp.get('previousjobto').updateValueAndValidity({ emitEvent: false, onlySelf: false });
			}

			if ((data.previouscompanyname == null || data.previouscompanyname == '') && (data.previouscompanyposition == null || data.previouscompanyposition == '') && (data.previousjobresponsibility == null || data.previousjobresponsibility == '') && (data.previousjobfrom == null || data.previousjobfrom == '') && (data.previousjobto == null || data.previousjobto == '')) {

				Exp.get('previouscompanyname').clearValidators();
				Exp.get('previouscompanyname').updateValueAndValidity({ emitEvent: false, onlySelf: false });

				Exp.get('previouscompanyposition').clearValidators();
				Exp.get('previouscompanyposition').updateValueAndValidity({ emitEvent: false, onlySelf: false });

				Exp.get('previousjobresponsibility').clearValidators();
				Exp.get('previousjobresponsibility').updateValueAndValidity({ emitEvent: false, onlySelf: false });

				Exp.get('previousjobfrom').clearValidators();
				Exp.get('previousjobfrom').updateValueAndValidity({ emitEvent: false, onlySelf: false });

				Exp.get('previousjobto').clearValidators();
				Exp.get('previousjobto').updateValueAndValidity({ emitEvent: false, onlySelf: false });
			}
		});
	}

	// ===========================================================

	// Get Profile Details
	getProfileDetails() {
		this.busy = this._httpService.getProfileDetails()
			.subscribe(
				response => {
					// console.log(response);
					if (response.success) {
						let userdata = response.result[0];
						console.log(userdata);
						this.isActive = userdata.activestatus ? userdata.activestatus : 0;
						// Profile Tab
						this.myProfile.firstname = userdata.firstname ? userdata.firstname : '';
						this.myProfile.lastname = userdata.lastname ? userdata.lastname : '';
						// this.myProfile.nameinidcard = userdata.nameinidcard ? userdata.nameinidcard : '';
						this.myProfile.email = userdata.email ? userdata.email : '';
						this.myProfile.country = userdata.country ? userdata.country : '';
						this.myProfile.race = userdata.race ? userdata.race : '';
						this.myProfile.residency_type = userdata.nationality ? userdata.nationality : '';
						this.myProfile.mobile = userdata.mobile ? userdata.mobile : '';
						this.myProfile.address = userdata.address ? userdata.address : '';
						this.myProfile.nric = userdata.nric ? userdata.nric : '';

						// Set NRIC FIN Not Editable If Once Added/Updated
						this.isNricFinNoReadonly = userdata.nriceditable ? userdata.nriceditable === 'true' ? false : true : false;

						// this.myProfile.dob = userdata.dob ? new Date(userdata.dob) : null;
						this.myProfile.dob = userdata.dob ? userdata.dob : null;

						// this.myProfile.age = this.CalculateAge(this.myProfile.dob);
						let Date_parts = this.myProfile.dob ? this.myProfile.dob.split('-') : '';

						this.myProfile.dob_day = Date_parts[2];
						this.myProfile.dob_month = Date_parts[1];
						this.myProfile.dob_year = Date_parts[0];
						this.myProfile.gender = userdata.gender ? userdata.gender : '';
						// Bank Tab
						this.myProfile.ispaynowreg = userdata.ispaynowreg ? userdata.ispaynowreg : 'No';
						this.myProfile.bank_id = userdata.bank_id ? userdata.bank_id : '';
						this.bankChange(userdata.bank_id);
						this.myProfile.account_no = userdata.account_no ? userdata.account_no : '';
						// this.myProfile.bank_code = userdata.bank_code ? userdata.bank_code : '';
						this.myProfile.branch_code = userdata.branch_code ? userdata.branch_code : '';
						// Job preferences
						this.myProfile.employment_type = userdata.employment_type ? this.stringToArray(userdata.employment_type) : '';

						this.employmenttypeChange(this.myProfile.employment_type);
						this.myProfile.region = userdata.region ? this.stringToArray(userdata.region) : '';
						this.myProfile.location = userdata.location ? this.stringToArray(userdata.location) : '';
						this.myProfile.specializations = userdata.specializations ? this.stringToArray(userdata.specializations) : '';
						this.myProfile.working_environment = userdata.working_environment ? this.stringToArray(userdata.working_environment) : '';
						// Notification Alert Types
						this.myProfile.notification = userdata.notification;

						this.myProfile.notification_off_from = userdata.notification_off_from ? userdata.notification_off_from : null;
						this.myProfile.notification_off_to = userdata.notification_off_to ? userdata.notification_off_to : null;

						this.myProfile.alertswitchedoffdays = this.dateDiff(this.myProfile.notification_off_from, this.myProfile.notification_off_to);

						// Past Exp
						this.myProfile.experience_in = userdata.experience_in ? this.stringToArray(userdata.experience_in) : '';
						this.myProfile.experience_year = userdata.experience_year;

						let newExp: any[] = [];
						let pastExp = userdata.experience_details !== '' ? JSON.parse(userdata.experience_details) : [];
						console.log(pastExp);
						if (pastExp.length > 0) {
							for (let i = 0; i < pastExp.length; i++) {
								newExp.push({
									previouscompanyname: pastExp[i].previouscompanyname, previouscompanyposition: pastExp[i].previouscompanyposition, previousjobresponsibility: pastExp[i].previousjobresponsibility, previousjobfrom: new Date(pastExp[i].previousjobfrom), previousjobto: new Date(pastExp[i].previousjobto)
								});
							}
							this.myProfile.experience_details = newExp;
							console.log(this.myProfile.experience_details);
						}
						// this.myProfile.experience_details = userdata.experience_details;
						// Documents
						this.profileImage = userdata.imgpath ? this.baseUrl + '/' + userdata.imgpath : 'assets/img/avatars/profile-placeholder.png';
						this.idProofFront = userdata.id_imgpath1 ? this.baseUrl + '/' + userdata.id_imgpath1 : 'assets/img/avatars/id-front-placeholder.png';
						this.idProofBack = userdata.id_imgpath2 ? this.baseUrl + '/' + userdata.id_imgpath2 : 'assets/img/avatars/id-back-placeholder.png';

						this.isIdProofEditable = userdata.jobseekeridproofeditable ? userdata.jobseekeridproofeditable == 'true' ? false : true : false;

						console.log(userdata);
						// Patch Form Value
						this.jobSeekerProfileForm.patchValue({
							'firstname': `${this.myProfile.firstname}`,
							'email': this.myProfile.email,
							'country': this.myProfile.country,
							'race': this.myProfile.race,
							'residency_type': this.myProfile.residency_type,
							'mobile': this.myProfile.mobile,
							'address': this.myProfile.address,
							'nric': this.myProfile.nric,
							// 'dob': this.myProfile.dob,
							// 'age': this.myProfile.age,
							// 'gender': this.myProfile.gender,
							'gender': this.myProfile.gender,

							'ispaynowreg': this.myProfile.ispaynowreg,
							'bank_id': this.myProfile.bank_id,
							'account_no': this.myProfile.account_no,
							// 'bank_code': this.myProfile.bank_code,
							'branch_code': this.myProfile.branch_code,

							'employment_type': this.myProfile.employment_type,
							'region': this.myProfile.region,
							'location': this.myProfile.location,
							'specializations': this.myProfile.specializations,
							'working_environment': this.myProfile.working_environment,

							'notification': this.myProfile.notification,
							'alertswitchedoffdays': this.myProfile.alertswitchedoffdays,
							'notification_off_from': this.myProfile.notification_off_from,
							'notification_off_to': this.myProfile.notification_off_to,

							'experience_in': this.myProfile.experience_in,
							'experience_year': this.myProfile.experience_year,
						});
						console.log(this.myProfile.experience_details);
						this.jobSeekerProfileForm.patchValue({
							dob_data: {
								dob_day: this.myProfile.dob_day,
								dob_month: this.myProfile.dob_month,
								dob_year: this.myProfile.dob_year
							}
						});

						// Set PastExp
						// Create Form Group Of Datas
						const pastExpFGs = this.myProfile.experience_details.map(experience_details => this.fb.group(experience_details));
						// Change Form Group into FormArray
						const pastExpFormArray = this.fb.array(pastExpFGs);
						// Set Form Array values into Form
						this.jobSeekerProfileForm.setControl('experience_details', pastExpFormArray);

					} else if (!response.success) {
						// console.log(response);
					}
				},
				error => {
					// console.log(error);
				}
			);
	}

	dateDiff(from, end) {
		var startDate = moment(from, 'YYYY-MM-DD');
		var endDate = moment(end, 'YYYY-MM-DD');

		return endDate.diff(startDate, 'days').toString();
	}

	// Update Profile Datas
	jobSeekerProfileUpdate() {
		let experience_details;
		let parsedPastExp: any[] = [];

		// Check Employment Type And process Past Exp
		if (this.isPartTimeJob) {
			this.jobSeekerProfileForm.patchValue({
				'experience_year': '',
				'experience_in': '',
			});

			// this.jobSeekerProfileForm.setControl('experience_details', this.fb.array([]));
			const control = <FormArray>this.jobSeekerProfileForm.controls['experience_details'];
			for (let i = control.length - 1; i >= 0; i--) {
				// Clear Validator
				this.jobSeekerProfileForm.get(`experience_details.${i}`).clearValidators();
				this.jobSeekerProfileForm.get(`experience_details.${i}`).updateValueAndValidity({ emitEvent: false, onlySelf: false });
				// Remove Item
				control.removeAt(i);
			}
		} else {
			const control = <FormArray>this.jobSeekerProfileForm.controls['experience_details'];
			for (let i = control.length - 1; i >= 0; i--) {
				if (this.jobSeekerProfileForm.get(`experience_details.${i}.previouscompanyname`).value === '') {
					// Clear Validator
					this.jobSeekerProfileForm.get(`experience_details.${i}`).clearValidators();
					this.jobSeekerProfileForm.get(`experience_details.${i}`).updateValueAndValidity({ emitEvent: false, onlySelf: false });
					// Remove Item
					control.removeAt(i);
				} else {
					parsedPastExp.push({
						previouscompanyname: this.jobSeekerProfileForm.get(`experience_details.${i}.previouscompanyname`).value,
						previouscompanyposition: this.jobSeekerProfileForm.get(`experience_details.${i}.previouscompanyposition`).value,
						previousjobresponsibility: this.jobSeekerProfileForm.get(`experience_details.${i}.previousjobresponsibility`).value,
						previousjobfrom: this.datePipe.transform(this.jobSeekerProfileForm.get(`experience_details.${i}.previousjobfrom`).value, 'yyyy/MM/dd'),
						previousjobto: this.datePipe.transform(this.jobSeekerProfileForm.get(`experience_details.${i}.previousjobto`).value, 'yyyy/MM/dd')
					});
				}
			}

			experience_details = { 'experience_details': JSON.stringify(parsedPastExp.reverse) };
		}

		if (this.jobSeekerProfileForm.get(`notification`).value !== 0) {
			this.jobSeekerProfileForm.patchValue({
				'alertswitchedoffdays': '',
				'notification_off_from': null,
				'notification_off_to': null
			});
		}

		// if (this.jobSeekerProfileForm.get(`nric`).value != "") {
		// 	this.jobSeekerProfileForm.patchValue({
		// 		'nric': this.toUppercase.transform(this.jobSeekerProfileForm.get(`nric`).value),
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
		jobSeekerData = Object.assign(jobSeekerData, experience_details);
		// console.log(jobSeekerData);

		let specializations = { 'specializations': this.ArrayToString(this.jobSeekerProfileForm.get(`specializations`).value) };
		jobSeekerData = Object.assign(jobSeekerData, specializations);

		let working_environment = { 'working_environment': this.ArrayToString(this.jobSeekerProfileForm.get(`working_environment`).value) };
		jobSeekerData = Object.assign(jobSeekerData, working_environment);

		let region = { 'region': this.ArrayToString(this.jobSeekerProfileForm.get(`region`).value) };
		jobSeekerData = Object.assign(jobSeekerData, region);

		let location = { 'location': this.ArrayToString(this.jobSeekerProfileForm.get(`location`).value) };
		jobSeekerData = Object.assign(jobSeekerData, location);

		let experience_in = { 'experience_in': this.ArrayToString(this.jobSeekerProfileForm.get(`experience_in`).value) };
		jobSeekerData = Object.assign(jobSeekerData, experience_in);

		let employment_type = { 'employment_type': this.ArrayToString(this.jobSeekerProfileForm.get(`employment_type`).value) };
		jobSeekerData = Object.assign(jobSeekerData, employment_type);

		// console.log(this.myProfileImageInputVariable);

		this.busy = this._httpService.updateProfileDetails(jobSeekerData)
			.subscribe(
				response => {
					if (response.success) {
						let profileImage = this.jobSeekerProfileForm.get('profileImage').value;
						let idProofFront = this.jobSeekerProfileForm.get('idProofFront').value;
						let idProofBack = this.jobSeekerProfileForm.get('idProofBack').value;

						if (profileImage !== '' || idProofFront !== '' || idProofBack !== '') {
							this.uploadProfileDocs();
						}
					} else {
						localStorage.setItem('ogUserName', this.jobSeekerProfileForm.get('firstname').value);
						localStorage.setItem('ogUserEmail', this.jobSeekerProfileForm.get('email').value);
						// location.reload();
						this.asyncSubscriber.setProfileDetails({ 'Image': this.profileImage });
						this.getProfileDetails();
						// this.router.navigate(['main/jobs/list']);
						let snackBarRef = this.snackBar.open('Profile Updated Successfully.', 'Close', {
							duration: 5000,
						});

						// snackBarRef.onAction().subscribe(() => {
						// 	snackBarRef.dismiss();
						// });
						// }
					}
				},
				error => {
					console.log(error);
				}
			);
	}

	// Update Profile Docs
	uploadProfileDocs() {
		// let profileImage = this.myProfileImageInputVariable.nativeElement;
		// const idProofFront = this.myIdProofFrontInputVariable.nativeElement;
		// const idProofBack = this.myIdProofBackInputVariable.nativeElement;

		const formData: FormData = new FormData();
		// if (profileImage.files && profileImage.files[0]) {
		// 	formData.append('fileToUpload', <File>profileImage.files[0]);
		// }

		// if (idProofFront.files && idProofFront.files[0]) {
		// 	formData.append('jobseekeridprooffront', idProofFront.files[0]);
		// }

		// if (idProofBack.files && idProofBack.files[0]) {
		// 	formData.append('jobseekeridproofback', idProofBack.files[0]);
		// }
		let profileImage = this.jobSeekerProfileForm.get('profileImage').value;
		let idProofFront = this.jobSeekerProfileForm.get('idProofFront').value;
		let idProofBack = this.jobSeekerProfileForm.get('idProofBack').value;

		if (profileImage !== '') {
			formData.append('fileToUpload', profileImage);
		}

		if (idProofFront !== '') {
			formData.append('fileToUpload1', idProofFront);
		}

		if (idProofBack !== '') {
			formData.append('fileToUpload2', idProofBack);
		}

		// if (profileImage.files[0] || idProofFront.files[0] || idProofBack.files[0]) {
		if (profileImage !== '' || idProofFront !== '' || idProofBack !== '') {
			this.busy = this._httpService.uploadProfileDocs(formData)
				.subscribe(
					response => {
						if (response.success) {
							localStorage.setItem('ogUserLogo', response.imgpath);
							this.asyncSubscriber.setProfileDetails({ 'Image': this.profileImage });
							// location.reload();
							// this.getProfileDetails();

							// this.router.navigate(['main/jobs/list']);

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
						this.passwordErrorMsg = '';
						let snackBarRef = this.snackBar.open('Password Updated Successfully.', 'Close', {
							duration: 5000,
						});
						snackBarRef.onAction().subscribe(() => {
							snackBarRef.dismiss();
						});
					} else {
						this.passwordErrorMsg = 'Old Password is Wrong.';
						setTimeout(() => {
							this.passwordErrorMsg = '';
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
				// Used Math.floor instead of Math.ceil
				// so 26 years and 140 days would be considered as 26, not 27.
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
			this.months.push({ 'monthValue': String('0' + month), 'monthName': this.monthLongValues[month - 1] });
		}
		for (let month = 10; month <= 12; month++) {
			this.months.push({ 'monthValue': String(month), 'monthName': this.monthLongValues[month - 1] });
		}

		console.log(this.months);
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
		let parts = str.split('/');
		if (parts.length < 3) {
			return false;
		} else {
			let day = parseInt(parts[2]);
			let month = parseInt(parts[1]);
			let year = parseInt(parts[0]);
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
					this.invalidDobErrorMsg = '';
					return { validDob: true };
				}

				if (isNaN(day) || isNaN(month) || isNaN(year)) {
					this.invalidDobErrorMsg = 'Please Fill All DOB Fields';
					return { validDob: true };
				}

				if (day < 1 || year < 1) {
					this.invalidDobErrorMsg = 'Are you sure you entered the right birthday?';
					return { validDob: true };
				}
				if (month > 12 || month < 1) {
					this.invalidDobErrorMsg = 'Are you sure you entered the right birthday?';
					return { validDob: true };
				}
				if ((month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) && day > 31) {
					this.invalidDobErrorMsg = 'Are you sure you entered the right birthday?';
					return { validDob: true };
				}
				if ((month == 4 || month == 6 || month == 9 || month == 11) && day > 30) {
					this.invalidDobErrorMsg = 'Are you sure you entered the right birthday?';
					return { validDob: true };
				}
				if (month == 2) {
					if (((year % 4) == 0 && (year % 100) != 0) || ((year % 400) == 0 && (year % 100) == 0)) {
						if (day > 29) {
							this.invalidDobErrorMsg = 'Are you sure you entered the right birthday?';
							return { validDob: true };
						}
					} else {
						if (day > 28) {
							this.invalidDobErrorMsg = 'Are you sure you entered the right birthday?';
							return { validDob: true };
						}
					}
				}
				if (year >= currentYear - 8) {
					this.invalidDobErrorMsg = 'Are you sure you entered the right birthday?';
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

				this.jobSeekerProfileForm.get('dob').setValidators([Validators.required, this.isValidDob(dob)]);
				this.jobSeekerProfileForm.get('dob').updateValueAndValidity({ emitEvent: false, onlySelf: false });

				this.jobSeekerProfileForm.patchValue({
					'dob': dob
				});

				let Age = this.CalculateAge(dob);
				// console.log(this.jobSeekerProfileForm.get('dob').status);
				if (!isNaN(Age) && this.jobSeekerProfileForm.get('dob').status == 'VALID') {
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

	ngOnDestroy() {
		if (this.busy) {
			this.busy.unsubscribe();
		}
	}
}
