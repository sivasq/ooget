import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable, config } from 'rxjs';
import { ApiCallService } from '../../../services/api-call.service';
import { ConfigService } from '../../../services/config.service';
import { AsyncSubscriber } from '../../../services/async.service';

@Component({
	selector: 'app-edit-company-details',
	templateUrl: './edit-company-details.component.html',
	styleUrls: ['./edit-company-details.component.scss']
})
export class EditCompanyDetailsComponent implements OnInit {

	// public appearance;
	appearance$: Observable<any>;

	public hide = true;
	public rehide = true;
	public passwordPatternError;

	public employerOldEmail;
	public employerOldUen;

	public employerName;
	public employerId;
	public companyid;

	public busy: Subscription;

	employerUpdateForm: FormGroup;
	@ViewChild(FormGroupDirective) resetEmployerUpdateForm;
	emailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	constructor(private _httpService: ApiCallService, public snackBar: MatSnackBar, private fb: FormBuilder, private route: ActivatedRoute, public router: Router, private config: ConfigService, private asyncSubscriber: AsyncSubscriber) {

		this.appearance$ = asyncSubscriber.getAppearance.pipe();

		/* // asyncSubscriber.getAppearance.asObservable().subscribe((data) => {
		asyncSubscriber.getAppearance.subscribe((value) => {
			this.appearance = value;
			console.log("First subscriber got data >>>>> " + value);
		}); */

		/* // Get Default value by service
		asyncService.getAppearance.subscribe(data => {
			this.appearance = data;
		}); */

		/* // Get Default value by service
		subscriber.getAppearance(options => {
			this.appearance = options.appearance;
		}); */

		this.buildEmployerUpdateForm();
		this.companyid = this.route.snapshot.params['emp_id'];
		this.getCompanyDetails();
	}

	/* setAppearanceNext1() {
		this.subscriber.setAppearance({ appearance: 'standard' });
	} */
	/* setAppearanceNext() {
		this.asyncSubscriber.setAppearance();
	} */
	/* getAppearanceNext() {
		console.log(this.asyncSubscriber.appearance.getValue());
	} */

	public Industries: any = [
		{
			"_id": "432424",
			"IndustryName": "Aerospace"
		},
		{
			"_id": "432424",
			"IndustryName": "Creative Industries"
		},
		{
			"_id": "432424",
			"IndustryName": "Energy & Chemicals"
		},
		{
			"_id": "432424",
			"IndustryName": "Logistics & Supply Chain Mangement"
		},
		{
			"_id": "432424",
			"IndustryName": "Medical Technology"
		},
		{
			"_id": "432424",
			"IndustryName": "Pharmaceutical & Biotechnology"
		},
		{
			"_id": "432424",
			"IndustryName": "Professional Services"
		},
		{
			"_id": "432424",
			"IndustryName": "Consumer Business"
		},
		{
			"_id": "432424",
			"IndustryName": "Electronics"
		},
		{
			"_id": "432424",
			"IndustryName": "Information & Communications Technology"
		},
		{
			"_id": "432424",
			"IndustryName": "Oil & Gas Equipment and Services"
		},
		{
			"_id": "432424",
			"IndustryName": "Natural Resources"
		},
		{
			"_id": "432424",
			"IndustryName": "Precision Engineering"
		},
		{
			"_id": "432424",
			"IndustryName": "Urban Solutions & Sustainability"
		},
	]

	// Build Employer Add Form
	buildEmployerUpdateForm(): void {
		this.employerUpdateForm = this.fb.group({
			companyid: this.route.snapshot.params['emp_id'],
			companyname: ['', Validators.compose([Validators.required])],
			profile: ['', Validators.compose([Validators.required])],
			uennumber: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{7,9}[A-Za-z]{1}$')]), this.isUENUnique.bind(this)],
			industry: ['', Validators.compose([Validators.required])],
			country: ['', Validators.compose([Validators.required])],
			companycode: ['', Validators.compose([Validators.required])]
		})
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

	// Check UEN Unique
	isUENUnique(control: FormControl) {
		console.log(this.employerOldUen);
		console.log(control.value);
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (this.employerOldUen != control.value) {
					this._httpService.checkUEN({ 'uennumber': control.value.toUpperCase() }).subscribe((response) => {
						if (response.success) {
							resolve(null);
						} else {
							resolve({ 'isUENUnique': true });
						}
					}, () => {
						resolve({ 'isUENUnique': false });
					});
				} else {
					resolve(null);
				}
			}, 50);
		});
	}

	// Check Email Unique
	isEmailUnique(control: FormControl) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (this.employerOldEmail != control.value) {
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

	// Submit handler for Employer Add
	employerUpdateSubmit() {
		if (!this.employerUpdateForm.valid) return false;

		// let snackBarRef = this.snackBar.open('Backend Process Not Done, Please Wait...', 'Close', {
		// 	duration: 5000,
		// });
		// snackBarRef.onAction().subscribe(() => {
		// 	snackBarRef.dismiss();
		// 	console.log('The snack-bar action was triggered!');
		// });

		this.busy = this._httpService.employerUpdate(this.employerUpdateForm.value)
			.subscribe(
				response => {
					// Response is success
					if (response.success) {
						// Show Success Snackbar
						let snackBarRef = this.snackBar.open('Company Info Updated Successfully.', 'Close', {
							duration: 5000,
						});
						// Snackbar action
						snackBarRef.onAction().subscribe(() => {
							snackBarRef.dismiss();
							console.log('The snack-bar action was triggered!');
						});

						this.router.navigate(['employers/' + this.companyid + '/view']);

						// Response is failed
					} else if (!response.success) {
						console.log(response);
					}
				},
				error => {
					console.log(error);
				}
			);
	}

	// Get Company Details
	getCompanyDetails() {
		this.busy = this._httpService.getCompanyDetails()
			.subscribe(
				response => {
					if (response.success) {
						this.employerId = response.company._id;
						this.employerName = response.company.companyname;
						this.employerOldUen = response.company.uennumber;

						this.employerUpdateForm.patchValue({
							companyname: response.company.companyname,
							profile: response.company.profile,
							uennumber: response.company.uennumber,
							industry: response.company.industry,
							country: response.company.country,
							companycode: response.company.companycode,
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

	ngOnInit() {
		this.employerUpdateForm.get('uennumber').valueChanges
			.subscribe(x => {
				if (x != null) {
					console.log(x);
					this.employerUpdateForm.patchValue({ uennumber: x.toUpperCase() }, { emitEvent: false });
				}
			});
	}

}
