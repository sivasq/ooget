import { Component } from '@angular/core';
import { NgProgress } from '@ngx-progressbar/core';
import { NgxRolesService, NgxPermissionsService } from 'ngx-permissions';
import { AsyncSubscriber } from './services/async.service';
import { ApiCallService } from './services/api-call.service';

import { Event as RouterEvent, NavigationEnd, RoutesRecognized } from "@angular/router";
import { Router } from "@angular/router";
import { RouteConfigLoadEnd } from "@angular/router";
import { RouteConfigLoadStart } from "@angular/router";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {

	public isShowingRouteLoadIndicator: boolean;

	constructor(private ngProgress: NgProgress, private permissionsService: NgxPermissionsService, private rolesService: NgxRolesService, private asyncSubscriber: AsyncSubscriber, private _httpService: ApiCallService, router: Router) {

		// Load Roles and permissions
		if (localStorage.getItem('isLoggedIn') != 'null' && localStorage.getItem('isLoggedIn') == 'true') {
			let role = localStorage.getItem('ogRole');
			let permissions = JSON.parse(localStorage.getItem('ogPermissions'));
			// console.log('true');
			this.permissionsService.loadPermissions(permissions);
			this.rolesService.addRole(role, permissions);
		}
		// console.log(localStorage.getItem('isLoggedIn'));
		// Set Lazy loading Router indicator
		this.isShowingRouteLoadIndicator = false;

		// As the router loads modules asynchronously (via loadChildren), we're going to
		// keep track of how many asynchronous requests are currently active. If there is
		// at least one pending load request, we'll show the indicator.
		var asyncLoadCount = 0;

		// The Router emits special events for "loadChildren" configuration loading. We
		// just need to listen for the Start and End events in order to determine if we
		// have any pending configuration requests.

		router.events.subscribe(
			(event: RouterEvent): void => {
				// console.log(event);
				if (event instanceof RouteConfigLoadStart) {
					asyncLoadCount++;
				} else if (event instanceof RouteConfigLoadEnd) {
					asyncLoadCount--;
				} else if (event instanceof RoutesRecognized) {
					asyncLoadCount = 0;
				} else if (event instanceof NavigationEnd) {
					asyncLoadCount = 0;
				}

				// If there is at least one pending asynchronous config load request,
				// then let's show the loading indicator.
				// --
				// CAUTION: I'm using CSS to include a small delay such that this loading
				// indicator won't be seen by people with sufficiently fast connections.
				this.isShowingRouteLoadIndicator = !!asyncLoadCount;
			}
		);
	}

	// getRolesAndPermissions() {
	// 	this._httpService.getRolesAndPermissions()
	// 		.subscribe(
	// 			response => {
	// 				if (response.success) {
	// 					console.log(response);
	// 					this.permissionsService.loadPermissions(response.roles.permissions);
	// 					this.rolesService.addRole(response.roles.rolename, response.roles.permissions);
	// 					console.log(this.permissionsService.getPermissions());
	// 				} else if (!response.success) {
	// 					console.log(response);
	// 				}
	// 			},
	// 			error => {
	// 				console.log(error);
	// 			}
	// 		);
	// }
}
