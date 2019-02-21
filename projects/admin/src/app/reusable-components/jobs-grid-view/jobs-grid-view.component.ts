import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PaginationInstance } from 'ngx-pagination';

@Component({
	selector: 'app-jobs-grid-view',
	templateUrl: './jobs-grid-view.component.html',
	styleUrls: ['./jobs-grid-view.component.scss']
})
export class JobsGridViewComponent implements OnInit {
	jobs: any[];

	private _jobs = new BehaviorSubject<any[]>([]);

	@Input()
	set setJobs(value) {
		this._jobs.next(value);
	};

	get getJobs() {
		return this._jobs.getValue();
	}
	toggleSearch: boolean = false;
	public pageSizeOptions = [1, 2, 3, 6, 12, 24, 48, 96];
	public PaginateControlMaxSize: number = 10;
	public PaginateControlAutoHide: boolean = true;
	public PaginateConfig: PaginationInstance = {
		id: Math.random().toString(36).substring(7),
		itemsPerPage: 6,
		currentPage: 1
	};
	// public tab1search;
	// public tab1search: any[] = {};
	// public tab1Filter: string = '';

	constructor() { }

	ngOnInit() {
		this._jobs.subscribe(x => {
			this.jobs = this.getJobs;
			console.log(x);
		});
	}

}
