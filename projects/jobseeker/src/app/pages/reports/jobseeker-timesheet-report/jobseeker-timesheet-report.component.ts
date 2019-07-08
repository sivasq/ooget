import { Component, OnInit } from '@angular/core';
import { Location, DatePipe } from '@angular/common';
import { ApiCallService } from '../../../services/api-call.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-jobseeker-timesheet-report',
	templateUrl: './jobseeker-timesheet-report.component.html',
	styleUrls: ['./jobseeker-timesheet-report.component.scss']
})
export class JobseekerTimesheetReportComponent implements OnInit {

	step;
	setStep(index: number) {
		this.step = index;
	}
	onEvent(event) {
		event.stopPropagation();
	}
	//busy Config
	busy: Subscription;
	public employeeFilter: string = '';
	public jobFilter: string = '';

	displayedColumns = ['work_date', 'work_day', 'in_time', 'out_time', 'verified', 'verifiedpunchintime', 'verifiedpunchouttime', 'normalworkhour', 'otworkhour1', 'otworkhour2', 'totalworkhour', 'normalsalary', 'ot1salary', 'ot2salary', 'totalsalary', 'invoiceno'];

	employerDatas: any[] = [];

	isEmployerAvailable: boolean;
	employerCount;
	jobseekers = '';
	SelectedDateRange;

	constructor(private _location: Location, private _httpService: ApiCallService, private datePipe: DatePipe) { }
	getDateChange(event) {
		// console.log('event', event);
		// console.log('SelectedDateRange', this.SelectedDateRange);
	}

	getJobseekerContracts() {
		// this.employerDatas = this.DemoemployerDatas.timesheetreport;
		// return false;
		if (!this.SelectedDateRange) return false;

		this.busy = this._httpService.getJobseekerContracts({ 'from': this.datePipe.transform(this.SelectedDateRange.begin, 'yyy-MM-dd'), 'to': this.datePipe.transform(this.SelectedDateRange.end, 'yyy-MM-dd') })
			.subscribe(
				response => {
					if (response.success) {
						this.employerDatas = response.result;
						// console.log(this.employerDatas);

					} else if (!response.success) {
						// console.log(response);
					}
				},
				error => {
					// console.log(error);
				}
			);
	}

	backClicked() {
		this._location.back();
	}

	ngOnInit() {
		// this.employerDatas = this.DemoemployerDatas;
	}
}
