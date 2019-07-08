import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Options, ChangeContext } from 'ng5-slider';
import { NgModel } from '@angular/forms';

@Component({
	selector: 'app-filter-jobs',
	templateUrl: './filter-jobs.component.html',
	styleUrls: ['./filter-jobs.component.scss']
})
export class FilterJobsComponent implements OnInit {

	@Input() Specializations;
	@Input() jobs;
	@Output() data: EventEmitter<string[]> = new EventEmitter<string[]>();
	@Input() minValue: number;
	@Input() maxValue: number;

	options: Options = {
		floor: 1,
		ceil: 100,
		translate: (value: number): string => {
			return '' + value;
		}
	};

	// minValue = this.options.floor;
	// maxValue = this.options.ceil;

	search = {
		parttime: true,
		fulltime: true,
		minsalary: 1,
		maxsalary: 100,
		jobspecialization: []
	}

	public jobs_list_all: any[] = [];

	constructor() { }

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

			// console.log(this.search);

			this.jobs_list_all = [];
			this.jobs_list_all = this.jobs.filter((jobs: any) => {
				if (this.search.parttime && !this.search.fulltime) {
					return jobs.employmenttype === "Part Time" && (jobs.salary >= this.search.minsalary && jobs.salary <= this.search.maxsalary)
				}

				if (!this.search.parttime && this.search.fulltime) {
					return jobs.employmenttype === "Full Time" && (jobs.salary >= this.search.minsalary && jobs.salary <= this.search.maxsalary)
				}

				if (this.search.parttime && this.search.fulltime) {
					return (jobs.employmenttype === "Full Time" || jobs.employmenttype === "Part Time") && (jobs.salary >= this.search.minsalary && jobs.salary <= this.search.maxsalary)
				}

				if (!this.search.parttime && !this.search.fulltime) {
					return (jobs.employmenttype === "Full Time" || jobs.employmenttype === "Part Time") && (jobs.salary >= this.search.minsalary && jobs.salary <= this.search.maxsalary)
				}
			})

			if (this.search.jobspecialization.length > 0) {
				this.jobs_list_all = this.jobs_list_all.filter((job: any) => {
					var newData = this.search.jobspecialization.filter(search => {
						return job.jobspecialization === search;
					});
					return job.jobspecialization === newData[0];
				});
			}

			this.data.emit(this.jobs_list_all);

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
		// console.log(this.search.jobspecialization);
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
