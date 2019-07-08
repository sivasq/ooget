import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatRadioChange, MatCheckboxChange, MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';
import { TermsConditionsDialogComponent } from '../terms-conditions-dialog/terms-conditions-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ApiCallService } from '../services/api-call.service';
import { Subscription, Observable } from 'rxjs';
import { FormGroupDirective, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ConfigService } from '../services/config.service';
import { AsyncSubscriber } from '../services/async.service';
import { MockDataService } from '../services/mock-data.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

	appearance$: Observable<any>;
	Countries = [];
	public hide = true;
	public rehide = true;
	public passwordPatternError;

	jobSeekerRegForm: FormGroup;
	@ViewChild(FormGroupDirective) resetJobSeekerRegForm;
	emailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	// busy Config
	busy: Subscription;

	//  Doc Upload
	showUpload = true;
	uploaded = false;
	public docName;

	//  @ViewChild('docFileInput') myIdProofInputVariable: ElementRef;

	isSuccessMsg: string;
	isErrorMsg: string;

	constructor(public router: Router, public dialog: MatDialog, public snackBar: MatSnackBar, private _httpService: ApiCallService, private config: ConfigService, private fb: FormBuilder, private asyncSubscriber: AsyncSubscriber, private mockDataService: MockDataService) {
		this.appearance$ = asyncSubscriber.getAppearance.pipe();
		this.buildJobSeekerRegForm();
		this.getCountries();
	}

	getCountries(): void {
		this.mockDataService.getCountries()
			.subscribe(Countries => this.Countries = Countries);
	}

	//  Build JobSeeker Reg Form
	buildJobSeekerRegForm(): void {
		this.jobSeekerRegForm = this.fb.group({
			name: ['', Validators.compose([Validators.required])],
			email: ['', Validators.compose([Validators.required, Validators.pattern(this.emailPattern)]), this.isEmailUnique.bind(this)],
			//  password: ['', Validators.compose([Validators.required, Validators.minLength(8)]), this.isPatternMatch.bind(this)],
			password: ['', Validators.compose([Validators.required, Validators.minLength(8)]), this.isPatternMatch.bind(this)],
			verify: ['', [Validators.required]],
			country: ['', Validators.compose([Validators.required])],
			//  docName: ['', Validators.compose([Validators.required])],
			accept_terms: [null, Validators.compose([Validators.required])],
			recaptcha: ['', Validators.required]
		});
	}

	//  Check Password Pattern Match
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

				const regSpace = /\s/;
				if (regSpace.test(control.value)) {
					this.passwordPatternError = 'space not allowed';
					resolve({ 'isPatternMatch': true });
				}
				resolve(null);
			}, 5);
		});
	}

	//  Check Email Unique
	isEmailUnique(control: FormControl) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				this._httpService.checkUniqueEmail({ 'email': control.value }).subscribe((response) => {
					if (response.success) {
						resolve(null);
					} else {
						resolve({ 'isEmailUnique': true });
					}
				}, () => { resolve({ 'isEmailUnique': false }); });
			}, 50);
		});
	}

	//  getDoc(event) {
	//  	console.log(event.target.files[0]);
	//  	this.showUpload = false;
	//  	this.uploaded = true;
	//  	this.docName = event.target.files[0].name;
	//  	this.jobSeekerRegForm.patchValue({
	//  		'docName': event.target.files[0].name
	//  	});
	//  }

	//  removeDoc() {
	//  	this.myIdProofInputVariable.nativeElement.value = '';
	//  	this.showUpload = true;
	//  	this.uploaded = false;
	//  	this.docName = '';
	//  	this.jobSeekerRegForm.patchValue({
	//  		'docName': ''
	//  	});
	//  }

	radioChange(event: MatCheckboxChange) {
		//  console.log(event.checked);
		//  MatCheckboxChange
		//  if (event.value == 'false') {
		if (event.checked === false) {
			const dialogConfig = new MatDialogConfig();

			dialogConfig.disableClose = true;
			dialogConfig.autoFocus = true;
			dialogConfig.data = {
				//  boxTitle:'Confirmation',
				confirmMsg: '<h4>Are You Sure ?</h4>',
				okButtonText: 'Yes',
				noButtonText: 'No',
				actionalign: 'center'
			};
			const dialogref = this.dialog.open(ConfirmDialogComponent, dialogConfig);

			dialogref.afterClosed().subscribe(
				data => {
					//  this.confirmResponse(data)
					if (data === 'yes') {
						this.router.navigate(['auth/login']);
					} else if (data === 'no') {
						//  this.accept_terms = 'true';
						this.jobSeekerRegForm.patchValue({
							'accept_terms': 'true'
						});
						// console.log('no');
					}
				}
			);
		}
	}

	openTermsConditionsDialog() {
		const dialogConfig = new MatDialogConfig();

		dialogConfig.panelClass = 'terms-conditions-dialog';
		dialogConfig.disableClose = true;
		dialogConfig.autoFocus = true;
		dialogConfig.width = '80vw';
		dialogConfig.data = {
			boxTitle: 'Terms and Conditions',
			//  message: this.terms,
			okButtonText: 'Ok',
			actionalign: 'end'
		};
		const dialog = this.dialog.open(TermsConditionsDialogComponent, dialogConfig);
	}

	onSubmitReg() {
		if (!this.jobSeekerRegForm.valid) { return false; }

		this.busy = this._httpService.createJobseeker(this.jobSeekerRegForm.value)
			.subscribe(
				response => {
					if (response.success) {
						//  this.uploadProfileDocs(response.id);
						this.resetJobSeekerRegForm.resetForm();
						const snackBarRef = this.snackBar.open('You have Registered Successfully.', 'Close', {
							duration: 5000,
						});
						snackBarRef.onAction().subscribe(() => {
							snackBarRef.dismiss();
							// console.log('The snack-bar action was triggered!');
						});
						// console.log('Registered Successfully');
						this.router.navigate(['auth/login']);

					} else if (!response.success) {
						const snackBarRef = this.snackBar.open('Sorry! This Mail Already Registered.', 'Close', {
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

	//  uploadProfileDocs(userID) {
	//  	const idProof = this.myIdProofInputVariable.nativeElement;
	//  	const formData: FormData = new FormData();

	//  	if (idProof.files && idProof.files[0]) {
	//  		formData.append('jobseekeridproof', idProof.files[0]);
	//  	}

	//  	if (idProof.files[0]) {
	//  		this.busy = this._httpService.jobSeekerIdProofUpdate(formData, userID)
	//  			.subscribe(
	//  				response => {
	//  					if (response.success) {
	//  						this.showUpload = true;
	//  						this.uploaded = false;
	//  						this.docName = '';

	//  						this.router.navigate(['auth/login']);

	//  						let snackBarRef = this.snackBar.open('ID Proof Uploaded Successfully.', 'Close', {
	//  							duration: 5000,
	//  						});
	//  						snackBarRef.onAction().subscribe(() => {
	//  							snackBarRef.dismiss();
	//  							console.log('The snack-bar action was triggered!');
	//  						});
	//  					}
	//  				},
	//  				error => {
	//  					console.log(error);
	//  				}
	//  			);
	//  	}
	//  }

	ngOnInit(): void {
		setTimeout(() => {
			const dialogConfig = new MatDialogConfig();

			dialogConfig.disableClose = true;
			dialogConfig.autoFocus = true;
			dialogConfig.data = {
				//  boxTitle:'Confirmation',
				confirmMsg: '<h4>Are you a Singaporean / Singapore Permanent Resident ?</h4>',
				okButtonText: 'Yes',
				noButtonText: 'No',
				actionalign: 'center'
			};
			const dialogref = this.dialog.open(ConfirmDialogComponent, dialogConfig);

			dialogref.afterClosed().subscribe(
				data => {
					console.log(data);
					if (data === 'no') {
						dialogConfig.data = {
							confirmMsg: '<h3>Thank you for your interest.</h3> <p>Currently, this is only for Singaporean/SPR. <br/>Please follow us on our website for more details.</p>',
							okButtonText: 'OK',
							actionalign: 'center'
						};
						const dialogref = this.dialog.open(ConfirmDialogComponent, dialogConfig);

						dialogref.afterClosed().subscribe(
							data => {
								this.router.navigate(['auth/login']);
							}
						);
					} else if (data === 'yes') {
						this.jobSeekerRegForm.patchValue({
							'country': 'Singapore'
						});
					}
				}
			);
		});
	}

	ngOnDestroy() {
		if (this.busy) {
			this.busy.unsubscribe();
		}
	}
}
