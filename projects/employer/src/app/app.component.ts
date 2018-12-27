import { Component } from '@angular/core';
import { NgProgress } from '@ngx-progressbar/core';
import { NgxRolesService, NgxPermissionsService } from 'ngx-permissions';
import { AsyncSubscriber } from './services/async.service';
import { ApiCallService } from './services/api-call.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {

	constructor(private ngProgress: NgProgress, private permissionsService: NgxPermissionsService, private rolesService: NgxRolesService, private asyncSubscriber: AsyncSubscriber, private _httpService: ApiCallService, ) {

		this.permissionsService.loadPermissions(['create','view','edit','delete']);
		this.rolesService.addRole('superemployer', ['create', 'view', 'edit', 'delete']);

		if (localStorage.getItem('isLoggedIn')) {
			// logged in so return true
			// this.getRolesAndPermissions();
		}
	}

	getRolesAndPermissions() {
		this._httpService.getRolesAndPermissions()
			.subscribe(
				response => {
					if (response.success) {
						console.log(response);
						this.permissionsService.loadPermissions(response.roles.permissions);
						this.rolesService.addRole(response.roles.rolename, response.roles.permissions);
						console.log(this.permissionsService.getPermissions());
					} else if (!response.success) {
						console.log(response);
					}
				},
				error => {
					console.log(error);
				}
			);
	}
}
