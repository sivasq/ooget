import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallService } from '../services/api-call.service';
import { FormGroup, FormGroupDirective, FormBuilder, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { ConfigService } from '../services/config.service';
import { NgxRolesService, NgxPermissionsService } from 'ngx-permissions';
import { AsyncSubscriber } from '../services/async.service';

// export class Book {
// 	public constructor(init?: Partial<Book>) {
// 		Object.assign(this, init);
// 	}
// }

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

	constructor(public router: Router, private _httpService: ApiCallService, private config: ConfigService, private fb: FormBuilder, private permissionsService: NgxPermissionsService, private rolesService: NgxRolesService, private asyncSubscriber: AsyncSubscriber) {

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

		this.busy = this._httpService.postLoginData(this.adminAuthForm.value)
			.subscribe(
				async response => {
					if (response.success) {
						// Set local storages
						localStorage.setItem('isLoggedIn', 'true');
						localStorage.setItem('ogToken', response.token);
						localStorage.setItem('ogUserName', response.admin.username);
						localStorage.setItem('ogUserEmail', response.admin.email);
						localStorage.setItem('ogProfileimage', response.admin.adminimage);
						localStorage.setItem('ogUserObjID', response.admin._id);
						localStorage.setItem('ogUserRole', 'HR');

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
				error => {
					console.log(error);
					this.isAuthMsg = 'Server Errors Occured! Please Try Again';
					setTimeout(() => {
						this.isAuthMsg = '';
						// this.resetAdminAuthForm.resetForm();
					}, 3000);
				}
			);
	}

	ngOnInit() { }
}
