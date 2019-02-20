import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallService } from '../services/api-call.service';
import { FormGroup, FormGroupDirective, FormBuilder, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { ConfigService } from '../services/config.service';
import { AsyncSubscriber } from '../services/async.service';

@Component({
	selector: 'app-authlogin',
	templateUrl: './authlogin.component.html',
	styleUrls: ['./authlogin.component.scss']
})
export class AuthloginComponent implements OnInit, OnDestroy {

	// set form field Appearance
	appearance$: Observable<any>;

	// Password visibility set
	hide = true;

	//Error Message
	isAuthMsg: string;

	//busy Config
	busy: Subscription;

	// Form Build
	jobseekerAuthForm: FormGroup;

	@ViewChild(FormGroupDirective) resetJobseekerAuthForm;
	emailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	constructor(public router: Router, private _httpService: ApiCallService, private config: ConfigService, private fb: FormBuilder, private asyncSubscriber: AsyncSubscriber) {

		// get value form field Appearance from service
		this.appearance$ = asyncSubscriber.getAppearance.pipe();

		this.buildJobseekerAuthForm();
	}

	// Build JobSeeker Auth Form
	buildJobseekerAuthForm(): void {
		this.jobseekerAuthForm = this.fb.group({
			email: ['', Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])],
			password: ['', Validators.compose([Validators.required])],
		})
	}

	//Submit form
	onAuthCheck() {
		if (!this.jobseekerAuthForm.valid) return false;

		this.busy = this._httpService.postLoginData(this.jobseekerAuthForm.value)
			.subscribe(
				async response => {
					if (response.success) {
						// Set local storages
						localStorage.setItem('isLoggedIn', "true");
						localStorage.setItem('ogToken', response.token);
						localStorage.setItem('ogUserEmail', response.jobseeker.email);
						localStorage.setItem('ogUserObjID', response.jobseeker._id);
						localStorage.setItem('ogUserName', response.jobseeker.username);
						localStorage.setItem('ogUserLogo', response.jobseekerimage);
						localStorage.setItem('ogActiveStatus', response.activestatus);

						// If Successfull Validation redirect to Dashboard or Profile
						if (response.firsttime == "true") {
							console.log("load1");
							await this.router.navigate(['main/profile']);

						} else if (response.firsttime == "false") {
							console.log("load2");
							await this.router.navigate(['main/profile']);
							// this.router.navigate(['main/dashboard']);
						}

						this.resetJobseekerAuthForm.resetForm();

					} else if (!response.success) {

						this.isAuthMsg = "Sorry! Invalid Login Credentials";
						setTimeout(() => {
							this.isAuthMsg = '';
							// this.resetJobseekerAuthForm.resetForm();
						}, 3000);
					}
				},
				error => {
					console.log(error);
					this.isAuthMsg = "Server Errors Occured! Please Try Again";
					setTimeout(() => {
						this.isAuthMsg = '';
						// this.resetJobseekerAuthForm.resetForm();
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
