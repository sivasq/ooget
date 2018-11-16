import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ConfigService } from '../services/config.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-oogetsidenav',
	templateUrl: './oogetsidenav.component.html',
	styleUrls: ['./oogetsidenav.component.scss']
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

	constructor(private urlconfig: ConfigService, public router: Router) {
		this.baseUrl = urlconfig.base_url;
	}

	toggleshowprofile() {
		this.userprofile = !this.userprofile;
	}

	onLogout() {
		localStorage.clear();
		this.router.navigate(['logout']);
		console.log("Logout Success");
	}

	refreshLS() {
		// this.UserName = localStorage.getItem('ogUserName');
		// this.UserRole = localStorage.getItem('ogUserRole');
		this.companyName = localStorage.getItem('ogCompanyName');
		this.companyCode = localStorage.getItem('ogCompanyCode');
		this.userEmail = localStorage.getItem('ogUserEmail');
		this.UserRole = "Employer";
		let companyLogo = localStorage.getItem('ogCompanyLogo');

		if (companyLogo == null) {
			this.profileImage = "assets/img/avatars/profile-placeholder.png";
		} else {
			this.profileImage = this.baseUrl + "/ooget/user/" + companyLogo;
		}
	}

	ngOnInit() {
		this.refreshLS();
	}
}