import { Component, OnInit, Input, HostListener, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiCallService } from '../../../services/api-call.service';
import { MenuPositionX, MatSnackBar } from '@angular/material';
import { PaginationInstance } from 'ngx-pagination';
import { Subscription } from 'rxjs';
import { ConfigService } from '../../../services/config.service';
import { Options, ChangeContext } from 'ng5-slider';
import { NgModel } from '@angular/forms';
import { JobLocation } from '../../../classes/jobLocation';
import { Specialization } from '../../../classes/Specialization';
import { MockDataService } from '../../../services/mock-data.service';

@Component({
	selector: 'app-matched-jobs',
	templateUrl: './matched-jobs.component.html',
	styleUrls: ['./matched-jobs.component.scss']
})
export class MatchedJobsComponent implements OnInit, OnDestroy {

	options: Options = {
		floor: 0,
		ceil: 100,
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
		maxsalary: 100,
		jobspecialization: []
	};

	jobs = [];

	employmentType = ['', 'Part Time', 'Full Time'];
	jobStatus = ['', 'Pending', 'Live', 'Closed'];

	public baseUrl;
	// busy Config
	busy: Subscription;

	// Mat Menu Configuration
	@Input() xPosition: MenuPositionX;
	@Input() overlapTrigger: boolean;

	public pageSizeOptions = [3, 6, 12, 24, 48, 96];

	JobLocations: JobLocation[];
	Specializations: Specialization[];

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

	// set jobs availability
	public isJobsListAllAvailable: boolean;
	public matchedJobsCount: Number;

	// set jobs array
	public matched_jobs_list: any[] = [];

	constructor(private urlconfig: ConfigService, private _httpService: ApiCallService, private route: ActivatedRoute, public snackBar: MatSnackBar, private mockDataService: MockDataService) {
		this.baseUrl = urlconfig.base_url;
		this.getMatchedJobsList();
		this.getSpecializations();
		this.getJobLocations();
	}

	getSpecializations(): void {
		this.mockDataService.getSpecializations()
			.subscribe(Specializations => {
				this.Specializations = Specializations;
			});
	}
	getJobLocations(): void {
		this.mockDataService.getJobLocations()
			.subscribe(JobLocations => {
				this.JobLocations = JobLocations;
			});
	}

	getJobLocationName(locationId) {
		let filteredLocation = this.JobLocations.filter(location => location.id == locationId);
		return filteredLocation[0].name;
	}

	getMatchedJobsList() {
		this.busy = this._httpService.getMatchedJobsList()
			.subscribe(
				response => {
					if (response.success) {
						if ((response.result).length > 0) {
							this.jobs = response.result;
							this.matched_jobs_list = response.result;
							this.isJobsListAllAvailable = true;

							// Create Salary Arr
							// let salaryArr = response.matches.map(x => x.salary);
							// let minValue = Math.min(...salaryArr);
							// let maxValue = Math.max(...salaryArr);
							// Update range slider
							// this.setNewCeil(minValue, maxValue);

							// this.search.minsalary = minValue;
							// this.search.maxsalary = maxValue;

						} else {
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
			// if (this.search.parttime == false && this.search.fulltime == false) {
			// 	this.search.parttime = true;
			// 	this.search.fulltime = true;
			// }
			this.matched_jobs_list = [];
			this.matched_jobs_list = this.jobs.filter((jobs: any) => {
				if (this.search.parttime && !this.search.fulltime) {
					return jobs.employement_type == 1 && (jobs.jobseeker_salary >= this.search.minsalary && jobs.jobseeker_salary <= this.search.maxsalary);
				}

				if (!this.search.parttime && this.search.fulltime) {
					return jobs.employement_type == 2 && (jobs.jobseeker_salary >= this.search.minsalary && jobs.jobseeker_salary <= this.search.maxsalary);
				}

				if (this.search.parttime && this.search.fulltime) {
					return (jobs.employement_type == 2 || jobs.employement_type == 1) && (jobs.jobseeker_salary >= this.search.minsalary && jobs.jobseeker_salary <= this.search.maxsalary);
				}

				if (!this.search.parttime && !this.search.fulltime) {
					return (jobs.employement_type == 2 || jobs.employement_type == 1) && (jobs.jobseeker_salary >= this.search.minsalary && jobs.jobseeker_salary <= this.search.maxsalary);
				}
			});

			if (this.search.jobspecialization.length > 0) {
				this.matched_jobs_list = this.matched_jobs_list.filter((job: any) => {
					var newData = this.search.jobspecialization.filter(search => {
						return job.specializations == search;
					});
					return job.specializations == newData[0];
				});
			}
		}, 0);
	}

	isAllSelected() {
		const numSelected = this.search.jobspecialization.length;
		const numRows = this.Specializations.length;
		return numSelected === numRows;
	}

	/** Selects all rows if they are not all selected; otherwise clear selection. */
	masterToggle(checkAll, select: NgModel) {
		let values = this.Specializations.map(x => x.id);
		if (checkAll) {
			select.update.emit(values);
			// this.search.jobspecialization = values;
			this.jobSearch();
		} else {
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

	saveJob(jobId) {
		console.log({ 'jobid': jobId });
		this.busy = this._httpService.saveJob({ 'jobid': jobId })
			.subscribe(
				response => {
					if (response.success) {
						this.getMatchedJobsList();
						let snackBarRef = this.snackBar.open('Job Saved Successfully.', 'Close', {
							duration: 5000,
						});

						snackBarRef.onAction().subscribe(() => {
							snackBarRef.dismiss();
							console.log('The snack-bar action was triggered!');
						});
					} else if (!response.success) {
						let snackBarRef = this.snackBar.open('Job Already Saved.', 'Close', {
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

	unSaveJob(jobId) {
		console.log({ 'jobid': jobId });
		this.busy = this._httpService.unSaveJob({ 'jobid': jobId })
			.subscribe(
				response => {
					if (response.success) {
						this.getMatchedJobsList();
						let snackBarRef = this.snackBar.open('Job UnSaved Successfully.', 'Close', {
							duration: 5000,
						});

						snackBarRef.onAction().subscribe(() => {
							snackBarRef.dismiss();
							console.log('The snack-bar action was triggered!');
						});
					} else if (!response.success) {
						let snackBarRef = this.snackBar.open('Job Already UnSaved.', 'Close', {
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

	ngOnInit() {
		this.search.jobspecialization = this.Specializations.map(x => x.id);
		this.search.parttime = true;
		this.search.fulltime = true;
	}
	ngOnDestroy() {
		if (this.busy) {
			this.busy.unsubscribe();
		}
	}
}
