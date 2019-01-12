import { Component, OnInit, Input, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiCallService } from '../../../services/api-call.service';
import { MenuPositionX } from '@angular/material';
import { PaginationInstance } from 'ngx-pagination';
import { Subscription } from 'rxjs';
import { ConfigService } from '../../../services/config.service';
import { Options, ChangeContext } from 'ng5-slider';
import { SelectionModel } from '@angular/cdk/collections';
import { NgModel } from '@angular/forms';

@Component({
	selector: 'app-jobs-list',
	templateUrl: './jobs-list.component.html',
	styleUrls: ['./jobs-list.component.scss']
})
export class JobsListComponent implements OnInit {

	options: Options = {
		floor: 0,
		ceil: 200,
		translate: (value: number): string => {
			return '' + value;
		}
	};

	minValue: number = this.options.floor;
	maxValue: number = this.options.ceil;

	onUserChangeEnd(changeContext: ChangeContext): void {
		console.log(changeContext);
	}

	search = {
		parttime: true,
		fulltime: true,
		minsalary: 0,
		maxsalary: 10000,
		jobspecialization: ''
	}

	public imgBaseUrl;
	//busy Config
	busy: Subscription;

	jobs;

	public Specializations: any = [
		{
			"_id": "432424",
			"specialization": "Actuarial Science/Statistics"
		},
		{
			"_id": "432424",
			"specialization": "Advertising/Media Planning"
		},
		{
			"_id": "432424",
			"specialization": "Agriculture/Forestry/Fisheries"
		},
		{
			"_id": "432424",
			"specialization": "Architecture/Interior Design"
		},
		{
			"_id": "432424",
			"specialization": "Arts/Creative/Graphics Design"
		},
		{
			"_id": "432424",
			"specialization": "Aviation/Aircraft Maintenance"
		},
		{
			"_id": "432424",
			"specialization": "Banking/Financial Services"
		},
		{
			"_id": "432424",
			"specialization": "Biotechnology"
		},
		{
			"_id": "432424",
			"specialization": "Chemistry"
		},
		{
			"_id": "432424",
			"specialization": "Clerical/Administrative Support"
		},
		{
			"_id": "432424",
			"specialization": "Corporate Strategy/Top Management"
		},
		{
			"_id": "432424",
			"specialization": "Customer Service"
		},
		{
			"_id": "432424",
			"specialization": "Education"
		},
		{
			"_id": "432424",
			"specialization": "Engineering - Chemical"
		},
		{
			"_id": "432424",
			"specialization": "Engineering - Civil/Construction/Structural"
		},
		{
			"_id": "432424",
			"specialization": "Engineering - Electrical"
		},
		{
			"_id": "432424",
			"specialization": "Engineering - Electronics/Communication"
		},
		{
			"_id": "432424",
			"specialization": "Engineering - Environmental/Health/Safety"
		},
		{
			"_id": "432424",
			"specialization": "Engineering - Industrial"
		},
		{
			"_id": "432424",
			"specialization": "Engineering - Mechanical/Automotive"
		},
		{
			"_id": "432424",
			"specialization": "Engineering - Oil/Gas"
		},
		{
			"_id": "432424",
			"specialization": "Entertainment/Performing Arts"
		},
		{
			"_id": "432424",
			"specialization": "Finance - Audit/Taxation"
		},
		{
			"_id": "432424",
			"specialization": "Finance - Corporate Finance/Investment/Merchant Banking"
		},
		{
			"_id": "432424",
			"specialization": "Finance - General/Cost Accounting"
		},
		{
			"_id": "432424",
			"specialization": "Food Technology/Nutritionist"
		},
		{
			"_id": "432424",
			"specialization": "Food/Beverage/Restaurant Service"
		},
		{
			"_id": "432424",
			"specialization": "General Worker (Housekeeper, Driver, Dispatch, Messenger, etc)"
		},
		{
			"_id": "432424",
			"specialization": "Geology/Geophysics"
		},
		{
			"_id": "432424",
			"specialization": "Healthcare - Doctor/Diagnosis"
		},
		{
			"_id": "432424",
			"specialization": "Healthcare - Nurse/Medical Support & Assistant"
		},
		{
			"_id": "432424",
			"specialization": "Healthcare - Pharmacy"
		},
		{
			"_id": "432424",
			"specialization": "Hotel Management/Tourism Services"
		},
		{
			"_id": "432424",
			"specialization": "Human Resources"
		},
		{
			"_id": "432424",
			"specialization": "IT/Computer - Hardware"
		},
		{
			"_id": "432424",
			"specialization": "IT/Computer - Network/System/Database Admin"
		},
		{
			"_id": "432424",
			"specialization": "IT/Computer - Software"
		},
		{
			"_id": "432424",
			"specialization": "Journalist/Editor"
		},
		{
			"_id": "432424",
			"specialization": "Law/Legal Services"
		},
		{
			"_id": "432424",
			"specialization": "Logistics/Supply Chain"
		},
		{
			"_id": "432424",
			"specialization": "Maintenance/Repair (Facilities & Machinery)"
		},
		{
			"_id": "432424",
			"specialization": "Manufacturing/Productions Operations"
		},
		{
			"_id": "432424",
			"specialization": "Marketing/Business Development"
		},
		{
			"_id": "432424",
			"specialization": "Merchandising"
		},
		{
			"_id": "432424",
			"specialization": "Personal Care/Beauty/Fitness Service"
		},
		{
			"_id": "432424",
			"specialization": "Process Design & Control/Instrumentation"
		},
		{
			"_id": "432424",
			"specialization": "Property/Real Estate"
		},
		{
			"_id": "432424",
			"specialization": "Public Relations/Communications"
		},
		{
			"_id": "432424",
			"specialization": "Publishing/Printing"
		},
		{
			"_id": "432424",
			"specialization": "Purchasing/Inventory/Material & Warehouse Management"
		},
		{
			"_id": "432424",
			"specialization": "Quality Control/Assurance"
		},
		{
			"_id": "432424",
			"specialization": "Quantity Surveying"
		},
		{
			"_id": "432424",
			"specialization": "Sales - Corporate"
		},
		{
			"_id": "432424",
			"specialization": "Sales - Engineering/Technical/IT"
		},
		{
			"_id": "432424",
			"specialization": "Sales - Finance Services (Insurance, Unit Trust, etc)"
		},
		{
			"_id": "432424",
			"specialization": "Sales - Retail/General"
		},
		{
			"_id": "432424",
			"specialization": "Sales - Telesales/Telemarketing"
		},
		{
			"_id": "432424",
			"specialization": "Science & Technology/Laboratory"
		},
		{
			"_id": "432424",
			"specialization": "Secretarial/Executive & Personal Assistant"
		},
		{
			"_id": "432424",
			"specialization": "Security/Armed Forces/Protective Services"
		},
		{
			"_id": "432424",
			"specialization": "Social & Counselling Service"
		},
		{
			"_id": "432424",
			"specialization": "Technical & Helpdesk Support"
		},
		{
			"_id": "432424",
			"specialization": "Training & Development"
		},
		{
			"_id": "432424",
			"specialization": "Others"
		}
	]

