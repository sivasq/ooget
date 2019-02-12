import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiCallService } from '../../../services/api-call.service';
import { MatSnackBar } from '@angular/material';

@Component({
	selector: 'app-js-terms-and-conditions',
	templateUrl: './js-terms-and-conditions.component.html',
	styleUrls: ['./js-terms-and-conditions.component.scss']
})
export class JsTermsAndConditionsComponent implements OnInit {
	public terms: any = '';
	public terms1: any = `<div><p><b><u>Terms &amp; Conditions For Temporary Work (Contract For Services)</u></b></p><p><b><u>Definitions</u></b></p><p>Employment Business - means Ooget Pte Ltd</p><p>Client - means the person, firm or corporate body or unincorporated entity requiring the services of the temporary worker. </p><p>Temporary Worker - means &#34;You&#34; supplied by the employment business to provide services to client.</p><p>Assignment - means the period during which the temporary worker is supplied by the employment business to provide services to the client.</p><p><b><u>1. Commencement of employment</u></b></p><p>For the below conditions, these are made known in the job description prior to your application and you are deemed as agreed to it when you apply for the job electronically. A notification will be sent to you if you are confirmed for the job.<br/></p><ol><li>Your employment will commence on. </li><li>Place of work.</li><li>Job title.</li><li>Your duties.</li><li>Pay rate.</li><li>Work schedule. </li><li>Overtime rule (what the normal hours per day).</li></ol><p>In addition to the duties specified &#34;above&#34;, you are obliged to follow all reasonable instructions of the client, the management of the client, or the designated supervisor.</p><p>You are required to faithfully, diligently, and competently execute the tasks and duties assigned to you. You are also required to comply with the client’s code of conduct or company policy and act in the best interests of the client at all times.</p><p><b><u>2. Salary</u></b></p><ul><li>Your salary will be paid in a bi-weekly basis and it will be paid on every 18<sup>th </sup>(e.g. day 1 to 14) of the month and 3<sup>rd</sup> (e.g. day 15 – 31) of the following month.</li></ul><p><b><u>3. Timesheets</u></b></p><p><b><u></u></b></p><p><b></b></p><ul><li><b></b>You are required to login into Ooget mobile application and update your daily attendance twice (start work and end work) and this will serve as your timesheets for the work you have worked for the client and for Ooget to compute your salary.</li><li>For the avoidance of doubt and for the purposes of the working time regulations, your working time shall only consist of those periods during which you are carrying out activities or duties for the client as part of the service. Time spent travelling to the client’s premises, meal breaks and other rest breaks shall not count as part of your working time for these purposes. </li><li>Ooget shall pay you for all hours worked regardless of whether the Ooget has received payment from the client for those hours. </li></ul><p><b><u>4. Working Days &amp; Hours of Work</u></b></p><p><b><u></u></b></p><p><b></b></p><ul><li><b></b>You are entitled to one rest day in a week and your rest day shall be on a Sunday or any other day as may be rostered by the employer.</li></ul><ul><li>You are given meal breaks.</li></ul><p>The client reserves the right, at its sole discretion, to revise, amend or extend the working hours should the need arise.</p><p>You are obliged to commit beyond the normal workings days and hours stipulated in clause XX if the client so requires, and you will be entitled to additional remuneration or overtime pay in line with the company policy of the client / Ooget or the requirements of law.</p><p>On the 1<sup>st</sup> day of assignment commencement if you are unable to attend work you must telephone Ooget administrator to communicate the reason for absence within 1 hour of the commencement time.</p><p>Where you are absent from work due to medical reasons you must notify client designated supervisor as soon as practicable. Such notice shall be given within 1 hour of the commencement time on the first day of your absence. You must also obtain a medical certificate proving such medical reasons and provide a copy to the employer / client and / or your immediate supervisor as soon as practicable. </p><p><b><u>5. Public Holidays</u></b></p><ul><li>You are entitled to paid public holidays. Your pay for each public holiday will be computed based on the total hours of the work performed on the day and it will be paid at 2.0 times the hourly basic rate of pay for each hour of work.</li></ul><p><b><u>6. Additional Salary Payment</u></b></p><ul><li>If you work more than stipulated hours (exclude meal breaks) of work per day, you will be entitled to overtime pay at 1.5 times the hourly basic rate of pay for each hour of work.</li></ul><p><b><u>7. Payment for work on Rest days</u></b></p><ul><li>You are entitled to paid rest days. Your pay for each rest day will be computed based on the total hours of the work performed on the day and it will be paid at 2.0 times the hourly basic rate of pay for each hour of work.</li></ul><p><b><u>8. Remuneration</u></b></p><ul><li>Ooget shall pay you the actual rate of pay will be notified on a per assignment basis.</li><li>The employer should not deduct any monies from your wage other than those allowed under the Employment Act.</li><li>Ooget shall deduct from your remuneration all such sums it is authorized to deduct under laws of Singapore, whether for your share of Central Provident Fund Contributions, withholding tax or otherwise.</li></ul><p><b><u>9. Termination</u></b></p><ul><li>Either party may terminate the contract of service.<b><u></u></b><ul><li>With notice given (e.g. 1 day)<b><u></u></b></li><li>Without notice by paying salary in lieu of notice for the relevant period<b><u></u></b></li></ul></li></ul><ul><li>If you have mis-conducted yourself during the course of work, such as fighting or committing theft, your employer may terminate your service without notice and without compensation.<b><u></u></b></li></ul><ul><li>If you do not inform the client that you are unable to attend work during the course of an assignment this will be treated as termination of the assignment by you unless you can show that exceptional circumstances prevented informing of the absence.</li></ul><p><u><b>10.Confidentiality</b></u></p><ul><li>Without the prior written consent of the client, you must not at any time disclose any confidential information obtained in the course of your contract of service with the client.</li></ul><ul><li>Confidential information generally refers to information not available to the public, and includes:<ul><li>Client’s client list and details;</li><li>Trade secrets;</li><li>Business plans;</li><li>Financial information;</li><li>Employee lists and details;</li><li>Information known to the employee to be confidential;</li><li>Information which may affect the competitive position of the client; and</li><li>Any information the client is obligated not to disclose.</li></ul></li></ul><ul><li>You acknowledge and agree, having had the opportunity to take legal advice thereon, that this clause XX is reasonable and necessary to protect the interests of the client.</li></ul><p><b><u>11. Intellectual Property Rights</u></b></p><ul><li>All intellectual and industrial property rights arising out of or in connection with your contract of service with the client shall immediately be assigned to and vest in the client or any other persons or entity as appointed by the client.<b><u></u></b></li></ul><ul><li>All materials, tangible or intangible, produced by you arising out of or in connection with your contract of service with the client shall be the sole and exclusive property of the client or any other persons or entity as appointed by the client.<b><u></u></b></li></ul><ul><li>You are hereby obligated to execute all documents and do all such acts and such things as may be necessary or requested by the client in order to ensure that all property rights vest exclusively in the client or any other persons or entity as pointed by the client.<b><u></u></b></li></ul><p><b><u>12. Obligations</u></b></p><ul><li>Observe any relevant rules and regulations of the client’s establishment (including normal hours of work) to which attention has been drawn or where you might reasonably be expected to ascertain.<b><u></u></b></li></ul><ul><li>Take all reasonable steps to safeguard his or her own health and safety and that of any other person who may be present or be affected by his or her actions on the assignment and comply with the health and safety policies and procedures of the client.<b><u></u></b></li></ul><ul><li>Not engage in any conduct detrimental to the interest of the client.<b><u></u></b></li></ul><ul><li>Not to use the telephone, fax, email or email or computer systems belongings to the client for personal gain or benefit.<b><u></u></b></li></ul><ul><li>On completion of the service or at any time when requested by the client or the employment business, return to the client or where appropriate, to the employment business, any client property or items provided to you in connection with or for the purpose of the assignment, including but not limited to any equipment, materials, document, swipe cards or ID cards, uniforms personal protective equipment or clothing.<b><u></u></b></li></ul><ul><li>If you are unable for any reason to attend work during the course of an assignment you should inform the client within 1 hour of the commencement of the assignment or shift and update your attendance in mobile application.<b><u></u></b></li></ul><ul><li>If, either before or during the course of an assignment, you becomes aware of any reason you may not be suitable for an assignment, you shall notify the client without delay and update your attendance in the mobile application.<b><u></u></b></li></ul> <p><b><u>13. Others</u></b></p><ul><li>Ooget shall incur no liability to you should it fail to offer assignments of the type of work or any other work.<b><u></u></b></li></ul><ul><li>If, before or during an assignment or during the relevant, the client wishes to engage you directly or through another employment business, you acknowledges that Ooget will be entitled either to charge the client a transfer fee or to agree a period of extended hire with the client at the end of which you may be engaged directly by the client or through another employment business without further charge to the client.<b><u></u></b></li></ul><ul><li>Ooget will be entitled to charge a transfer fee to the client if the client introduces you to a 3<sup>rd</sup> party who subsequently engages you within the relevant period.<b><u></u></b></li></ul><p><b><u>14. Severability</u></b></p><p>If any of the provisions of these terms shall be determined by any competent authority to be unenforceable to any extent, such provision shall, to that extent, be severed from the remaining terms, which shall continue to be valid to the fullest extent permitted by applicable laws.</p><p><b><u>15. Notices</u></b></p><p>All notices which are required to be given in accordance with this agreement shall be in writing and delivered electronically to your email. Any such notice shall be deemed to have been served when that email is sent.</p><p><b><u>16. Governing Law</u></b></p><ul><li>This agreement shall be governed by and construed in accordance with the laws of Singapore.<b><u></u></b></li></ul><ul><li>In relation to any legal action or proceedings arising out of or in connection with this offer of employment, you hereby irrevocably submit to the non-exclusive jurisdiction of the courts of Singapore.</li></ul><p></p><p></p><p></p><p></p></div>`;

