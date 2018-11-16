import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ConfigService } from '../services/config.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-oogetsidenav',
	templateUrl: './oogetsidenav.component.html',
	styleUrls: ['./oogetsidenav.component.scss']
})
export class OogetsidenavComponent implements OnInit {
	public baseUrl;
	public imgBaseUrl;
	public config: PerfectScrollbarConfigInterface = {};
	public userprofile: boolean;
	public profileImage: String;
	public UserName: String;
	public UserRole: String;

	constructor(private configService: ConfigService, public router: Router, private urlconfig: ConfigService, ) {
		this.baseUrl = configService.base_url;
		this.imgBaseUrl = urlconfig.img_base_url;
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
		console.log("Logout Success");
	}

	refreshLS() {
		this.UserName = localStorage.getItem('ogUserName');
		this.UserRole = localStorage.getItem('ogUserRole');
		let userimage = localStorage.getItem('ogProfileimage');
		if (userimage == null || userimage == "undefined") {
			this.profileImage = "assets/img/avatars/profile-placeholder.png";
		} else {
			this.profileImage = this.imgBaseUrl + "/admin/" + userimage;
		}
	}

	ngOnInit() {
		this.userprofile = true;
		this.refreshLS();
	}
}