import { Component, Input, Output, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { TopProfiledialogComponent } from '../top-profiledialog/top-profiledialog.component';
import { TopShortcutdialogComponent } from '../top-shortcutdialog/top-shortcutdialog.component';
import { ConfigService } from '../services/config.service';
import { Router } from '@angular/router';
// import { AsyncLocalStorage } from 'angular-async-local-storage';

@Component({
	selector: 'app-oogettopbar',
	templateUrl: './oogettopbar.component.html',
	styleUrls: ['./oogettopbar.component.scss']
})
export class OogettopbarComponent implements OnInit {

	@Output() navToggle = new EventEmitter<boolean>();
	@Output() navOpen = new EventEmitter<boolean>();

	@Output() toggleProfile = new EventEmitter<boolean>();
	@Output() showProfile = new EventEmitter<boolean>();

	public baseUrl;
	public profileImage: String;
	public UserName: String;
	public UserRole: String;

	constructor(public dialog: MatDialog, private configService: ConfigService, public router: Router) {//, protected localStorage: AsyncLocalStorage) {
		// let UserName = localStorage.getItem('UserName');
		this.UserName = "Human Resources";
		// GOPI CHANGED
		// let UserRole = localStorage.getItem('UserRole');
		this.UserRole = "Super Admin";
		let userimage = null;//localStorage.getItem('profileimage');
		if (userimage == null) {
			this.profileImage = "assets/img/avatars/admin.png";
		} else {
			this.profileImage = this.baseUrl + "/ooget/user/" + userimage;
		}
	}

	togglemainNav() {
		this.navToggle.emit(true);
	}

	toggleuserprofile() {
		this.toggleProfile.emit(true);
		this.navOpen.emit(true);
	}

	onLogout() {
		localStorage.clear();
		this.router.navigate(['logout']);
		console.log("Logout Success");
	}

	openTopProfileDialog() {
		this.dialog.open(TopProfiledialogComponent, {
			panelClass: 'top-profile-dialog',
			data: {
				profileImage: this.profileImage,
				UserName: this.UserName,
				UserRole: this.UserRole
			}
		});
	}

	openTopApplicationDialog() {
		this.dialog.open(TopShortcutdialogComponent, {
			panelClass: 'top-shortcut-dialog',
		});
	}

	ngOnInit() {
	}
}
