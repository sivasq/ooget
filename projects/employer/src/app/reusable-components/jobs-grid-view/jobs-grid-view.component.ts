import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PaginationInstance } from 'ngx-pagination';

@Component({
	selector: 'app-jobs-grid-view',
	templateUrl: './jobs-grid-view.component.html',
	styleUrls: ['./jobs-grid-view.component.scss']
})
export class JobsGridViewComponent implements OnInit {
	public jobs: any[];
	private _jobs = new BehaviorSubject<any[]>([]);

	@Output() emitCloseJob = new EventEmitter<{}>();
	@Output() emitActivateJob = new EventEmitter<{}>();

	@Input() companyDetails: any;

	@Input()
	set setJobs(value) {
		this._jobs.next(value);
	}

	get getJobs() {
		return this._jobs.getValue();
	}

	employmentType = ['', 'Part Time', 'Full Time'];
	jobStatus = ['', 'Pending', 'Live', 'Closed'];

	toggleShowSearch: boolean = false;
	public pageSizeOptions = [1, 2, 3, 6, 12, 24, 48, 96];
	public PaginateControlMaxSize: number = 10;
	public PaginateControlAutoHide: boolean = true;
	public PaginateConfig: PaginationInstance = {
		id: Math.random().toString(36).substring(7),
		itemsPerPage: 6,
		currentPage: 1
	};

	constructor() { }

	closeJob(employerId, jobId) {
		this.emitCloseJob.emit({ 'employerId': employerId, 'jobId': jobId });
	}

	ActivateJob(event, employerId, jobId) {
		this.emitActivateJob.emit({ 'employerId': employerId, 'jobId': jobId, 'status': event.checked });
	}

	ngOnInit() {
		this._jobs.subscribe(x => {
			this.jobs = this.getJobs.sort((val1, val2) => {
				return <any>new Date(val1.from) - <any>new Date(val2.from);
				// return new Date(val2.from).getTime() - new Date(val1.from).getTime()
			});
			// console.log(x);
		});
	}

}
