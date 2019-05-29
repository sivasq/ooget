import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ConfigService } from '../services/config.service';
import { Router } from '@angular/router';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { TermsConditionsDialogComponent } from '../terms-conditions-dialog/terms-conditions-dialog.component';
import { AsyncSubscriber } from '../services/async.service';

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
	// public UserRole: String;
	public userEmail: String;

	userprofile: boolean = true;

	constructor(private urlconfig: ConfigService, public router: Router, public dialog: MatDialog, private asyncSubscriber: AsyncSubscriber) {
		this.baseUrl = urlconfig.base_url;

		asyncSubscriber.getProfileDetails.subscribe(value => {
			this.UserName = localStorage.getItem('ogUserName');
			this.userEmail = localStorage.getItem('ogUserEmail');
			let userLogo = localStorage.getItem('ogUserLogo');

			if (userLogo == null || userLogo == 'undefined') {
				this.profileImage = 'assets/img/avatars/profile-placeholder.png';
			} else {
				this.profileImage = 'assets/img/avatars/profile-placeholder.png';
				setTimeout(() => {
					this.profileImage = this.baseUrl + userLogo;
				}, 1000);
			}
		});
	}

	toggleshowprofile() {
		this.userprofile = !this.userprofile;
		// console.log('second');
	}

	onLogout() {
		localStorage.clear();
		this.router.navigate(['logout']);
		console.log('Logout Success');
	}

	refreshLS() {
		// this.UserName = localStorage.getItem('ogUserName');
		// this.UserRole = localStorage.getItem('ogUserRole');
		this.UserName = localStorage.getItem('ogUserName');
		this.userEmail = localStorage.getItem('ogUserEmail');
		// this.UserRole = "JobSeeker";
		let userLogo = localStorage.getItem('ogUserLogo');

		if (userLogo == null || userLogo == 'undefined') {
			this.profileImage = 'assets/img/avatars/profile-placeholder.png';
		} else {
			this.profileImage = this.baseUrl + userLogo;
		}
	}

	openTermsConditionsDialog() {
		let dialogConfig = new MatDialogConfig();

		dialogConfig.panelClass = 'terms-conditions-dialog';
		dialogConfig.disableClose = true;
		dialogConfig.autoFocus = true;
		dialogConfig.width = '80vw';
		dialogConfig.data = {
			boxTitle: 'Terms and Conditions',
			// message: this.terms,
			okButtonText: 'Ok',
			actionalign: 'end'
		};
		let dialog = this.dialog.open(TermsConditionsDialogComponent, dialogConfig);
	}

	ngOnInit() {
		this.refreshLS();
	}
}