	public orginalTerms;
	public textMode = "view";
	busy: Subscription;

	public options: Object = {
		placeholderText: 'JobSeekers Terms and Conditions Goes Here!',
		charCounterCount: true,
		toolbarButtons: ['undo', 'redo', '|', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', '|', 'html'],
		toolbarButtonsXS: ['undo', 'redo', '|', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', '|', 'html'],
		toolbarButtonsSM: ['undo', 'redo', '|', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', '|', 'html'],
		toolbarButtonsMD: ['undo', 'redo', '|', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', '|', 'html'],
	}

	constructor(private _httpService: ApiCallService, public snackBar: MatSnackBar) {
		this.getTC();
	}

	getTC() {
		this.textMode = "view";
		// console.log(this.terms);
		this.busy = this._httpService.getJobseekersTC()
			.subscribe(
				response => {
					if (response.success) {
						this.orginalTerms = response.jobseekerterms[0].jobseekerterm;
						this.terms = response.jobseekerterms[0].jobseekerterm;
					} else if (!response.success) {
						console.log(response);
					}
				},
				error => {
					console.log(error);
				}
			);
	}

	cancelEdit() {
		this.textMode = "view";
		this.terms = this.orginalTerms;
	}

	saveTC() {
		this.textMode = "view";
		console.log(this.terms);
		if (this.terms == this.orginalTerms) {
			let snackBarRef = this.snackBar.open('No Changes made.', 'Close', {
				duration: 5000,
			});
			// Snackbar action
			snackBarRef.onAction().subscribe(() => {
				snackBarRef.dismiss();
				console.log('The snack-bar action was triggered!');
			});
			return false;
		}

		this.busy = this._httpService.updateJobseekersTC({ 'jobseekerterm': this.terms })
			.subscribe(
				response => {
					if (response.success) {
						this.orginalTerms = this.terms;
						// Show Success Snackbar
						let snackBarRef = this.snackBar.open('Terms & conditions updated Successfully.', 'Close', {
							duration: 5000,
						});
						// Snackbar action
						snackBarRef.onAction().subscribe(() => {
							snackBarRef.dismiss();
							console.log('The snack-bar action was triggered!');
						});

					} else if (!response.success) {
						console.log(response);
					}
				},
				error => {
					console.log(error);
				}
			);
	}

	ngOnInit() {
	}

}
