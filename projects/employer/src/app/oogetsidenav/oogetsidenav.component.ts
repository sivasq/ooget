import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ConfigService } from '../services/config.service';
import { Router } from '@angular/router';
import { AsyncSubscriber } from '../services/async.service';

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

	public config: PerfectScrollbarConfigInterface = {};

	public baseUrl;
	public profileImage: String;
	public UserName: String;
	public UserRole: String;
	public userEmail: String;
	public companyName: String;
	public companyCode: String;

	userprofile: boolean = true;

	navItems: NavItem[] = [
		{
			displayName: 'DevFestFL',
			iconName: 'recent_actors',
			route: 'employer/settings/viewcompany',
			children: [
				{
					displayName: 'Speakers',
					iconName: 'group',
					route: 'employer/settings/viewcompany',
				},
				{
					displayName: 'Sessions',
					iconName: 'speaker_notes',
					route: 'devfestfl/sessions',
				},
				{
					displayName: 'Feedback',
					iconName: 'feedback',
					route: 'devfestfl/feedback'
				}
			]
		},
		{
			displayName: 'Disney',
			iconName: 'videocam',
			children: [
				{
					displayName: 'Create Enterprise UIs',
					iconName: 'star_rate',
					route: 'material-design'
				},
				{
					displayName: 'What\'s up with the Web?',
					iconName: 'star_rate',
					route: 'what-up-web'
				},
				{
					displayName: 'My ally, the CLI',
					iconName: 'star_rate',
					route: 'my-ally-cli'
				},
				{
					displayName: 'Become an Angular Tailor',
					iconName: 'star_rate',
					route: 'become-angular-tailer'
				}
			]
		},
		{
			displayName: 'Orlando',
			iconName: 'movie_filter',
			children: [
				{
					displayName: 'Michael Prentice',
					iconName: 'person',
					route: 'michael-prentice',
				},
				{
					displayName: 'Create Enterprise UIs',
					iconName: 'star_rate',
					route: 'material-design'
				},
				{
					displayName: 'Stephen Fluin',
					iconName: 'person',
					route: 'stephen-fluin',
				},
				{
					displayName: 'Mike Brocchi',
					iconName: 'person',
					route: 'mike-brocchi',
				}
			]
		},
		{
			displayName: 'Sessions',
			iconName: 'speaker_notes',
			children: [
				{
					displayName: 'Create Enterprise UIs',
					iconName: 'star_rate',
					route: 'material-design'
				},
				{
					displayName: 'What\'s up with the Web?',
					iconName: 'star_rate',
					route: 'what-up-web'
				},
				{
					displayName: 'My ally, the CLI',
					iconName: 'star_rate',
					route: 'my-ally-cli'
				},
				{
					displayName: 'Become an Angular Tailor',
					iconName: 'star_rate',
					route: 'become-angular-tailer'
				}
			]
		},
		{
			displayName: 'Feedback',
			iconName: 'feedback',
			route: 'feedback'
		}
	]

	constructor(private urlconfig: ConfigService, public router: Router, private asyncSubscriber: AsyncSubscriber) {
		this.baseUrl = urlconfig.base_url;

		asyncSubscriber.getProfileDetails.subscribe(value => {
			this.companyName = localStorage.getItem('ogCompanyName');
			this.companyCode = localStorage.getItem('ogCompanyCode');
			this.userEmail = localStorage.getItem('ogUserEmail');
			// this.UserRole = localStorage.getItem('ogUserRole');
			this.UserRole = "Employer";
			let companyLogo = localStorage.getItem('ogCompanyLogo');

			if (companyLogo == null) {
				this.profileImage = "assets/img/avatars/profile-placeholder.png";
			} else {
				this.profileImage = this.baseUrl + "/ooget/user/" + companyLogo;
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
		// this.UserName = localStorage.getItem('ogUserName');
		// this.UserRole = localStorage.getItem('ogUserRole');
		this.companyName = localStorage.getItem('ogCompanyName');
		this.companyCode = localStorage.getItem('ogCompanyCode');
		this.userEmail = localStorage.getItem('ogUserEmail');
		// this.UserRole = localStorage.getItem('ogUserRole');
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
