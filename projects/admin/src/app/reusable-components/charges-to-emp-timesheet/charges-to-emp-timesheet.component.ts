import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ChargesToEmpTimesheetDataSource } from './charges-to-emp-timesheet-datasource';
import * as moment from 'moment';
import 'moment-duration-format';

@Component({
	selector: 'app-charges-to-emp-timesheet',
	templateUrl: './charges-to-emp-timesheet.component.html',
	styleUrls: ['./charges-to-emp-timesheet.component.scss'],
})
export class ChargesToEmpTimesheetComponent implements OnInit {
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	dataSource: ChargesToEmpTimesheetDataSource;

	@Input() pageSize;
	@Input() displayDatasource;
	/** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
	@Input() columns;
	displayedColumns: string[];

	ngOnInit() {
		// this.displayedColumns = this.columns.map(column => column.name);
		this.displayedColumns = this.columns;
		this.dataSource = new ChargesToEmpTimesheetDataSource(this.paginator, this.sort, this.displayDatasource);
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

	getSumOfOTWorkHrSalary() {
		return this.displayDatasource.map(t => t.otsalary).reduce((previous, current) => {
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