	//Mat Menu Configuration
	@Input() xPosition: MenuPositionX
	@Input() overlapTrigger: boolean

	public pageSizeOptions = [3, 6, 12, 24, 48, 96];

	// Tab1 Pagination config
	public tab1PaginateConfig: PaginationInstance = {
		id: 'tab1',
		itemsPerPage: 6,
		currentPage: 1
	};
	public tab1search;
	public tab1Filter: string = '';
	public tab1PaginateControlMaxSize: number = 10;
	public tab1PaginateControlAutoHide: boolean = true;

	//set jobs availability
	public isJobsListAllAvailable: boolean;
	public allJobsCount: Number;

	//set jobs array
	public jobs_list_all: any[];

	constructor(private urlconfig: ConfigService, private _httpService: ApiCallService, private route: ActivatedRoute) {
		this.imgBaseUrl = urlconfig.img_base_url;
		let employerId = {
			// companyid: localStorage.getItem('ogCompanyObjID'),
		}
		this.getActiveJobsList();
	}

	getActiveJobsList() {
		this.busy = this._httpService.getSingleEmployersJobsList()
			.subscribe(
				response => {
					if (response.success) {
						if ((response.jobs).length > 0) {
							this.jobs = response.jobs;
							this.jobs_list_all = response.jobs;
							this.isJobsListAllAvailable = true;

							// Create Salary Arr
							let salaryArr = response.jobs.map(x => x.salary);
							let minValue = Math.min(...salaryArr);
							let maxValue = Math.max(...salaryArr);
							// Update range slider
							this.setNewCeil(minValue, maxValue);

							this.search.minsalary = minValue;
							this.search.maxsalary = maxValue;

						} else {
							this.isJobsListAllAvailable = false;
						}
						console.log(response);
						// this.jobs_list = response.jobs;
					} else if (!response.success) {
						console.log(response);
					}
				},
				error => {
					console.log(error);
				}
			);
	}

