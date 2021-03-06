import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable, config } from 'rxjs';
import { ApiCallService } from '../../../services/api-call.service';
import { ConfigService } from '../../../services/config.service';
import { AsyncSubscriber } from '../../../services/async.service';
import { Industry } from '../../../classes/industry';
import { MockDataService } from '../../../services/mock-data.service';

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
	// public companyid;
	public Industries: Industry[];
	public busy: Subscription;

	employerUpdateForm: FormGroup;
	@ViewChild(FormGroupDirective) resetEmployerUpdateForm;
	emailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	constructor(private _httpService: ApiCallService, private mockDataService: MockDataService, public snackBar: MatSnackBar, private fb: FormBuilder, private route: ActivatedRoute, public router: Router, private config: ConfigService, private asyncSubscriber: AsyncSubscriber) {

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
		// this.companyid = this.route.snapshot.params['emp_id'];
		this.getCompanyDetails();
		this.getIndustries();
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
	getIndustries(): void {
		// this.Industries = this.mockDataService.getIndustries();
		this.mockDataService.getIndustries()
			.subscribe(IndustriesList => this.Industries = IndustriesList);
	}

	// Build Employer Add Form
	buildEmployerUpdateForm(): void {
		this.employerUpdateForm = this.fb.group({
			employerid: ['', Validators.compose([Validators.required])],
			companyname: ['', Validators.compose([Validators.required])],
			profile: ['', Validators.compose([Validators.required])],
			uen: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{7,9}[A-Za-z]{1}$')]), this.isUENUnique.bind(this)],
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

	// Check UEN Unique
	isUENUnique(control: FormControl) {
		// console.log(this.employerOldUen);
		// console.log(control.value);
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (this.employerOldUen !== control.value) {
					this._httpService.checkUENExists({ 'uen': control.value.toUpperCase() }).subscribe((response) => {
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
					this._httpService.checkEmailExists({ 'email': control.value }).subscribe((response) => {
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
		if (!this.employerUpdateForm.valid) { return false; }

		// let snackBarRef = this.snackBar.open('Backend Process Not Done, Please Wait...', 'Close', {
		// 	duration: 5000,
		// });
		// snackBarRef.onAction().subscribe(() => {
		// 	snackBarRef.dismiss();
		// 	console.log('The snack-bar action was triggered!');
		// });

		this.busy = this._httpService.updateEmployer(this.employerUpdateForm.value)
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
							// console.log('The snack-bar action was triggered!');
						});

						this.router.navigate(['/employer/settings/editcompany']);

						// Response is failed
					} else if (!response.success) {
						// console.log(response);
					}
				},
				error => {
					console.log(error);
				}
			);
	}

	// Get Company Details
	getCompanyDetails() {
		this.busy = this._httpService.getEmployer()
			.subscribe(
				response => {
					if (response.success) {
						let companyDetails = response.result[0];

						this.employerId = companyDetails.id;
						this.employerName = companyDetails.name;
						this.employerOldUen = companyDetails.uen;

						this.employerUpdateForm.patchValue({
							employerid: companyDetails.id,
							companyname: companyDetails.name,
							profile: companyDetails.profile,
							uen: companyDetails.uen,
							industry: companyDetails.industry,
							country: companyDetails.country,
							companycode: companyDetails.companycode,
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

	ngOnInit() {
		this.employerUpdateForm.get('uen').valueChanges
			.subscribe(x => {
				if (x != null) {
					// console.log(x);
					this.employerUpdateForm.patchValue({ uen: x.toUpperCase() }, { emitEvent: false });
				}
			});
	}

}
