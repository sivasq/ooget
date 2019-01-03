import { Component } from '@angular/core';
import { NgProgress } from '@ngx-progressbar/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

import { Event as RouterEvent } from "@angular/router";
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

	constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, private ngProgress: NgProgress, router: Router) {
		// this.matIconRegistry.addSvgIcon(
		// 	"user-silhouette",
		// 	this.domSanitizer.bypassSecurityTrustResourceUrl("assets/img/svg/user-silhouette.svg")
		// );

		this.matIconRegistry.addSvgIconSetInNamespace(
			'svgicons',
			this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/img/svg/svg_icon_set.svg')
		);

		// Set Lazy loading indicator
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
				if (event instanceof RouteConfigLoadStart) {
					asyncLoadCount++;
				} else if (event instanceof RouteConfigLoadEnd) {
					asyncLoadCount--;
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
}