	makeSearch() {
		console.log(this.search);
		// console.log(this.search.jobspecialization ? this.search.jobspecialization : '0');
		let con;
		this.jobs_list_all = this.jobs.filter((jobs: any) => {
			// return jobs.employmenttype === "Part Time" && jobs.salary == 19

			// if ((this.search.parttime && !this.search.fulltime) && this.search.jobspecialization == '' && ((this.search.minsalary == '' && this.search.minsalary == null) && this.search.maxsalary == '')) {
			// 	con = 'jobs.employmenttype === "Part Time"19'
			// }

			// if (((this.search.parttime && this.search.fulltime) || (!this.search.parttime && !this.search.fulltime)) && this.search.jobspecialization == '' && ((this.search.minsalary == '' && this.search.minsalary == null) && this.search.maxsalary == '')) {
			// 	con = '(jobs.employmenttype === "Part Time" || jobs.employmenttype === "Full Time")23'
			// }

			// if ((!this.search.parttime && this.search.fulltime) && this.search.jobspecialization == '' && ((this.search.minsalary == '' && this.search.minsalary == null) && this.search.maxsalary == '')) {
			// 	con = 'jobs.employmenttype === "Full Time"22'
			// }

			// if (((this.search.parttime && this.search.fulltime) || (!this.search.parttime && !this.search.fulltime)) && this.search.jobspecialization != '' && ((this.search.minsalary == '' && this.search.minsalary == null) && this.search.maxsalary == '')) {
			// 	con = '(jobs.employmenttype === "Part Time" || jobs.employmenttype === "Full Time") && jobs.jobspecialization === this.search.jobspecialization 29'
			// }

			// if (((this.search.parttime && this.search.fulltime) || (!this.search.parttime && !this.search.fulltime)) && this.search.jobspecialization == '' && ((this.search.minsalary == '' && this.search.minsalary == null) && this.search.maxsalary == '')) {
			// 	con = '(jobs.employmenttype === "Part Time" || jobs.employmenttype === "Full Time")  30'
			// }

			// if (((this.search.parttime && this.search.fulltime) || (!this.search.parttime && !this.search.fulltime)) && this.search.jobspecialization != '' && ((this.search.minsalary != '' && this.search.minsalary != null) && this.search.maxsalary != '')) {
			// 	con = '(jobs.employmenttype === "Part Time" || jobs.employmenttype === "Full Time") && jobs.jobspecialization === this.search.jobspecialization && (jobs.salary >= this.search.minsalary && jobs.salary <= this.search.maxsalary)7'
			// }

			// if (((this.search.parttime && this.search.fulltime) || (!this.search.parttime && !this.search.fulltime)) && this.search.jobspecialization != '' && ((this.search.minsalary == '' && this.search.minsalary == null) && this.search.maxsalary != '')) {
			// 	con = '(jobs.employmenttype === "Part Time" || jobs.employmenttype === "Full Time") && jobs.jobspecialization === this.search.jobspecialization && (jobs.salary >= 0 && jobs.salary <= this.search.maxsalary)8'
			// }

			// if (((this.search.parttime && this.search.fulltime) || (!this.search.parttime && !this.search.fulltime)) && this.search.jobspecialization != '' && ((this.search.minsalary != '' && this.search.minsalary != null) && this.search.maxsalary == '')) {
			// 	con = '(jobs.employmenttype === "Part Time" || jobs.employmenttype === "Full Time") && jobs.jobspecialization === this.search.jobspecialization && (jobs.salary >= this.search.minsalary && jobs.salary <= 100000)9'
			// }

			// if (((this.search.parttime && this.search.fulltime) || (!this.search.parttime && !this.search.fulltime)) && this.search.jobspecialization != '' && ((this.search.minsalary == '' && this.search.minsalary == null) && this.search.maxsalary == '')) {
			// 	con = '(jobs.employmenttype === "Part Time" || jobs.employmenttype === "Full Time") && jobs.jobspecialization === this.search.jobspecialization 29'
			// }

			// if (((this.search.parttime && this.search.fulltime) || (!this.search.parttime && !this.search.fulltime)) && this.search.jobspecialization == '' && ((this.search.minsalary == '' && this.search.minsalary == null) && this.search.maxsalary == '')) {
			// 	con = '(jobs.employmenttype === "Part Time" || jobs.employmenttype === "Full Time")  30'
			// }

			// if (((this.search.parttime && this.search.fulltime) || (!this.search.parttime && !this.search.fulltime)) && this.search.jobspecialization == '' && ((this.search.minsalary != '' && this.search.minsalary != null) && this.search.maxsalary != '')) {
			// 	con = '(jobs.employmenttype === "Part Time" || jobs.employmenttype === "Full Time") && (jobs.salary >= this.search.minsalary && jobs.salary <= this.search.maxsalary)10'
			// }

			// if (((this.search.parttime && this.search.fulltime) || (!this.search.parttime && !this.search.fulltime)) && this.search.jobspecialization == '' && ((this.search.minsalary == '' && this.search.minsalary == null) && this.search.maxsalary != '')) {
			// 	con = '(jobs.employmenttype === "Part Time" || jobs.employmenttype === "Full Time") &&(jobs.salary >= 0 && jobs.salary <= this.search.maxsalary)11'
			// }

			// if (((this.search.parttime && this.search.fulltime) || (!this.search.parttime && !this.search.fulltime)) && this.search.jobspecialization == '' && ((this.search.minsalary != '' && this.search.minsalary != null) && this.search.maxsalary == '')) {
			// 	con = '(jobs.employmenttype === "Part Time" || jobs.employmenttype === "Full Time") && (jobs.salary >= this.search.minsalary && jobs.salary <= 100000) 12'
			// }

			// if (((this.search.parttime && this.search.fulltime) || (!this.search.parttime && !this.search.fulltime)) && this.search.jobspecialization == '' && ((this.search.minsalary == '' && this.search.minsalary == null) && this.search.maxsalary == '')) {
			// 	con = '(jobs.employmenttype === "Part Time" || jobs.employmenttype === "Full Time") 33'
			// }
			// if (((this.search.parttime && this.search.fulltime) || (!this.search.parttime && !this.search.fulltime)) && this.search.jobspecialization == '' && ((this.search.minsalary == '' && this.search.minsalary == null) && this.search.maxsalary == '')) {
			// 	con = '(jobs.employmenttype === "Part Time" || jobs.employmenttype === "Full Time")23'
			// }

			// if (!this.search.parttime && !this.search.fulltime) {
			// 	con = (jobs.employmenttype === "Part Time" || jobs.employmenttype === "Full Time")
			// }

			// if ((this.search.parttime && !this.search.fulltime) && this.search.jobspecialization != '' && ((this.search.minsalary != '' && this.search.minsalary != null) && this.search.maxsalary != '')) {
			// 	con = 'jobs.employmenttype === "Part Time" && jobs.jobspecialization === this.search.jobspecialization && (jobs.salary >= this.search.minsalary && jobs.salary <= this.search.maxsalary)6'
			// }

			// if ((this.search.parttime && !this.search.fulltime) && this.search.jobspecialization != '' && ((this.search.minsalary == '' && this.search.minsalary == null) && this.search.maxsalary != '')) {
			// 	con = 'jobs.employmenttype === "Part Time" && jobs.jobspecialization === this.search.jobspecialization && (jobs.salary >= 0 && jobs.salary <= this.search.maxsalary)5'
			// }
			// if ((this.search.parttime && !this.search.fulltime) && this.search.jobspecialization != '' && ((this.search.minsalary != '' && this.search.minsalary != null) && this.search.maxsalary == '')) {
			// 	con = 'jobs.employmenttype === "Part Time" && jobs.jobspecialization === this.search.jobspecialization && (jobs.salary >= this.search.minsalary && jobs.salary <= 100000)4'
			// }


			// if ((this.search.parttime && !this.search.fulltime) && this.search.jobspecialization == '' && ((this.search.minsalary != '' && this.search.minsalary != null) && this.search.maxsalary != '')) {
			// 	con = 'jobs.employmenttype === "Part Time" && (jobs.salary >= this.search.minsalary && jobs.salary <= this.search.maxsalary)3'
			// }

			// if ((this.search.parttime && !this.search.fulltime) && this.search.jobspecialization == '' && ((this.search.minsalary == '' && this.search.minsalary == null) && this.search.maxsalary == '')) {
			// 	con = 'jobs.employmenttype === "Part Time"19'
			// }

			// if ((this.search.parttime && !this.search.fulltime) && this.search.jobspecialization == '' && ((this.search.minsalary == '' && this.search.minsalary == null) && this.search.maxsalary != '')) {
			// 	con = 'jobs.employmenttype === "Part Time" && (jobs.salary >= 0 && jobs.salary <= this.search.maxsalary)2'
			// }

			// if ((this.search.parttime && !this.search.fulltime) && this.search.jobspecialization == '' && ((this.search.minsalary != '' && this.search.minsalary != null) && this.search.maxsalary == '')) {
			// 	con = 'jobs.employmenttype === "Part Time" && (jobs.salary >= this.search.minsalary && jobs.salary <= 100000)1'
			// }


			// if ((!this.search.parttime && this.search.fulltime) && this.search.jobspecialization != '' && ((this.search.minsalary != '' && this.search.minsalary != null) && this.search.maxsalary != '')) {
			// 	con = 'jobs.employmenttype === "Full Time" && jobs.jobspecialization === this.search.jobspecialization && (jobs.salary >= this.search.minsalary && jobs.salary <= this.search.maxsalary)13'
			// }

			// if ((!this.search.parttime && this.search.fulltime) && this.search.jobspecialization != '' && ((this.search.minsalary == '' && this.search.minsalary == null) && this.search.maxsalary != '')) {
			// 	con = 'jobs.employmenttype === "Full Time" && jobs.jobspecialization === this.search.jobspecialization && (jobs.salary >= 0 && jobs.salary <= this.search.maxsalary)14'
			// }

			// if ((!this.search.parttime && this.search.fulltime) && this.search.jobspecialization != '' && ((this.search.minsalary != '' && this.search.minsalary != null) && this.search.maxsalary == '')) {
			// 	con = 'jobs.employmenttype === "Full Time" && jobs.jobspecialization === this.search.jobspecialization && (jobs.salary >= this.search.minsalary && jobs.salary <= 100000)15'
			// }


			// if ((!this.search.parttime && this.search.fulltime) && this.search.jobspecialization == '' && ((this.search.minsalary != '' && this.search.minsalary != null) && this.search.maxsalary != '')) {
			// 	con = 'jobs.employmenttype === "Full Time" && (jobs.salary >= this.search.minsalary && jobs.salary <= this.search.maxsalary)16'
			// }

			// if ((!this.search.parttime && this.search.fulltime) && this.search.jobspecialization == '' && ((this.search.minsalary == '' && this.search.minsalary == null) && this.search.maxsalary == '')) {
			// 	con = 'jobs.employmenttype === "Full Time"22'
			// }

			// if ((!this.search.parttime && this.search.fulltime) && this.search.jobspecialization == '' && ((this.search.minsalary == '' && this.search.minsalary == null) && this.search.maxsalary != '')) {
			// 	con = 'jobs.employmenttype === "Full Time" && (jobs.salary >= 0 && jobs.salary <= this.search.maxsalary)17'
			// }

			// if ((!this.search.parttime && this.search.fulltime) && this.search.jobspecialization == '' && ((this.search.minsalary != '' && this.search.minsalary != null) && this.search.maxsalary == '')) {
			// 	con = 'jobs.employmenttype === "Full Time" && (jobs.salary >= this.search.minsalary && jobs.salary <= 100000)18'
			// }

			// console.log(con);
			// return con;

			// if ((this.search.jobspecialization != '') && this.search.jobspecialization == '') {
			// 	con = con && jobs.jobspecialization === this.search.jobspecialization
			// }

			// if ((this.search.minsalary != '' && this.search.minsalary != null) && this.search.maxsalary != '') {
			// 	con = con && (jobs.salary >= this.search.minsalary && jobs.salary <= this.search.maxsalary)
			// }

			// if ((this.search.minsalary == '' && this.search.minsalary == null) && this.search.maxsalary != '') {
			// 	con += '&&' + (jobs.salary >= 0 && jobs.salary <= this.search.maxsalary)
			// }

			// if ((this.search.minsalary != '' && this.search.minsalary != null) && this.search.maxsalary == '') {
			// 	con += '&&' + (jobs.salary >= this.search.minsalary && jobs.salary <= 100000)
			// }

			// return (jobs.employmenttype === this.search.employmenttype) || (jobs.jobspecialization === this.search.jobspecialization ? this.search.jobspecialization : '0') || (jobs.salary >= this.search.minsalary ? this.search.minsalary : 0 && jobs.salary <= this.search.maxsalary ? this.search.maxsalary : 0);
		});
	}

