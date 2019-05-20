import { Component, OnInit } from '@angular/core';
import { MenuService } from './menu.service';

@Component({
	selector: 'app-sidemenu',
	templateUrl: './sidemenu.component.html',
	styleUrls: ['./sidemenu.component.scss'],
	providers: [MenuService]
})
export class SidemenuComponent implements OnInit {

	constructor(public menuService: MenuService) { }

	ngOnInit() { }

	addMenuItem(): void {
		this.menuService.add({
			state: 'menu',
			name: 'MENU',
			type: 'sub',
			icon: 'trending_flat',
			children: [
				{ state: 'menu', name: 'MENU' },
				{ state: 'timeline', name: 'MENU' }
			]
		});
	}
}
