import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-layout',
	templateUrl: './auth-layout.component.html',
	styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnInit {

	constructor(private router: Router) {
		if (localStorage.getItem('isLoggedIn')) {
			this.router.navigate(['main/profile']);
		}
	}

	ngOnInit() {
	}

}
