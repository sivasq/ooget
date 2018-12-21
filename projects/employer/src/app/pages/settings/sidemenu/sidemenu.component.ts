import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NavService } from '../../../services/async.service';

export interface NavItem {
	displayName: string;
	disabled?: boolean;
	iconName: string;
	route?: string;
	children?: NavItem[];
}

@Component({
	selector: 'app-sidemenu',
	templateUrl: './sidemenu.component.html',
	styleUrls: ['./sidemenu.component.scss'],
	animations: [
		trigger('indicatorRotate', [
			state('collapsed', style({ transform: 'rotate(0deg)' })),
			state('expanded', style({ transform: 'rotate(180deg)' })),
			transition('expanded <=> collapsed',
				animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
			),
		])
	]
})
export class SidemenuComponent implements OnInit {

	expanded: boolean;
	@HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
	@Input() item: NavItem;
	@Input() depth: number;

	constructor(public navService: NavService, public router: Router) {
		if (this.depth === undefined) {
			this.depth = 0;
		}
	}

	ngOnInit() {
		this.navService.currentUrl.subscribe((url: string) => {
			if (this.item.route && url) {
				// console.log(`Checking '/${this.item.route}' against '${url}'`);
				this.expanded = url.indexOf(`/${this.item.route}`) === 0;
				this.ariaExpanded = this.expanded;
				// console.log(`${this.item.route} is expanded: ${this.expanded}`);
			}
		});
	}

	onItemSelected(item: NavItem) {
		console.log(item);
		if (!item.children || !item.children.length) {
			this.router.navigate([item.route]);
			this.navService.closeNav();
		}
		if (item.children && item.children.length) {
			this.expanded = !this.expanded;
		}
	}

}
