import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ApiCallService } from '../../../services/api-call.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { ConfigService } from '../../../services/config.service';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';

export interface NavItem {
	displayName: string;
	disabled?: boolean;
	iconName: string;
	route?: string;
	children?: NavItem[];
}

@Component({
	selector: 'app-view-company-details',
	templateUrl: './view-company-details.component.html',
	styleUrls: ['./view-company-details.component.scss']
})
export class ViewCompanyDetailsComponent implements OnInit {

	navMode: string = '';
	navOpen: boolean;
	public baseUrl;
	public imgBaseUrl;
	// @ViewChild('docFileInput') docFileInput: ElementRef;

	@ViewChild('docFileInput') myInputVariable: ElementRef;

	public employerDetails: any = [];
	objectKeys = Object.keys;
	public companyCodeGenerator: boolean = false;

	public docName;
	public companyid;
	public companyCodes = {
		companyid: '',
		companycode: ''
	}
	showUpload = true;
	uploaded = false;
	busy: Subscription;

	navItems: NavItem[] = [
		{
			displayName: 'DevFestFL',
			iconName: 'recent_actors',
			route: 'devfestfl',
			children: [
				{
					displayName: 'Speakers',
					iconName: 'group',
					route: 'devfestfl/speakers',
					children: [
						{
							displayName: 'Michael Prentice',
							iconName: 'person',
							route: 'devfestfl/speakers/michael-prentice',
							children: [
								{
									displayName: 'Create Enterprise UIs',
									iconName: 'star_rate',
									route: 'devfestfl/speakers/michael-prentice/material-design'
								}
							]
						},
						{
							displayName: 'Stephen Fluin',
							iconName: 'person',
							route: 'devfestfl/speakers/stephen-fluin',
							children: [
								{
									displayName: 'What\'s up with the Web?',
									iconName: 'star_rate',
									route: 'devfestfl/speakers/stephen-fluin/what-up-web'
								}
							]
						},
						{
							displayName: 'Mike Brocchi',
							iconName: 'person',
							route: 'devfestfl/speakers/mike-brocchi',
							children: [
								{
									displayName: 'My ally, the CLI',
									iconName: 'star_rate',
									route: 'devfestfl/speakers/mike-brocchi/my-ally-cli'
								},
								{
									displayName: 'Become an Angular Tailor',
									iconName: 'star_rate',
									route: 'devfestfl/speakers/mike-brocchi/become-angular-tailer'
								}
							]
						}
					]
				},
				{
					displayName: 'Sessions',
					iconName: 'speaker_notes',
					route: 'devfestfl/sessions',
					children: [
						{
							displayName: 'Create Enterprise UIs',
							iconName: 'star_rate',
							route: 'devfestfl/sessions/material-design'
						},
						{
							displayName: 'What\'s up with the Web?',
							iconName: 'star_rate',
							route: 'devfestfl/sessions/what-up-web'
						},
						{
							displayName: 'My ally, the CLI',
							iconName: 'star_rate',
							route: 'devfestfl/sessions/my-ally-cli'
						},
						{
							displayName: 'Become an Angular Tailor',
							iconName: 'star_rate',
							route: 'devfestfl/sessions/become-angular-tailer'
						}
					]
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
					displayName: 'Speakers',
					iconName: 'group',
					children: [
						{
							displayName: 'Michael Prentice',
							iconName: 'person',
							route: 'michael-prentice',
							children: [
								{
									displayName: 'Create Enterprise UIs',
									iconName: 'star_rate',
									route: 'material-design'
								}
							]
						},
						{
							displayName: 'Stephen Fluin',
							iconName: 'person',
							route: 'stephen-fluin',
							children: [
								{
									displayName: 'What\'s up with the Web?',
									iconName: 'star_rate',
									route: 'what-up-web'
								}
							]
						},
						{
							displayName: 'Mike Brocchi',
							iconName: 'person',
							route: 'mike-brocchi',
							children: [
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
		},
		{
			displayName: 'Orlando',
			iconName: 'movie_filter',
			children: [
				{
					displayName: 'Speakers',
					iconName: 'group',
					children: [
						{
							displayName: 'Michael Prentice',
							iconName: 'person',
							route: 'michael-prentice',
							children: [
								{
									displayName: 'Create Enterprise UIs',
									iconName: 'star_rate',
									route: 'material-design'
								}
							]
						},
						{
							displayName: 'Stephen Fluin',
							iconName: 'person',
							route: 'stephen-fluin',
							children: [
								{
									displayName: 'What\'s up with the Web?',
									iconName: 'star_rate',
									route: 'what-up-web'
								}
							]
						},
						{
							displayName: 'Mike Brocchi',
							iconName: 'person',
							route: 'mike-brocchi',
							children: [
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
		},
		{
			displayName: 'Maleficent',
			disabled: true,
			iconName: 'report_problem',
			children: [
				{
					displayName: 'Speakers',
					iconName: 'group',
					children: [
						{
							displayName: 'Michael Prentice',
							iconName: 'person',
							route: 'michael-prentice',
							children: [
								{
									displayName: 'Create Enterprise UIs',
									iconName: 'star_rate',
									route: 'material-design'
								}
							]
						},
						{
							displayName: 'Stephen Fluin',
							iconName: 'person',
							route: 'stephen-fluin',
							children: [
								{
									displayName: 'What\'s up with the Web?',
									iconName: 'star_rate',
									route: 'what-up-web'
								}
							]
						},
						{
							displayName: 'Mike Brocchi',
							iconName: 'person',
							route: 'mike-brocchi',
							children: [
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
		}
	];

	constructor(private _httpService: ApiCallService, private route: ActivatedRoute, public snackBar: MatSnackBar, private configService: ConfigService, private datePipe: DatePipe) {

		this.baseUrl = configService.base_url;
		this.imgBaseUrl = configService.img_base_url;
		this.companyid = this.route.snapshot.params['emp_id'];
		let employerId = {
			companyid: this.route.snapshot.params['emp_id'],
		}
		this.getEmployerDetails(employerId);
	}

	getEmployerDetails(employerId) {
		this.busy = this._httpService.getCompanyDetails(employerId)
			.subscribe(
				response => {
					if (response.success) {
						// if((response.message).length > 0)
						// {
						// 	this.isEmployerAvailable = true;
						// }else{
						// 	this.isEmployerAvailable = false;
						// }

						this.employerDetails = response.employer;
						this.companyCodes.companyid = response.employer._id;
						console.log(this.employerDetails);

					} else if (!response.success) {
						console.log(response);
					}
				},
				error => {
					console.log(error);
				}
			);
	}

	getDoc(event) {
		console.log(event.target.files[0]);
		this.showUpload = false;
		this.uploaded = true;
		this.docName = event.target.files[0].name;
		// if (event.target.files && event.target.files[0]) {
		// 	var reader = new FileReader();
		// 	reader.readAsDataURL(event.target.files[0]); // read file as data url
		// 	reader.onload = (event:any) => { // called once readAsDataURL is completed
		// 		this.profileImage = event.target.result;
		// 		console.log(event.target.result);
		// 	}
		// }
	}

	ngOnInit() {

	}

}
