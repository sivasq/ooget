import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ApiCallService } from '../services/api-call.service';
import { FormGroup, FormGroupDirective, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Subscription, Observable } from 'rxjs';
import { ConfigService } from '../services/config.service';
import { AsyncSubscriber } from '../services/async.service';
import { Industry } from '../classes/industry';
import { MockDataService } from '../services/mock-data.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
	public homePageUrl;
	appearance$: Observable<any>;
	// busy Config
	busy: Subscription;

	public hide = true;
	public rehide = true;
	public passwordPatternError;

	public Industries: Industry[];

	employerRegForm: FormGroup;
	@ViewChild(FormGroupDirective) resetEmployerRegForm;
	emailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	constructor(public router: Router, private _httpService: ApiCallService, private config: ConfigService, public snackBar: MatSnackBar, private fb: FormBuilder, private asyncSubscriber: AsyncSubscriber, private mockDataService: MockDataService) {

		this.appearance$ = asyncSubscriber.getAppearance.pipe();

		this.homePageUrl = config.homePageUrl;
		this.getIndustries();
		this.buildEmployerRegForm();
	}

	getIndustries(): void {
		this.mockDataService.getIndustries()
			.subscribe(Industries => this.Industries = Industries);
	}

	// Build Employer Add Form
	buildEmployerRegForm(): void {
		this.employerRegForm = this.fb.group({
			companyname: ['', Validators.compose([Validators.required])],
			profile: ['', Validators.compose([Validators.required])],
			uen: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{7,9}[A-Za-z]{1}$')]), this.isUENUnique.bind(this)],
			industry: ['', Validators.compose([Validators.required])],
			country: ['', Validators.compose([Validators.required])],
			username: ['', Validators.compose([Validators.required])],
			useremail: ['', Validators.compose([Validators.required, Validators.pattern(this.emailPattern)]), this.isEmailUnique.bind(this)],
			password: ['', Validators.compose([Validators.required, Validators.minLength(8)]), this.isPatternMatch.bind(this)],
			verify: ['', [Validators.required]],
			recaptcha: ['', Validators.required]
		});
	}

	// Check Password Pattern Match
	isPatternMatch(control: FormControl) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {

				const regAll = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%\^&*)(+=._-])/;
				if (!regAll.test(control.value)) {
					this.passwordPatternError = 'at least one number, one lowercase and one uppercase letter, one special charcter';
					resolve({ 'isPatternMatch': true });
				}

				const regNumber = /[0-9]/;
				if (!regNumber.test(control.value)) {
					this.passwordPatternError = 'password must contain at least one number (0-9)';
					resolve({ 'isPatternMatch': true });
				}

				const regSmallAlp = /[a-z]/;
				if (!regSmallAlp.test(control.value)) {
					this.passwordPatternError = 'password must contain at least one lowercase letter(a - z)';
					resolve({ 'isPatternMatch': true });
				}

				const regCapsAlp = /[A-Z]/;
				if (!regCapsAlp.test(control.value)) {
					this.passwordPatternError = 'password must contain at least one uppercase letter (A-Z)';
					resolve({ 'isPatternMatch': true });
				}

				const regSpecChar = /[!@#$%\^&*)(+=._-]/;
				if (!regSpecChar.test(control.value)) {
					this.passwordPatternError = 'password must contain at least one Special character (!@#$%\^&*)(+=._-)';
					resolve({ 'isPatternMatch': true });
				}

				const regSpace = /\s/;
				if (regSpace.test(control.value)) {
					this.passwordPatternError = 'space not allowed';
					resolve({ 'isPatternMatch': true });
				}
				resolve(null);
			}, 5);
		});
	}

	// Check UEN Unique
	isUENUnique(control: FormControl) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				this._httpService.checkUENExists({ 'uen': control.value.toUpperCase() }).subscribe((response) => {
					if (response.success) {
						resolve(null);
					} else {
						resolve({ 'isUENUnique': true });
					}
				}, () => { resolve({ 'isUENUnique': false }); });
			}, 50);
		});
	}

	// Check Email Unique
	isEmailUnique(control: FormControl) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				this._httpService.checkEmailExists({ 'email': control.value }).subscribe((response) => {
					if (response.success) {
						resolve(null);
					} else {
						resolve({ 'isEmailUnique': true });
					}
				}, () => { resolve({ 'isEmailUnique': false }); });
			}, 50);
		});
	}

	// Submit handler for Employer Add
	public onSubmitReg() {
		if (!this.employerRegForm.valid) { return false; }

		this.busy = this._httpService.createEmployer(this.employerRegForm.value)
			.subscribe(
				response => {
					// Response is success
					if (response.success) {
						// Reset form
						this.resetEmployerRegForm.resetForm();
						// Show Success Snackbar
						const snackBarRef = this.snackBar.open('You Have Registered Successfully.', 'Close', {
							duration: 2000,
						});
						// Snackbar action
						snackBarRef.afterDismissed().subscribe(info => {
							if (info.dismissedByAction === true) {
								this.router.navigate(['auth/login']);
							}
							this.router.navigate(['auth/login']);
						});
						// snackBarRef.onAction().subscribe(() => {
						// 	snackBarRef.dismiss();
						// 	this.router.navigate(['auth/login']);
						// });

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

	ngOnInit() {
		this.employerRegForm.get('uen').valueChanges
			.subscribe(x => {
				if (x != null) {
					// console.log(x);
					this.employerRegForm.patchValue({ uen: x.toUpperCase() }, { emitEvent: false });
				}
			});
	}
}
