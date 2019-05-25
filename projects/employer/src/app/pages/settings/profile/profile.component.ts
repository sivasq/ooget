import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { ApiCallService } from '../../../services/api-call.service';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AsyncSubscriber } from '../../../services/async.service';
import { ConfigService } from '../../../services/config.service';
import { UserRole } from '../../../classes/userRole';
import { MockDataService } from '../../../services/mock-data.service';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

	appearance$: Observable<any>;
	public Roles: UserRole[];
	busy: Subscription; // busy Config
	public hide = true;
	public rehide = true;
	public passwordPatternError;
	public baseUrl;

	public userProfile: any = {
		username: '',
		email: '',
		password: ''
	};

	public profileImage: any = 'assets/img/avatars/profile-placeholder.png';
	@ViewChild('imgFileInput') myProfileImageInputVariable: ElementRef;

	UserUpdateForm: FormGroup;
	emailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	constructor(private _httpService: ApiCallService, public snackBar: MatSnackBar, private fb: FormBuilder, private asyncSubscriber: AsyncSubscriber, private urlconfig: ConfigService, private mockDataService: MockDataService) {
		this.appearance$ = asyncSubscriber.getAppearance.pipe();
		this.baseUrl = urlconfig.base_url;
		this.buildUserUpdateForm();
		this.getProfileDetails();
		this.getUserRoles();
	}

	getUserRoles(): void {
		this.mockDataService.getUserRoles()
			.subscribe(UserRoles => this.Roles = UserRoles);
	}

	// Build Employer Add Form
	buildUserUpdateForm(): void {
		this.UserUpdateForm = this.fb.group({
			username: ['', [Validators.required]],
			role: [{ value: '', disabled: true }, [Validators.required]],
			email: ['', Validators.compose([Validators.required, Validators.pattern(this.emailPattern)]), this.isEmailUnique.bind(this)],
			password: ['', Validators.compose([Validators.required, Validators.minLength(8)]), this.isPatternMatch.bind(this)],
			verify: ['', [Validators.required]],
		});
	}

	// Check Password Pattern Match
	isPatternMatch(control: FormControl) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {

				const regAll = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%\^&*)(+=._-])/;
				if (!regAll.test(control.value)) {
					this.passwordPatternError = 'at least one number, one lowercase and one uppercase letter, one special charcter';
					resolve({ 'isPatternMatch': true });
				}

				const regNumber = /[0-9]/;
				if (!regNumber.test(control.value)) {
					this.passwordPatternError = 'password must contain at least one number (0-9)';
					resolve({ 'isPatternMatch': true });
				}

				const regSmallAlp = /[a-z]/;
				if (!regSmallAlp.test(control.value)) {
					this.passwordPatternError = 'password must contain at least one lowercase letter(a - z)';
					resolve({ 'isPatternMatch': true });
				}

				const regCapsAlp = /[A-Z]/;
				if (!regCapsAlp.test(control.value)) {
					this.passwordPatternError = 'password must contain at least one uppercase letter (A-Z)';
					resolve({ 'isPatternMatch': true });
				}

				const regSpecChar = /[!@#$%\^&*)(+=._-]/;
				if (!regSpecChar.test(control.value)) {
					this.passwordPatternError = 'password must contain at least one Special character (!@#$%\^&*)(+=._-)';
					resolve({ 'isPatternMatch': true });
				}

				let regSpace = /\s/;
				if (regSpace.test(control.value)) {
					this.passwordPatternError = 'space not allowed';
					resolve({ 'isPatternMatch': true });
				}
				resolve(null);
			}, 5);
		});
	}

	// Check Email Unique
	isEmailUnique(control: FormControl) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (this.userProfile.email !== control.value) {
					this._httpService.checkEmailExists({ 'email': control.value }).subscribe((response) => {
						if (response.success) {
							resolve(null);
						} else {
							resolve({ 'isEmailUnique': true });
						}
					}, () => {
						resolve({ 'isEmailUnique': false });
					});
				} else {
					resolve(null);
				}
			}, 50);
		});
	}

	// Profile Image Change Event
	logochange(event) {
		// console.log(event.target.files[0]);
		if (event.target.files && event.target.files[0]) {
			let reader = new FileReader();
			reader.readAsDataURL(event.target.files[0]); // read file as data url
			reader.onload = (event: any) => { // called once readAsDataURL is completed
				this.profileImage = event.target.result;
				this.uploadProfileDocs();
				// console.log(event.target.result);
			};
		}
	}

	// Get Admin Profile Details
	getProfileDetails() {
		this.busy = this._httpService.getCurrentUserProfileDetails()
			.subscribe(
				response => {
					// console.log(response);
					if (response.success) {
						let userData = response.result;
						// Profile Tab
						this.userProfile.username = userData.firstname ? userData.firstname : '';
						this.userProfile.role = userData.type ? userData.type : '';
						this.userProfile.email = userData.email ? userData.email : '';
						this.userProfile.password = userData.password ? userData.password : '';
						// Documents
						this.profileImage = userData.imgpath ? this.baseUrl + userData.imgpath : 'assets/img/avatars/profile-placeholder.png';

						// Patch Form Value
						this.UserUpdateForm.patchValue({
							'username': this.userProfile.username,
							'email': this.userProfile.email,
							'role': this.userProfile.role,
							'password': this.userProfile.password,
							'verify': this.userProfile.password,
						});

					} else if (!response.success) {
						// console.log(response);
					}
				},
				error => {
					// console.log(error);
				}
			);
	}

	// Submit handler for Employer Add
	UserUpdateSubmit() {
		if (!this.UserUpdateForm.valid) { return false; }

		this.busy = this._httpService.updateProfile(this.UserUpdateForm.value)
			.subscribe(
				response => {
					// Response is success
					if (response.success) {
						// const profileImage = this.myProfileImageInputVariable.nativeElement;

						// if (profileImage.files[0]) {
						// 	localStorage.setItem('ogUserName', this.UserUpdateForm.get('username').value);
						// 	localStorage.setItem('ogUserEmail', this.UserUpdateForm.get('email').value);
						// this.uploadProfileDocs();
						// } else {
						localStorage.setItem('ogUserName', this.UserUpdateForm.get('username').value);
						localStorage.setItem('ogUserEmail', this.UserUpdateForm.get('email').value);
						// location.reload();
						this.asyncSubscriber.setProfileDetails({ 'Image': this.profileImage });

						const snackBarRef = this.snackBar.open('Profile Updated Successfully.', 'Close', {
							duration: 5000,
						});

						snackBarRef.onAction().subscribe(() => {
							snackBarRef.dismiss();
						});
						// }
						// Response is failed
					} else if (!response.success) {
						console.log(response);
					}
				},
				error => {
					console.log(error);
				}
			);
	}

	// Update Admin Profile Pic Update
	uploadProfileDocs() {
		const profileImage = this.myProfileImageInputVariable.nativeElement;

		const formData: FormData = new FormData();

		if (profileImage.files && profileImage.files[0]) {
			formData.append('fileToUpload', profileImage.files[0]);
		}

		if (profileImage.files[0]) {
			this.busy = this._httpService.uploadCurrentUserProfilePic(formData)
				.subscribe(
					response => {
						if (response.success) {
							localStorage.setItem('ogProfileimage', response.imgpath);
							// location.reload();
							this.asyncSubscriber.setProfileDetails({ 'Image': this.profileImage });

							const snackBarRef = this.snackBar.open('Profile Updated Successfully.', 'Close', {
								duration: 5000,
							});
							snackBarRef.onAction().subscribe(() => {
								snackBarRef.dismiss();
								// console.log('The snack-bar action was triggered!');
							});
						}
					},
					error => {
						// console.log(error);
					}
				);
		}

	}

	ngOnInit() { }

}
