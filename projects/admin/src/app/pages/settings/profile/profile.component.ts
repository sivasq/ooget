import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApiCallService } from '../../../services/api-call.service';
import { ConfigService } from '../../../services/config.service';
import { MatSnackBar, MatTabChangeEvent } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { AsyncSubscriber } from '../../../services/async.service';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

	appearance$: Observable<any>;

	busy: Subscription; //busy Config
	public hide = true;
	public rehide = true;
	public passwordPatternError;

	@Input() selectedIndex: number | null;
	currentlyActiveIndexTab: number | null = 0;

	public adminProfile: any = {
		username: '',
		email: '',
		password: ''
	}
	public imgBaseUrl;

	public homePageContent: any = {
		title: '',
		subtitle: '',
		list1: '',
		list2: '',
		list3: '',
		list4: ''
	}

	public featuredEmployers: any[] = [];

	public profileImage: any = 'assets/img/avatars/profile-placeholder.png';
	@ViewChild('imgFileInput') myProfileImageInputVariable: ElementRef;

	adminProfileForm: FormGroup;
	homePageContentForm: FormGroup;

	emailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	constructor(private fb: FormBuilder, private _httpService: ApiCallService, private urlconfig: ConfigService, public snackBar: MatSnackBar, private route: ActivatedRoute, private asyncSubscriber: AsyncSubscriber) {

		this.appearance$ = asyncSubscriber.getAppearance.pipe();

		this.imgBaseUrl = urlconfig.img_base_url;

		this.buildAdminProfileForm();
		this.buildHomePageContentForm();

		this.getProfileDetails();
		this.getHomePageContents();
		this.getFeaturedEmployers();
	}

	buildAdminProfileForm(): void {
		this.adminProfileForm = this.fb.group({
			// Profile Details
			username: ['', Validators.compose([Validators.required])],
			email: ['', Validators.compose([Validators.required, Validators.pattern(this.emailPattern)]), this.isEmailUnique.bind(this)],
			password: ['', Validators.compose([Validators.required, Validators.minLength(8)]), this.isPatternMatch.bind(this)],
			verify: ['', [Validators.required]],
		})
	}

	buildHomePageContentForm(): void {
		this.homePageContentForm = this.fb.group({
			// Profile Details
			title: ['', Validators.compose([Validators.required])],
			subtitle: ['', Validators.compose([Validators.required])],
			list1: [''],
			list2: [''],
			list3: [''],
			list4: [''],
		})
	}

	// Check Password Pattern Match
	isPatternMatch(control: FormControl) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {

				let regAll = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%\^&*)(+=._-])/;
				if (!regAll.test(control.value)) {
					this.passwordPatternError = "at least one number, one lowercase and one uppercase letter, one special charcter";
					resolve({ 'isPatternMatch': true });
				}

				let regNumber = /[0-9]/;
				if (!regNumber.test(control.value)) {
					this.passwordPatternError = "password must contain at least one number (0-9)";
					resolve({ 'isPatternMatch': true });
				}

				let regSmallAlp = /[a-z]/;
				if (!regSmallAlp.test(control.value)) {
					this.passwordPatternError = "password must contain at least one lowercase letter(a - z)";
					resolve({ 'isPatternMatch': true });
				}

				let regCapsAlp = /[A-Z]/;
				if (!regCapsAlp.test(control.value)) {
					this.passwordPatternError = "password must contain at least one uppercase letter (A-Z)";
					resolve({ 'isPatternMatch': true });
				}

				let regSpecChar = /[!@#$%\^&*)(+=._-]/;
				if (!regSpecChar.test(control.value)) {
					this.passwordPatternError = "password must contain at least one Special character (!@#$%\^&*)(+=._-)";
					resolve({ 'isPatternMatch': true });
				}

				var regSpace = /\s/;
				if (regSpace.test(control.value)) {
					this.passwordPatternError = "space not allowed";
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
				if (this.adminProfile.email != control.value) {
					this._httpService.checkAdminEmail({ 'email': control.value }).subscribe((response) => {
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

	// set currently active tab index
	tabChanged(tabChangeEvent: MatTabChangeEvent): void {
		this.currentlyActiveIndexTab = tabChangeEvent.index;
	}

	// Profile Image Change Event
	logochange(event) {
		// console.log(event.target.files[0]);
		if (event.target.files && event.target.files[0]) {
			var reader = new FileReader();
			reader.readAsDataURL(event.target.files[0]); // read file as data url
			reader.onload = (event: any) => { // called once readAsDataURL is completed
				this.profileImage = event.target.result;
				// console.log(event.target.result);
				// this.asyncSubscriber.setProfileDetails({ "Image": this.profileImage })
			}
		}
	}

	// Get Admin Profile Details
	getProfileDetails() {
		this.busy = this._httpService.getAdminProfileDetails()
			.subscribe(
				response => {
					// console.log(response);
					if (response.success) {
						// Profile Tab
						this.adminProfile.username = response.message.username ? response.message.username : '';
						this.adminProfile.email = response.message.email ? response.message.email : '';
						this.adminProfile.password = response.message.password ? response.message.password : '';
						// Documents
						this.profileImage = response.message.adminimage ? this.imgBaseUrl + '/admin/' + response.message.adminimage : 'assets/img/avatars/profile-placeholder.png';

						// Patch Form Value
						this.adminProfileForm.patchValue({
							'username': this.adminProfile.username,
							'email': this.adminProfile.email,
							'password': this.adminProfile.password,
							'verify': this.adminProfile.password,
						})

					} else if (!response.success) {
						// console.log(response);
					}
				},
				error => {
					// console.log(error);
				}
			);
	}

	// Update Admin Profile Datas
	adminProfileUpdate() {
		if (!this.adminProfileForm.valid) return false;
		console.log(this.adminProfileForm.value);

		this.busy = this._httpService.adminProfileUpdate(this.adminProfileForm.value)
			.subscribe(
				response => {
					if (response.success) {
						let profileImage = this.myProfileImageInputVariable.nativeElement;

						if (profileImage.files[0]) {
							localStorage.setItem('ogUserName', this.adminProfileForm.get('username').value);
							localStorage.setItem('ogUserEmail', this.adminProfileForm.get('email').value);
							this.uploadProfileDocs();
						} else {
							localStorage.setItem('ogUserName', this.adminProfileForm.get('username').value);
							localStorage.setItem('ogUserEmail', this.adminProfileForm.get('email').value);
							// location.reload();
							this.asyncSubscriber.setProfileDetails({ "Image": this.profileImage });

							let snackBarRef = this.snackBar.open('Profile Updated Successfully.', 'Close', {
								duration: 5000,
							});

							snackBarRef.onAction().subscribe(() => {
								snackBarRef.dismiss();
							});
						}
					} else if (!response.success) {
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
			formData.append('adminimage', profileImage.files[0]);
		}

		if (profileImage.files[0]) {
			this.busy = this._httpService.uploadAdminProfilePic(formData)
				.subscribe(
					response => {
						if (response.success) {
							localStorage.setItem('ogProfileimage', response.adminimage);
							// location.reload();
							this.asyncSubscriber.setProfileDetails({ "Image": this.profileImage });

							let snackBarRef = this.snackBar.open('Profile and Documents Updated Successfully.', 'Close', {
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

	// Get Home Page Contents
	getHomePageContents() {
		this.busy = this._httpService.getHomePageContents()
			.subscribe(
				response => {
					// console.log(response);
					if (response.success) {
						// Profile Tab
						this.homePageContent.title = response.message.title ? response.message.title : '';
						this.homePageContent.subtitle = response.message.subtitle ? response.message.subtitle : '';
						this.homePageContent.list1 = response.message.list1 ? response.message.list1 : '';
						this.homePageContent.list2 = response.message.list2 ? response.message.list2 : '';
						this.homePageContent.list3 = response.message.list3 ? response.message.list3 : '';
						this.homePageContent.list4 = response.message.list4 ? response.message.list4 : '';

						// Patch Form Value
						this.homePageContentForm.patchValue({
							'title': this.homePageContent.title,
							'subtitle': this.homePageContent.subtitle,
							'list1': this.homePageContent.list1,
							'list2': this.homePageContent.list2,
							'list3': this.homePageContent.list3,
							'list4': this.homePageContent.list4,
						})

					} else if (!response.success) {
						// console.log(response);
					}
				},
				error => {
					// console.log(error);
				}
			);
	}

	// Update Home Page Contents
	homePageContentUpdate() {
		// Check Employment Type And process Past Exp
		if (!this.homePageContentForm.valid) return false;

		console.log(this.adminProfileForm.value);

		this.busy = this._httpService.homePageContentUpdate(this.homePageContentForm.value)
			.subscribe(
				response => {
					if (response.success) {

						let snackBarRef = this.snackBar.open('Home Page Contents Updated Successfully.', 'Close', {
							duration: 5000,
						});

						snackBarRef.onAction().subscribe(() => {
							snackBarRef.dismiss();
						});
					}
				},
				error => {
					console.log(error);
				}
			);
	}

	// Get Featured Employers
	getFeaturedEmployers() {
		this.busy = this._httpService.getFeaturedEmployers()
			.subscribe(
				response => {
					// console.log(response);
					if (response.success) {
						this.featuredEmployers = response.message;
						// console.log(this.featuredEmployers);

					} else if (!response.success) {
						// console.log(response);
					}
				},
				error => {
					// console.log(error);
				}
			);
	}

	// Remove Featured Employer
	removeFeaturedEmployer(featuredEmployerId, itemindex) {
		// console.log(featuredEmployerId);
		this.busy = this._httpService.removeFeaturedEmployer({ "featuredimageid": featuredEmployerId })
			.subscribe(
				response => {
					// console.log(response);
					if (response.success) {
						this.featuredEmployers.splice(itemindex, 1);

					} else if (!response.success) {
						// console.log(response);
					}
				},
				error => {
					// console.log(error);
				}
			);
	}

	// Once add Featured Employer
	onFileComplete(data: any) {
		// console.log(data.message); // We just print out data bubbled up from event emitter.
		this.featuredEmployers.push(data.message[0]);
	}

	ngOnInit() {
	}

}
