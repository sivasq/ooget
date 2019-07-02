import { Component, OnInit, Input, EventEmitter, ViewEncapsulation } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ConfigService } from '../services/config.service';
import { Router } from '@angular/router';
import { AsyncSubscriber } from '../services/async.service';

@Component({
	selector: 'app-oogetsidenav',
	templateUrl: './oogetsidenav.component.html',
	styleUrls: ['./oogetsidenav.component.scss'],
	// encapsulation: ViewEncapsulation.None
})
export class OogetsidenavComponent implements OnInit {

	public config: PerfectScrollbarConfigInterface = {};

	public baseUrl;
	public profileImage: String;
	public UserName: String;
	public UserRole: String;
	public userEmail: String;
	public companyName: String;
	public companyCode: String;

	userprofile: boolean = true;

	constructor(private urlconfig: ConfigService, public router: Router, private asyncSubscriber: AsyncSubscriber) {
		this.baseUrl = urlconfig.base_url;

		asyncSubscriber.getProfileDetails.subscribe(value => {
			this.companyName = localStorage.getItem('ogCompanyName');
			this.companyCode = localStorage.getItem('ogCompanyCode');
			this.userEmail = localStorage.getItem('ogUserEmail');
			this.UserName = localStorage.getItem('ogUserName');
			// this.UserRole = localStorage.getItem('ogUserRole');
			this.UserRole = localStorage.getItem('ogRole');
			let userLogo = localStorage.getItem('ogProfileimage');

			if (userLogo == null) {
				this.profileImage = 'assets/img/avatars/profile-placeholder.png';
			} else {
				this.profileImage = 'assets/img/avatars/profile-placeholder.png';
				setTimeout(() => {
					console.log('Test');
					this.profileImage = this.baseUrl + userLogo;
				}, 1000 / 60);
			}
		});
	}

	toggleshowprofile() {
		this.userprofile = !this.userprofile;
	}

	showprofile() {
		this.userprofile = true;
	}

	onLogout() {
		localStorage.clear();
		this.router.navigate(['logout']);
		console.log('Logout Success');
	}

	refreshLS() {
		// this.UserName = localStorage.getItem('ogUserName');
		// this.UserRole = localStorage.getItem('ogUserRole');
		this.companyName = localStorage.getItem('ogCompanyName');
		this.companyCode = localStorage.getItem('ogCompanyCode');
		this.userEmail = localStorage.getItem('ogUserEmail');
		this.UserName = localStorage.getItem('ogUserName');
		// this.UserRole = localStorage.getItem('ogUserRole');
		this.UserRole = localStorage.getItem('ogRole');
		let userLogo = localStorage.getItem('ogProfileimage');

		if (userLogo == null || userLogo == undefined) {
			this.profileImage = 'assets/img/avatars/profile-placeholder.png';
		} else {
			this.profileImage = this.baseUrl + userLogo;
		}
	}

	ngOnInit() {
		this.refreshLS();
	}
}
