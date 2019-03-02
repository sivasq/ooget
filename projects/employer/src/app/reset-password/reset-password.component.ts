import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiCallService } from '../services/api-call.service';
import { FormGroup, FormGroupDirective, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { ConfigService } from '../services/config.service';
import { MatSnackBar } from '@angular/material';
import { AsyncSubscriber } from '../services/async.service';

@Component({
	selector: 'app-reset-password',
	templateUrl: './reset-password.component.html',
	styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
	public homePageUrl;
	appearance$: Observable<any>;

	public hide = true;
	public rehide = true;
	public passwordPatternError;
	isAuthMsg;
	// isValidUrl: boolean;

	//busy Config
	busy: Subscription;

	employerPassResetForm: FormGroup;
	@ViewChild(FormGroupDirective) resetemployerPassResetForm;
	emailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	constructor(public router: Router, private _httpService: ApiCallService, private config: ConfigService, private fb: FormBuilder, public snackBar: MatSnackBar, private route: ActivatedRoute, private asyncSubscriber: AsyncSubscriber) {

		this.appearance$ = asyncSubscriber.getAppearance.pipe();

		this.homePageUrl = config.homePageUrl;

		this.buildEmployerPassResetForm();

		this.getUserDetails({ jobseekerid: this.route.snapshot.params['userId'] });
	}

	// Build JobSeeker Auth Form
	buildEmployerPassResetForm(): void {
		this.employerPassResetForm = this.fb.group({
			jobseekerid: ['', [Validators.required]],
			email: ['', Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])],
			password: ['', Validators.compose([Validators.required, Validators.minLength(8)]), this.isPatternMatch.bind(this)],
			verify: ['', [Validators.required]],
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

	getUserDetails(userId) {
		this.busy = this._httpService.getUserDetails(userId)
			.subscribe(
				response => {
					if (response.success) {
						this.employerPassResetForm.patchValue({
							jobseekerid: response.jobseeker._id,
							email: response.jobseeker.email,
						})

					} else if (!response.success) {
						console.log(response);
					}
				},
				error => {
					console.log(error);
				}
			);
	}

	onResetPassword() {
		if (!this.employerPassResetForm.valid) return false;
		this.busy = this._httpService.resetPassword(this.employerPassResetForm.value)
			.subscribe(
				response => {
					if (response.success) {
						this.resetemployerPassResetForm.resetForm();
						setTimeout(() => {
							this.router.navigate(['auth/login']);
						}, 2000);
						let snackBarRef = this.snackBar.open('Your Password Updated Successfully.', 'Login', {
							duration: 5000,
						});
						snackBarRef.onAction().subscribe(() => {
							snackBarRef.dismiss();
							this.router.navigate(['auth/login']);
							console.log('The snack-bar action was triggered!');
						});

					} else if (!response.success) {

						setTimeout(() => {
							this.resetemployerPassResetForm.resetForm();
						}, 3000);
					}
				},
				error => {
					console.log(error);
					setTimeout(() => {
						this.resetemployerPassResetForm.resetForm();
					}, 3000);
				}
			);
	}

	ngOnInit() { }

	ngOnDestroy() {
		if (this.busy) {
			this.busy.unsubscribe();
		}
	}

}
