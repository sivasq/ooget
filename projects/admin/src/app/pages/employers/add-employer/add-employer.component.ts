import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { ApiCallService } from '../../../services/api-call.service';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective } from '@angular/forms';
import { Observable } from 'rxjs';
import { AsyncSubscriber } from '../../../services/async.service';
import { Industry } from '../../../classes/Industry';
import { Industries } from '../../../mock-datas/industries';
import { MockDataService } from '../../../services/mock-data.service';

@Component({
	selector: 'app-add-employer',
	templateUrl: './add-employer.component.html',
	styleUrls: ['./add-employer.component.scss']
})
export class AddEmployerComponent implements OnInit {

	appearance$: Observable<any>;

	public hide = true;
	public rehide = true;
	public passwordPatternError;

	public Industries: Industry[];

	employerAddForm: FormGroup;
	@ViewChild(FormGroupDirective) resetEmployerAddForm;
	emailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	constructor(private _httpService: ApiCallService, public snackBar: MatSnackBar, private fb: FormBuilder, private asyncSubscriber: AsyncSubscriber, private mockDataService: MockDataService) {
		this.buildEmployerAddForm();
		this.appearance$ = asyncSubscriber.getAppearance.pipe();
		this.getIndustries();
	}

	getIndustries(): void {
		// this.Industries = this.mockDataService.getIndustries();
		this.mockDataService.getIndustries()
			.subscribe(IndustriesList => this.Industries = IndustriesList);
	}

	// Build Employer Add Form
	buildEmployerAddForm(): void {
		this.employerAddForm = this.fb.group({
			companyname: ['', Validators.compose([Validators.required])],
			profile: ['', Validators.compose([Validators.required])],
			uen: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{7,9}[A-Za-z]{1}$')]), this.isUENUnique.bind(this)],
			industry: ['', Validators.compose([Validators.required])],
			country: ['', Validators.compose([Validators.required])],
			companycode: ['', Validators.compose([Validators.required])],
			username: ['', Validators.compose([Validators.required])],
			useremail: ['', Validators.compose([Validators.required, Validators.pattern(this.emailPattern)]), this.isEmailUnique.bind(this)],
			password: ['', Validators.compose([Validators.required, Validators.minLength(8)]), this.isPatternMatch.bind(this)],
			verify: ['', [Validators.required]]
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
	public employerAddSubmit() {
		if (!this.employerAddForm.valid) { return false; }

		this._httpService.createEmployer(this.employerAddForm.value)
			.subscribe(
				response => {
					// Response is success
					if (response.success) {
						// Reset form
						this.resetEmployerAddForm.resetForm();
						// Show Success Snackbar
						const snackBarRef = this.snackBar.open('Employer Added Successfully.', 'Close', {
							duration: 5000,
						});
						// Snackbar action
						snackBarRef.onAction().subscribe(() => {
							snackBarRef.dismiss();
							console.log('The snack-bar action was triggered!');
						});
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
		this.employerAddForm.get('uen').valueChanges
			.subscribe(x => {
				if (x != null) {
					// console.log(x);
					this.employerAddForm.patchValue({ uen: x.toUpperCase() }, { emitEvent: false });
				}
			});
	}
}
