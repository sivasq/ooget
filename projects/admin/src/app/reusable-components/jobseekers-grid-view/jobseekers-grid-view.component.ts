import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PaginationInstance } from 'ngx-pagination';
import { ConfigService } from '../../services/config.service';

@Component({
	selector: 'app-jobseekers-grid-view',
	templateUrl: './jobseekers-grid-view.component.html',
	styleUrls: ['./jobseekers-grid-view.component.scss']
})
export class JobseekersGridViewComponent implements OnInit {
	public baseUrl;
	public jobSeekers: any[];
	private _jobSeekers = new BehaviorSubject<any[]>([]);

	@Output() emitToggleJobseekerStatus = new EventEmitter<{}>();

	@Input() companyDetails: any;

	@Input()
	set setJobSeekers(value) {
		this._jobSeekers.next(value);
	}

	get getJobSeekers() {
		return this._jobSeekers.getValue();
	}

	toggleShowSearch: boolean = false;
	public pageSizeOptions = [1, 2, 3, 6, 12, 24, 48, 96];
	public PaginateControlMaxSize: number = 10;
	public PaginateControlAutoHide: boolean = true;
	public PaginateConfig: PaginationInstance = {
		id: Math.random().toString(36).substring(7),
		itemsPerPage: 6,
		currentPage: 1
	};

	constructor(private urlconfig: ConfigService) {
		this.baseUrl = urlconfig.base_url;
	}

	toggleJobseekerStatus(event, jobSeekerId) {
		console.log('event');
		this.emitToggleJobseekerStatus.emit({ 'jobSeekerId': jobSeekerId, 'activeStatus': event.checked });
	}

	ngOnInit() {
		this._jobSeekers.subscribe(x => {
			this.jobSeekers = this.getJobSeekers;
			// console.log(x);
		});
	}

}
