import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { JobseekerTimesheetDataSource } from './jobseeker-timesheet-datasource';
import * as moment from 'moment';
import 'moment-duration-format';

@Component({
  selector: 'app-jobseeker-timesheet',
  templateUrl: './jobseeker-timesheet.component.html',
  styleUrls: ['./jobseeker-timesheet.component.scss']
})
export class JobseekerTimesheetComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: JobseekerTimesheetDataSource;

	@Input() pageSize;
	@Input() displayDatasource;
	/** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
	@Input() columns;
	displayedColumns: string[];

	ngOnInit() {
		// this.displayedColumns = this.columns.map(column => column.name);
		this.displayedColumns = this.columns;
		this.dataSource = new JobseekerTimesheetDataSource(this.paginator, this.sort, this.displayDatasource);
	}

	getSumOfNormalWorkHrs() {
		let totalMin = this.displayDatasource.map(t => t.normalworkhour).reduce((previous, current) => {
			let min = moment.duration(current).asMinutes();
			return previous + min
		}, 0);

		let hrs = moment.duration(totalMin, "minutes").format("hh:mm", {
			trim: false
		});
		// if (hrs == '0' || hrs == '00') return 'Nil';
		return hrs;
	}

	getSumOfOT1point5WorkHrs() {
		let totalMin = this.displayDatasource.filter(t => t.salarymultiplier == 1 || t.salarymultiplier == 1.5).map(t => t.otworkhour).reduce((previous, current) => {
			let min = moment.duration(current).asMinutes();
			return previous + min
		}, 0);

		let hrs = moment.duration(totalMin, "minutes").format("hh:mm", {
			trim: false
		});
		// if (hrs == '0' || hrs == '00') return 'Nil';
		return hrs;
	}

	getSumOfOT2WorkHrs() {
		let totalMin = this.displayDatasource.filter(t => t.salarymultiplier == 2).map(t => t.otworkhour).reduce((previous, current) => {
			let min = moment.duration(current).asMinutes();
			return previous + min
		}, 0);

		let hrs = moment.duration(totalMin, "minutes").format("hh:mm", {
			trim: false
		});
		// if (hrs == '0' || hrs == '00') return 'Nil';
		return hrs;
	}

	getSumOfOTWorkHrs() {
		let totalMin = this.displayDatasource.map(t => t.otworkhour).reduce((previous, current) => {
			let min = moment.duration(current).asMinutes();
			return previous + min
		}, 0);

		let hrs = moment.duration(totalMin, "minutes").format("hh:mm", {
			trim: false
		});
		// if (hrs == '0' || hrs == '00') return 'Nil';
		return hrs;
	}

	getSumOfTotalWorkHrs() {
		let totalMin = this.displayDatasource.map(t => t.totalworkhour).reduce((previous, current) => {
			let min = moment.duration(current).asMinutes();
			return previous + min
		}, 0);

		let hrs = moment.duration(totalMin, "minutes").format("hh:mm", {
			trim: false
		});
		// if (hrs == '0' || hrs == '00') return 'Nil';
		return hrs;
	}

	getSumOfNormalWorkHrSalary() {
		return this.displayDatasource.map(t => t.normalsalary).reduce((previous, current) => {
			return previous + current
		}, 0);
	}

	getSumOfOT1point5WorkHrSalary() {
		return this.displayDatasource.filter(t => t.salarymultiplier == 1 || t.salarymultiplier == 1.5).map(t => t.otsalary).reduce((previous, current) => {
			return previous + current
		}, 0);
	}

	getSumOfOT2WorkHrSalary() {
		return this.displayDatasource.filter(t => t.salarymultiplier == 2).map(t => t.otsalary).reduce((previous, current) => {
			return previous + current
		}, 0);
	}

	getSumOfTotalWorkHrSalary() {
		return this.displayDatasource.map(t => t.totalsalary).reduce((previous, current) => {
			return previous + current
		}, 0);
	}

	getSumOfTotalOogetCommision() {
		return this.displayDatasource.map(t => t.oogetscommission).reduce((previous, current) => {
			if (current == undefined) {
				current = 0;
			}
			return previous + current
		}, 0);
	}
}
