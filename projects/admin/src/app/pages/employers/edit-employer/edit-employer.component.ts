import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { ApiCallService } from '../../../services/api-call.service';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-edit-employer',
	templateUrl: './edit-employer.component.html',
	styleUrls: ['./edit-employer.component.scss']
})
export class EditEmployerComponent implements OnInit {

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

	constructor(private _httpService: ApiCallService, public snackBar: MatSnackBar, private fb: FormBuilder, private route: ActivatedRoute, public router: Router) {
		this.buildEmployerUpdateForm();
		this.companyid = this.route.snapshot.params['emp_id'];
		let employerId = {
			companyid: this.route.snapshot.params['emp_id'],
		}
		this.getEmployerDetails(employerId);
	}

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
			companycode: ['', Validators.compose([Validators.required])],
			// email: ['', Validators.compose([Validators.required, Validators.pattern(this.emailPattern)]), this.isEmailUnique.bind(this)],
			// password: ['', Validators.compose([Validators.required, Validators.minLength(8)]), this.isPatternMatch.bind(this)],
			// verify: ['', [Validators.required]],
			// activestatus: ['true'],
			// registeredby: ['ooget-team'],
			// termsaccepted: ['false'],
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
	public employerUpdateSubmit() {
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
						// Reset form
						// this.employerUpdateForm.resetForm();
						// Show Success Snackbar
						let snackBarRef = this.snackBar.open('Employer Info Updated Successfully.', 'Close', {
							duration: 5000,
						});
						// Snackbar action
						snackBarRef.onAction().subscribe(() => {
							snackBarRef.dismiss();
							console.log('The snack-bar action was triggered!');
						});

						this.router.navigate(['admin/employers/' + this.companyid + '/view']);

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

	getEmployerDetails(employerId) {
		this.busy = this._httpService.getEmployerDetails(employerId)
			.subscribe(
				response => {
					if (response.success) {
						this.employerId = response.employer._id;
						this.employerName = response.employer.companyname;
						this.employerOldEmail = response.employer.adminid.email;
						this.employerOldUen = response.employer.uennumber;
						console.log(this.employerOldEmail);

						this.employerUpdateForm.patchValue({
							companyname: response.employer.companyname,
							profile: response.employer.profile,
							uennumber: response.employer.uennumber,
							industry: response.employer.industry,
							country: response.employer.country,
							companycode: response.employer.companycode,
							email: response.employer.adminid.email,
							// password: response.employer.companyname,
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
