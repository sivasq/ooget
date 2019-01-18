import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallService } from '../services/api-call.service';
import { FormGroup, FormGroupDirective, FormBuilder, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { ConfigService } from '../services/config.service';
import { MatSnackBar } from '@angular/material';
import { AsyncSubscriber } from '../services/async.service';

@Component({
	selector: 'app-forgot-password',
	templateUrl: './forgot-password.component.html',
	styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {

	// set form field Appearance
	appearance$: Observable<any>;

	//Error Message
	isAuthMsg: string;

	//busy Config
	busy: Subscription;

	// Form Build
	jobseekerPassResetForm: FormGroup;

	@ViewChild(FormGroupDirective) resetJobseekerPassResetForm;
	emailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	constructor(public router: Router, private _httpService: ApiCallService, private config: ConfigService, private fb: FormBuilder, public snackBar: MatSnackBar, private asyncSubscriber: AsyncSubscriber) {

		// get value form field Appearance from service
		this.appearance$ = asyncSubscriber.getAppearance.pipe();

		this.buildJobseekerPassResetForm();
	}

	// Build JobSeeker Auth Form
	buildJobseekerPassResetForm(): void {
		this.jobseekerPassResetForm = this.fb.group({
			email: ['', Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])]
		})
	}

	onAuthCheck() {
		if (!this.jobseekerPassResetForm.valid) return false;
		this.busy = this._httpService.postFogotPasswordData(this.jobseekerPassResetForm.value)
			.subscribe(
				response => {
					if (response.success) {
						this.resetJobseekerPassResetForm.resetForm();
						let snackBarRef = this.snackBar.open('Your Password Sent to Your Registered EMail.', 'Login', {
							duration: 5000,
						});
						snackBarRef.onAction().subscribe(() => {
							snackBarRef.dismiss();
							this.router.navigate(['auth/login']);
							console.log('The snack-bar action was triggered!');
						});

					} else if (!response.success) {

						this.isAuthMsg = "Sorry! Invalid EMail";
						setTimeout(() => {
							this.isAuthMsg = '';
							this.resetJobseekerPassResetForm.resetForm();
						}, 3000);
					}
				},
				error => {
					console.log(error);
					this.isAuthMsg = "Server Errors Occured! Please Try Again";
					setTimeout(() => {
						this.isAuthMsg = '';
						this.resetJobseekerPassResetForm.resetForm();
					}, 3000);
				}
			);
	}

	ngOnInit() {
	}

	ngOnDestroy() {
		if (this.busy) {
			this.busy.unsubscribe();
		}
	}
}
