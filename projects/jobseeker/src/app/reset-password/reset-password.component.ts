import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiCallService } from '../services/api-call.service';
import { FormGroup, FormGroupDirective, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ConfigService } from '../services/config.service';
import { MatSnackBar } from '@angular/material';

@Component({
	selector: 'app-reset-password',
	templateUrl: './reset-password.component.html',
	styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

	public hide = true;
	public rehide = true;

	isValidUrl: boolean;

	//busy Config
	busy: Subscription;

	jobseekerPassResetForm: FormGroup;
	@ViewChild(FormGroupDirective) resetJobseekerPassResetForm;
	emailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	constructor(public router: Router, private _httpService: ApiCallService, private config: ConfigService, private fb: FormBuilder, public snackBar: MatSnackBar, private route: ActivatedRoute, ) {

		this.buildJobseekerPassResetForm();

		this.getUserDetails({ jobseekerid: this.route.snapshot.params['userId'] });
	}

	// Build JobSeeker Auth Form
	buildJobseekerPassResetForm(): void {
		this.jobseekerPassResetForm = this.fb.group({
			jobseekerid: ['', [Validators.required]],
			email: ['', Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])],
			password: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
			verify: ['', [Validators.required]],
		})
	}

	getUserDetails(userId) {
		this.busy = this._httpService.getUserDetails(userId)
			.subscribe(
				response => {
					if (response.success) {
						this.jobseekerPassResetForm.patchValue({
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
		if (!this.jobseekerPassResetForm.valid) return false;
		this.busy = this._httpService.resetPassword(this.jobseekerPassResetForm.value)
			.subscribe(
				response => {
					if (response.success) {
						this.resetJobseekerPassResetForm.resetForm();
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
							this.resetJobseekerPassResetForm.resetForm();
						}, 3000);
					}
				},
				error => {
					console.log(error);
					setTimeout(() => {
						this.resetJobseekerPassResetForm.resetForm();
					}, 3000);
				}
			);
	}

	ngOnInit() { }

}
