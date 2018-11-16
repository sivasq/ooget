import { Component } from '@angular/core';
import { NgProgress } from '@ngx-progressbar/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, private ngProgress: NgProgress) {
		// this.matIconRegistry.addSvgIcon(
		// 	"user-silhouette",
		// 	this.domSanitizer.bypassSecurityTrustResourceUrl("assets/img/svg/user-silhouette.svg")
		// );

		this.matIconRegistry.addSvgIconSetInNamespace(
			'svgicons',
			this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/img/svg/svg_icon_set.svg')
		);
	}
}
