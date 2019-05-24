import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallService } from '../services/api-call.service';
import { FormGroup, FormGroupDirective, FormBuilder, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { ConfigService } from '../services/config.service';
import { NgxRolesService, NgxPermissionsService } from 'ngx-permissions';
import { AsyncSubscriber } from '../services/async.service';
import { ToFormDataService } from '../services/to-form-data.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-authlogin',
	templateUrl: './authlogin.component.html',
	styleUrls: ['./authlogin.component.scss']
})
export class AuthloginComponent implements OnInit {

	appearance$: Observable<any>;

	public homePageUrl;

	// Password visibility set
	public hide = true;

	// Error Message
	isAuthMsg: string;

	// busy Config
	busy: Subscription;

	adminAuthForm: FormGroup;
	@ViewChild(FormGroupDirective) resetAdminAuthForm;
	emailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	constructor(public router: Router, private _httpService: ApiCallService, private config: ConfigService, private fb: FormBuilder, private permissionsService: NgxPermissionsService, private rolesService: NgxRolesService, private asyncSubscriber: AsyncSubscriber, private toFormData: ToFormDataService) {

		this.appearance$ = asyncSubscriber.getAppearance.pipe();

		this.homePageUrl = config.homePageUrl;
		this.buildAdminAuthForm();
	}

	// Build JobSeeker Auth Form
	buildAdminAuthForm(): void {
		this.adminAuthForm = this.fb.group({
			email: ['', Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])],
			password: ['', Validators.compose([Validators.required])],
		});
	}

	onAuthCheck() {
		if (!this.adminAuthForm.valid) { return false; }

		this.busy = this._httpService.authLogin(this.adminAuthForm.value)
			.subscribe(
				async response => {
					if (response.success) {
						// Set local storages
						const apiHttpResponse = response.result;
						localStorage.setItem('isLoggedIn', 'true');
						localStorage.setItem('ogToken', apiHttpResponse.token);
						localStorage.setItem('ogUserName', `${apiHttpResponse.firstname}`);
						localStorage.setItem('ogUserEmail', apiHttpResponse.email);
						localStorage.setItem('ogProfileimage', apiHttpResponse.imgpath);
						localStorage.setItem('ogUserObjID', apiHttpResponse.id);
						localStorage.setItem('ogUserRole', apiHttpResponse.role);

						// If Successfull Validation redirect to dashboard
						await this.router.navigate(['admin/employers']);
						// Reset form
						this.resetAdminAuthForm.resetForm();

						this.permissionsService.loadPermissions(['per1', 'per2', 'per3', 'per4']);
						this.rolesService.addRole('role1', ['per1']);

					} else if (!response.success) {
						this.isAuthMsg = 'Sorry! Invalid Login Credentials';
						setTimeout(() => {
							this.isAuthMsg = '';
							// this.resetAdminAuthForm.resetForm();
						}, 3000);
					}
				},
				err => {
					this.isAuthMsg = 'Sorry! Invalid Login Credentials';
					setTimeout(() => {
						this.isAuthMsg = '';
						// this.resetAdminAuthForm.resetForm();
					}, 3000);
				}
			);
	}

	ngOnInit() { }
}
