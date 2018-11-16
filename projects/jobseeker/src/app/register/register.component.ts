import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatRadioChange, MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';
import { TermsConditionsDialogComponent } from '../terms-conditions-dialog/terms-conditions-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ApiCallService } from '../services/api-call.service';
import { Subscription } from 'rxjs';
import { FormGroupDirective, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ConfigService } from '../services/config.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

	public hide = true;
	public rehide = true;
	public passwordPatternError;

	jobSeekerRegForm: FormGroup;
	@ViewChild(FormGroupDirective) resetJobSeekerRegForm;
	emailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	//busy Config
	busy: Subscription;

	// Doc Upload
	showUpload = true;
	uploaded = false;
	public docName;

	// @ViewChild('docFileInput') myIdProofInputVariable: ElementRef;

	isSuccessMsg: string;
	isErrorMsg: string;

	// public is_spr: boolean = false;
	// public accept_terms: String;
	// public terms: any = `<div><p><b><u>Terms &amp; Conditions For Temporary Work (Contract For Services)</u></b></p><p><b><u>Definitions</u></b></p><p>Employment Business - means Ooget Pte Ltd</p><p>Client - means the person, firm or corporate body or unincorporated entity requiring the services of the temporary worker. </p><p>Temporary Worker - means &#34;You&#34; supplied by the employment business to provide services to client.</p><p>Assignment - means the period during which the temporary worker is supplied by the employment business to provide services to the client.</p><p><b><u>1. Commencement of employment</u></b></p><p>For the below conditions, these are made known in the job description prior to your application and you are deemed as agreed to it when you apply for the job electronically. A notification will be sent to you if you are confirmed for the job.<br/></p><ol><li>Your employment will commence on. </li><li>Place of work.</li><li>Job title.</li><li>Your duties.</li><li>Pay rate.</li><li>Work schedule. </li><li>Overtime rule (what the normal hours per day).</li></ol><p>In addition to the duties specified &#34;above&#34;, you are obliged to follow all reasonable instructions of the client, the management of the client, or the designated supervisor.</p><p>You are required to faithfully, diligently, and competently execute the tasks and duties assigned to you. You are also required to comply with the client’s code of conduct or company policy and act in the best interests of the client at all times.</p><p><b><u>2. Salary</u></b></p><ul><li>Your salary will be paid in a bi-weekly basis and it will be paid on every 18<sup>th </sup>(e.g. day 1 to 14) of the month and 3<sup>rd</sup> (e.g. day 15 – 31) of the following month.</li></ul><p><b><u>3. Timesheets</u></b></p><p><b><u></u></b></p><p><b></b></p><ul><li><b></b>You are required to login into Ooget mobile application and update your daily attendance twice (start work and end work) and this will serve as your timesheets for the work you have worked for the client and for Ooget to compute your salary.</li><li>For the avoidance of doubt and for the purposes of the working time regulations, your working time shall only consist of those periods during which you are carrying out activities or duties for the client as part of the service. Time spent travelling to the client’s premises, meal breaks and other rest breaks shall not count as part of your working time for these purposes. </li><li>Ooget shall pay you for all hours worked regardless of whether the Ooget has received payment from the client for those hours. </li></ul><p><b><u>4. Working Days &amp; Hours of Work</u></b></p><p><b><u></u></b></p><p><b></b></p><ul><li><b></b>You are entitled to one rest day in a week and your rest day shall be on a Sunday or any other day as may be rostered by the employer.</li></ul><ul><li>You are given meal breaks.</li></ul><p>The client reserves the right, at its sole discretion, to revise, amend or extend the working hours should the need arise.</p><p>You are obliged to commit beyond the normal workings days and hours stipulated in clause XX if the client so requires, and you will be entitled to additional remuneration or overtime pay in line with the company policy of the client / Ooget or the requirements of law.</p><p>On the 1<sup>st</sup> day of assignment commencement if you are unable to attend work you must telephone Ooget administrator to communicate the reason for absence within 1 hour of the commencement time.</p><p>Where you are absent from work due to medical reasons you must notify client designated supervisor as soon as practicable. Such notice shall be given within 1 hour of the commencement time on the first day of your absence. You must also obtain a medical certificate proving such medical reasons and provide a copy to the employer / client and / or your immediate supervisor as soon as practicable. </p><p><b><u>5. Public Holidays</u></b></p><ul><li>You are entitled to paid public holidays. Your pay for each public holiday will be computed based on the total hours of the work performed on the day and it will be paid at 2.0 times the hourly basic rate of pay for each hour of work.</li></ul><p><b><u>6. Additional Salary Payment</u></b></p><ul><li>If you work more than stipulated hours (exclude meal breaks) of work per day, you will be entitled to overtime pay at 1.5 times the hourly basic rate of pay for each hour of work.</li></ul><p><b><u>7. Payment for work on Rest days</u></b></p><ul><li>You are entitled to paid rest days. Your pay for each rest day will be computed based on the total hours of the work performed on the day and it will be paid at 2.0 times the hourly basic rate of pay for each hour of work.</li></ul><p><b><u>8. Remuneration</u></b></p><ul><li>Ooget shall pay you the actual rate of pay will be notified on a per assignment basis.</li><li>The employer should not deduct any monies from your wage other than those allowed under the Employment Act.</li><li>Ooget shall deduct from your remuneration all such sums it is authorized to deduct under laws of Singapore, whether for your share of Central Provident Fund Contributions, withholding tax or otherwise.</li></ul><p><b><u>9. Termination</u></b></p><ul><li>Either party may terminate the contract of service.<b><u></u></b><ul><li>With notice given (e.g. 1 day)<b><u></u></b></li><li>Without notice by paying salary in lieu of notice for the relevant period<b><u></u></b></li></ul></li></ul><ul><li>If you have mis-conducted yourself during the course of work, such as fighting or committing theft, your employer may terminate your service without notice and without compensation.<b><u></u></b></li></ul><ul><li>If you do not inform the client that you are unable to attend work during the course of an assignment this will be treated as termination of the assignment by you unless you can show that exceptional circumstances prevented informing of the absence.</li></ul><p><u><b>10.Confidentiality</b></u></p><ul><li>Without the prior written consent of the client, you must not at any time disclose any confidential information obtained in the course of your contract of service with the client.</li></ul><ul><li>Confidential information generally refers to information not available to the public, and includes:<ul><li>Client’s client list and details;</li><li>Trade secrets;</li><li>Business plans;</li><li>Financial information;</li><li>Employee lists and details;</li><li>Information known to the employee to be confidential;</li><li>Information which may affect the competitive position of the client; and</li><li>Any information the client is obligated not to disclose.</li></ul></li></ul><ul><li>You acknowledge and agree, having had the opportunity to take legal advice thereon, that this clause XX is reasonable and necessary to protect the interests of the client.</li></ul><p><b><u>11. Intellectual Property Rights</u></b></p><ul><li>All intellectual and industrial property rights arising out of or in connection with your contract of service with the client shall immediately be assigned to and vest in the client or any other persons or entity as appointed by the client.<b><u></u></b></li></ul><ul><li>All materials, tangible or intangible, produced by you arising out of or in connection with your contract of service with the client shall be the sole and exclusive property of the client or any other persons or entity as appointed by the client.<b><u></u></b></li></ul><ul><li>You are hereby obligated to execute all documents and do all such acts and such things as may be necessary or requested by the client in order to ensure that all property rights vest exclusively in the client or any other persons or entity as pointed by the client.<b><u></u></b></li></ul><p><b><u>12. Obligations</u></b></p><ul><li>Observe any relevant rules and regulations of the client’s establishment (including normal hours of work) to which attention has been drawn or where you might reasonably be expected to ascertain.<b><u></u></b></li></ul><ul><li>Take all reasonable steps to safeguard his or her own health and safety and that of any other person who may be present or be affected by his or her actions on the assignment and comply with the health and safety policies and procedures of the client.<b><u></u></b></li></ul><ul><li>Not engage in any conduct detrimental to the interest of the client.<b><u></u></b></li></ul><ul><li>Not to use the telephone, fax, email or email or computer systems belongings to the client for personal gain or benefit.<b><u></u></b></li></ul><ul><li>On completion of the service or at any time when requested by the client or the employment business, return to the client or where appropriate, to the employment business, any client property or items provided to you in connection with or for the purpose of the assignment, including but not limited to any equipment, materials, document, swipe cards or ID cards, uniforms personal protective equipment or clothing.<b><u></u></b></li></ul><ul><li>If you are unable for any reason to attend work during the course of an assignment you should inform the client within 1 hour of the commencement of the assignment or shift and update your attendance in mobile application.<b><u></u></b></li></ul><ul><li>If, either before or during the course of an assignment, you becomes aware of any reason you may not be suitable for an assignment, you shall notify the client without delay and update your attendance in the mobile application.<b><u></u></b></li></ul> <p><b><u>13. Others</u></b></p><ul><li>Ooget shall incur no liability to you should it fail to offer assignments of the type of work or any other work.<b><u></u></b></li></ul><ul><li>If, before or during an assignment or during the relevant, the client wishes to engage you directly or through another employment business, you acknowledges that Ooget will be entitled either to charge the client a transfer fee or to agree a period of extended hire with the client at the end of which you may be engaged directly by the client or through another employment business without further charge to the client.<b><u></u></b></li></ul><ul><li>Ooget will be entitled to charge a transfer fee to the client if the client introduces you to a 3<sup>rd</sup> party who subsequently engages you within the relevant period.<b><u></u></b></li></ul><p><b><u>14. Severability</u></b></p><p>If any of the provisions of these terms shall be determined by any competent authority to be unenforceable to any extent, such provision shall, to that extent, be severed from the remaining terms, which shall continue to be valid to the fullest extent permitted by applicable laws.</p><p><b><u>15. Notices</u></b></p><p>All notices which are required to be given in accordance with this agreement shall be in writing and delivered electronically to your email. Any such notice shall be deemed to have been served when that email is sent.</p><p><b><u>16. Governing Law</u></b></p><ul><li>This agreement shall be governed by and construed in accordance with the laws of Singapore.<b><u></u></b></li></ul><ul><li>In relation to any legal action or proceedings arising out of or in connection with this offer of employment, you hereby irrevocably submit to the non-exclusive jurisdiction of the courts of Singapore.</li></ul><p></p><p></p><p></p><p></p></div>`;

	constructor(public router: Router, public dialog: MatDialog, public snackBar: MatSnackBar, private _httpService: ApiCallService, private config: ConfigService, private fb: FormBuilder) {
		this.buildJobSeekerRegForm();
	}

	// Build JobSeeker Reg Form
	buildJobSeekerRegForm(): void {
		this.jobSeekerRegForm = this.fb.group({
			username: ['', Validators.compose([Validators.required])],
			email: ['', Validators.compose([Validators.required, Validators.pattern(this.emailPattern)]), this.isEmailUnique.bind(this)],
			// password: ['', Validators.compose([Validators.required, Validators.minLength(8)]), this.isPatternMatch.bind(this)],
			password: ['', Validators.compose([Validators.required, Validators.minLength(8)]), this.isPatternMatch.bind(this)],
			verify: ['', [Validators.required]],
			country: ['', Validators.compose([Validators.required])],
			// docName: ['', Validators.compose([Validators.required])],
			accept_terms: ['true', Validators.compose([Validators.required])],
			activestatus: ['false'],
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
				this._httpService.checkEmail({ 'email': control.value }).subscribe((response) => {
					if (response.success) {
						resolve(null);
					} else {
						resolve({ 'isEmailUnique': true });
					}
				}, () => { resolve({ 'isEmailUnique': false }); });
			}, 50);
		});
	}

	// getDoc(event) {
	// 	console.log(event.target.files[0]);
	// 	this.showUpload = false;
	// 	this.uploaded = true;
	// 	this.docName = event.target.files[0].name;
	// 	this.jobSeekerRegForm.patchValue({
	// 		'docName': event.target.files[0].name
	// 	});
	// }

	// removeDoc() {
	// 	this.myIdProofInputVariable.nativeElement.value = '';
	// 	this.showUpload = true;
	// 	this.uploaded = false;
	// 	this.docName = '';
	// 	this.jobSeekerRegForm.patchValue({
	// 		'docName': ''
	// 	});
	// }

	radioChange(event: MatRadioChange) {
		if (event.value == 'false') {
			let dialogConfig = new MatDialogConfig();

			dialogConfig.disableClose = true;
			dialogConfig.autoFocus = true;
			dialogConfig.data = {
				// boxTitle:"Confirmation",
				confirmMsg: "<h4>Are You Sure ?</h4>",
				okButtonText: "Yes",
				noButtonText: "No",
				actionalign: "center"
			};
			let dialogref = this.dialog.open(ConfirmDialogComponent, dialogConfig);

			dialogref.afterClosed().subscribe(
				data => {
					// this.confirmResponse(data)
					if (data == 'yes') {
						this.router.navigate(['auth/login']);
					} else if (data == 'no') {
						// this.accept_terms = "true";
						this.jobSeekerRegForm.patchValue({
							'accept_terms': "true"
						});
						console.log('no');
					}
				}
			);
		}
	}

	openTermsConditionsDialog() {
		let dialogConfig = new MatDialogConfig();

		dialogConfig.panelClass = 'terms-conditions-dialog';
		dialogConfig.disableClose = true;
		dialogConfig.autoFocus = true;
		dialogConfig.width = '80vw';
		dialogConfig.data = {
			boxTitle: "Terms and Conditions",
			// message: this.terms,
			okButtonText: "Ok",
			actionalign: "end"
		};
		let dialog = this.dialog.open(TermsConditionsDialogComponent, dialogConfig);
	}

	onSubmitReg() {
		// console.log(this.jobSeekerRegForm.status);
		if (!this.jobSeekerRegForm.valid) return false;
		
		this.busy = this._httpService.postRegData(this.jobSeekerRegForm.value)
			.subscribe(
				response => {
					if (response.success) {
						// this.uploadProfileDocs(response.id);
						this.resetJobSeekerRegForm.resetForm();
						let snackBarRef = this.snackBar.open('You have Registered Successfully.', 'Close', {
							duration: 5000,
						});
						snackBarRef.onAction().subscribe(() => {
							snackBarRef.dismiss();
							console.log('The snack-bar action was triggered!');
						});
						console.log("Registered Successfully");
						this.router.navigate(['auth/login']);

					} else if (!response.success) {
						let snackBarRef = this.snackBar.open('Sorry! This Mail Already Registered.', 'Close', {
							duration: 5000,
						});
						snackBarRef.onAction().subscribe(() => {
							snackBarRef.dismiss();
							console.log('The snack-bar action was triggered!');
						});
					}
				},
				error => {
					console.log(error);
				}
			);
	}

	// uploadProfileDocs(userID) {
	// 	const idProof = this.myIdProofInputVariable.nativeElement;
	// 	const formData: FormData = new FormData();

	// 	if (idProof.files && idProof.files[0]) {
	// 		formData.append('jobseekeridproof', idProof.files[0]);
	// 	}

	// 	if (idProof.files[0]) {
	// 		this.busy = this._httpService.jobSeekerIdProofUpdate(formData, userID)
	// 			.subscribe(
	// 				response => {
	// 					if (response.success) {
	// 						this.showUpload = true;
	// 						this.uploaded = false;
	// 						this.docName = '';

	// 						this.router.navigate(['auth/login']);

	// 						let snackBarRef = this.snackBar.open('ID Proof Uploaded Successfully.', 'Close', {
	// 							duration: 5000,
	// 						});
	// 						snackBarRef.onAction().subscribe(() => {
	// 							snackBarRef.dismiss();
	// 							console.log('The snack-bar action was triggered!');
	// 						});
	// 					}
	// 				},
	// 				error => {
	// 					console.log(error);
	// 				}
	// 			);
	// 	}
	// }

	ngOnInit(): void {
		setTimeout(() => {
			let dialogConfig = new MatDialogConfig();

			dialogConfig.disableClose = true;
			dialogConfig.autoFocus = true;
			dialogConfig.data = {
				// boxTitle:"Confirmation",
				confirmMsg: "<h4>Are you a Singaporean / Singapore Permanent Resident ?</h4>",
				okButtonText: "Yes",
				noButtonText: "No",
				actionalign: "center"
			};
			let dialogref = this.dialog.open(ConfirmDialogComponent, dialogConfig);

			dialogref.afterClosed().subscribe(
				data => {
					console.log(data);
					if (data == "no") {
						dialogConfig.data = {
							confirmMsg: "<h3>Thank you for your interest.</h3> <p>Currently, this is only for Singaporean/SPR. <br/>Please follow us on our website for more details.</p>",
							okButtonText: "OK",
							actionalign: "center"
						};
						let dialogref = this.dialog.open(ConfirmDialogComponent, dialogConfig);

						dialogref.afterClosed().subscribe(
							data => {
								this.router.navigate(['auth/login']);
							}
						);
					} else if (data == "yes") {
						this.jobSeekerRegForm.patchValue({
							'country': "Singapore"
						});
					}
				}
			);
		});
	}
}