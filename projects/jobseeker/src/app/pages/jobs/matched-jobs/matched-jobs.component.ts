import { Component, OnInit, Input, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiCallService } from '../../../services/api-call.service';
import { MenuPositionX } from '@angular/material';
import { PaginationInstance } from 'ngx-pagination';
import { Subscription } from 'rxjs';
import { ConfigService } from '../../../services/config.service';
import { Options, ChangeContext } from 'ng5-slider';
import { NgModel } from '@angular/forms';

@Component({
	selector: 'app-matched-jobs',
	templateUrl: './matched-jobs.component.html',
	styleUrls: ['./matched-jobs.component.scss']
})
export class MatchedJobsComponent implements OnInit {
	options: Options = {
		floor: 0,
		ceil: 200,
		translate: (value: number): string => {
			return '' + value;
		}
	};

	minValue: number = this.options.floor;
	maxValue: number = this.options.ceil;

	search = {
		parttime: true,
		fulltime: true,
		minsalary: 0,
		maxsalary: 10000,
		jobspecialization: []
	}

	jobs = [];

	public imgBaseUrl;
	//busy Config
	busy: Subscription;

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
	public matchedJobsCount: Number;

	//set jobs array
	public matched_jobs_list: any[] = [];

	constructor(private urlconfig: ConfigService, private _httpService: ApiCallService, private route: ActivatedRoute) {

		this.imgBaseUrl = urlconfig.img_base_url;

		let employerId = {
			// companyid: localStorage.getItem('ogCompanyObjID'),
		}
		this.getMatchedJobsList();
	}

	getMatchedJobsList() {
		this.busy = this._httpService.getMatchedJobsList()
			.subscribe(
				response => {
					if (response.success) {
						if ((response.matches).length > 0) {
							this.jobs = response.matches;
							this.matched_jobs_list = response.matches;
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
							console.log("ok");
							this.isJobsListAllAvailable = false;
						}
					} else if (!response.success) {
						console.log(response);
					}
				},
				error => {
					console.log(error);
				}
			);
	}

	onUserChangeEnd(changeContext: ChangeContext): void {
		this.search.minsalary = changeContext.value;
		this.search.maxsalary = changeContext.highValue;

		this.jobSearch();
	}

	jobSearch() {
		setTimeout(() => {
			if (this.search.parttime == false && this.search.fulltime == false) {
				this.search.parttime = true;
				this.search.fulltime = true;
			}
			this.matched_jobs_list = [];
			this.matched_jobs_list = this.jobs.filter((jobs: any) => {
				if (this.search.parttime && !this.search.fulltime) {
					return jobs.employmenttype === "Part Time" && (jobs.salary >= this.search.minsalary && jobs.salary <= this.search.maxsalary)
				}

				if (!this.search.parttime && this.search.fulltime) {
					return jobs.employmenttype === "Full Time" && (jobs.salary >= this.search.minsalary && jobs.salary <= this.search.maxsalary)
				}

				if (this.search.parttime && this.search.fulltime) {
					return (jobs.employmenttype === "Full Time" || jobs.employmenttype === "Part Time") && (jobs.salary >= this.search.minsalary && jobs.salary <= this.search.maxsalary)
				}
			})

			this.matched_jobs_list = this.matched_jobs_list.filter((job: any) => {
				var newData = this.search.jobspecialization.filter(search => {
					return job.jobspecialization === search;
				});
				return job.jobspecialization === newData[0];
			});
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
			this.jobSearch();
		}
		else {
			select.update.emit([]);
			// this.search.jobspecialization = '';
			this.jobSearch();
		}
		console.log(this.search.jobspecialization);
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
