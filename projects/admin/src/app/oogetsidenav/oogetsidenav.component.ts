import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ConfigService } from '../services/config.service';
import { Router } from '@angular/router';
import { AsyncSubscriber } from '../services/async.service';
import { Observable } from 'rxjs';

export interface NavItem {
	displayName: string;
	disabled?: boolean;
	iconName: string;
	route?: string;
	children?: NavItem[];
}

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

	appearance$: Observable<any>;

	navItems: NavItem[] = [
		{
			displayName: 'Settings',
			iconName: 'settings',
			route: 'admin',
			children: [
				{
					displayName: 'Holidays',
					iconName: 'work_off',
					route: '/admin/holidays',
				},
				{
					displayName: 'Jobseeker T&C',
					iconName: 'contact_support',
					route: '/admin/jobseekers/t&c',
				}
			]
		},
		{
			displayName: 'Reports',
			iconName: 'chrome_reader_mode',
			children: [
				{
					displayName: 'JobSeeker Timesheet',
					iconName: 'access_time',
					route: '/admin/reports/jstr'
				},
				{
					displayName: 'Employer Charges',
					iconName: 'monetization_on',
					route: '/admin/reports/cter'
				},
				{
					displayName: 'Admin Payment',
					iconName: 'monetization_on',
					route: '/admin/reports/apr'
				},
				{
					displayName: 'Work & Off Days',
					iconName: 'work_off',
					children: [
						{
							displayName: 'Calendar View',
							iconName: 'calendar_today',
							route: '/admin/reports/wocvr'
						},
						{
							displayName: 'Matrix View',
							iconName: 'table_chart',
							route: '/admin/reports/womvr'
						}
					]
				}
			]
		},
		{
			displayName: 'FAQ',
			iconName: 'feedback',
			route: '/admin/faq'
		}
	]

	constructor(private configService: ConfigService, public router: Router, private urlconfig: ConfigService, private asyncSubscriber: AsyncSubscriber) {
		this.baseUrl = configService.base_url;
		this.imgBaseUrl = urlconfig.img_base_url;

		// this.appearance$ = asyncSubscriber.getAppearance.pipe();
		asyncSubscriber.getProfileDetails.subscribe(value => {
			this.UserName = localStorage.getItem('ogUserName');
			this.UserRole = localStorage.getItem('ogUserRole');
			let userimage = localStorage.getItem('ogProfileimage');
			if (userimage == null || userimage == "undefined") {
				this.profileImage = "assets/img/avatars/profile-placeholder.png";
			} else {
				this.profileImage = this.imgBaseUrl + "/admin/" + userimage;
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
