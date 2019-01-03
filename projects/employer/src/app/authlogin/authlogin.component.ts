import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallService } from '../services/api-call.service';
import { FormGroup, FormGroupDirective, FormBuilder, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { ConfigService } from '../services/config.service';
import { NgxPermissionsService, NgxRolesService } from 'ngx-permissions';
import { AsyncSubscriber } from '../services/async.service';

@Component({
	selector: 'app-authlogin',
	templateUrl: './authlogin.component.html',
	styleUrls: ['./authlogin.component.scss']
})
export class AuthloginComponent implements OnInit {
	public homePageUrl;
	appearance$: Observable<any>;
	// Password visibility set
	public hide = true;
	//Error Message
	isAuthMsg: string;

	//busy Config
	busy: Subscription;

	employerAuthForm: FormGroup;
	@ViewChild(FormGroupDirective) resetEmployerAuthForm;
	emailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	constructor(public router: Router, private _httpService: ApiCallService, private config: ConfigService, private fb: FormBuilder, private permissionsService: NgxPermissionsService, private rolesService: NgxRolesService, private asyncSubscriber: AsyncSubscriber) {

		this.appearance$ = asyncSubscriber.getAppearance.pipe();

		this.homePageUrl = config.homePageUrl;
		this.buildEmployerAuthForm();
	}

	// Build JobSeeker Auth Form
	buildEmployerAuthForm(): void {
		this.employerAuthForm = this.fb.group({
			email: ['', Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])],
			password: ['', Validators.compose([Validators.required])],
		})
	}

	onAuthCheck() {
		if (!this.employerAuthForm.valid) return false;
		this.busy = this._httpService.postLoginData(this.employerAuthForm.value)
			.subscribe(
				async response => {
					if (response.success) {
						// Set local storages
						localStorage.setItem('isLoggedIn', "true");
						localStorage.setItem('ogToken', response.token);
						localStorage.setItem('ogUserEmail', response.employer.email);
						localStorage.setItem('ogUserName', response.employer.username);
						localStorage.setItem('ogDefaultEmployer', response.employer.defaultemployer);
						localStorage.setItem('ogUserObjID', response.employer._id);
						localStorage.setItem('ogCompanyObjID', response.employer.company._id);
						localStorage.setItem('ogCompanyName', response.employer.company.companyname);
						localStorage.setItem('ogCompanyCode', response.employer.company.companycode);

						// Set Roles
						localStorage.setItem('ogRole', response.employer.role.rolename);
						localStorage.setItem('ogPermissions', JSON.stringify(response.employer.role.permissions));

						//Load Roles and Permissions
						this.permissionsService.loadPermissions(response.employer.role.permissions);
						this.rolesService.addRole(response.employer.role.rolename, response.employer.role.permissions);

						// If Auth Success, redirect to Main Page
						await this.router.navigate(['employer/jobs/list']);
						// Reset form
						this.resetEmployerAuthForm.resetForm();

					} else if (!response.success) {

						this.isAuthMsg = "Sorry! Invalid Login Credentials";

						setTimeout(() => {
							this.isAuthMsg = '';
							// this.resetEmployerAuthForm.resetForm();
						}, 3000);
					}
				},
				error => {
					console.log(error);
					this.isAuthMsg = "Server Errors Occured! Please Try Again";
					setTimeout(() => {
						this.isAuthMsg = '';
						// this.resetEmployerAuthForm.resetForm();
					}, 3000);
				}
			);
	}

	ngOnInit() { }
}
