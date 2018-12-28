import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-jobseeker-timesheet-report',
  templateUrl: './jobseeker-timesheet-report.component.html',
  styleUrls: ['./jobseeker-timesheet-report.component.scss']
})
export class JobseekerTimesheetReportComponent implements OnInit {

	constructor(private _location: Location) { }

	backClicked() {
		this._location.back();
	}

	ngOnInit() {
	}

}
