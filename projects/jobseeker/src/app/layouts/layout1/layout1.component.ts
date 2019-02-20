import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-layout1',
	templateUrl: './layout1.component.html',
	styleUrls: ['./layout1.component.scss']
})
export class Layout1Component implements OnInit {

	constructor(private router: Router) {
		if (localStorage.getItem('isLoggedIn')) {
			this.router.navigate(['main/profile']);
		}
	}

	ngOnInit() {
	}

}