	makeSearch1(event) {
		console.log('makeSearch1', event);
	}

	makeSearch2() {
		setTimeout(() => {
			if (this.search.parttime == false && this.search.fulltime == false) {
				this.search.parttime = true;
				this.search.fulltime = true;
			}

			console.log('makeSearch2', this.search);
		}, 0)
	}

	isAllSelected() {
		const numSelected = this.search.jobspecialization.length;
		const numRows = this.Specializations.length;
		return numSelected === numRows;
	}

	/** Selects all rows if they are not all selected; otherwise clear selection. */
	masterToggle(checkAll, select: NgModel) {
		let values = this.Specializations.map(x => x.specialization);
		if (checkAll) {
			select.update.emit(values);
			// this.search.jobspecialization = values;
		}
		else {
			select.update.emit([]);
			// this.search.jobspecialization = '';
		}
		console.log(this.search.jobspecialization);
	}

	clearSearch() {
		this.jobs_list_all = this.jobs;
	}

	setNewCeil(newfloor: number, newCeil: number): void {
		// Due to change detection rules in Angular, we need to re-create the options object to apply the change
		const newOptions: Options = Object.assign({}, this.options);
		newOptions.ceil = newCeil;
		newOptions.floor = newfloor;

		this.options = newOptions;

		this.minValue = this.options.floor;
		this.maxValue = this.options.ceil;
	}

	ngOnInit() {
		this.search.jobspecialization = this.Specializations.map(x => x.specialization);
		this.search.parttime = true;
		this.search.fulltime = true;
	}

}
