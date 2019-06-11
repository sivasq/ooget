import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { MatSort } from '@angular/material';
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
		if (this.displayDatasource.length === 0) { return ''; }
		// Hr to Min and total
		// let totalMin = this.timesheets.map(t => t.normalworkhour).reduce((previous, current) => {
		// 	let min = moment.duration(current).asMinutes();
		// 	return previous + min;
		// }, 0);

		// // Total Min to Hrs
		// let hrs = moment.duration(totalMin, 'minutes').format('hh:mm', {
		// 	trim: false
		// });

		// // if (hrs == '0' || hrs == '00') return 'Nil';
		// return hrs;


		// get total min
		let totalMin = this.displayDatasource.map(t => t.jobseeker_normal_working_min).reduce((previous, current) => {
			return previous + current;
		}, 0);

		// Min to Number
		let totalMins = (totalMin / 60);
		return totalMins.toFixed(2);
	}

	getSumOfOT1point5WorkHrs() {
		if (this.displayDatasource.length === 0) { return ''; }
		// let totalMin = this.timesheets.filter(t => t.salarymultiplier == 1 || t.salarymultiplier == 1.5).map(t => t.otworkhour).reduce((previous, current) => {
		// 	let min = moment.duration(current).asMinutes();
		// 	return previous + min;
		// }, 0);

		// let hrs = moment.duration(totalMin, 'minutes').format('hh:mm', {
		// 	trim: false
		// });
		// // if (hrs == '0' || hrs == '00') return 'Nil';
		// return hrs;

		// get total min
		let totalMin = this.displayDatasource.filter(t => t.ot_salary_type == 1 || t.ot_salary_type == 1.5).map(t => t.jobseeker_ot_working_min).reduce((previous, current) => {
			return previous + current;
		}, 0);

		// Min to Number
		let totalMins = (totalMin / 60);
		return totalMins.toFixed(2);
	}

	getSumOfOT2WorkHrs() {
		if (this.displayDatasource.length === 0) { return ''; }
		// let totalMin = this.timesheets.filter(t => t.salarymultiplier == 2).map(t => t.otworkhour).reduce((previous, current) => {
		// 	let min = moment.duration(current).asMinutes();
		// 	return previous + min;
		// }, 0);

		// let hrs = moment.duration(totalMin, 'minutes').format('hh:mm', {
		// 	trim: false
		// });
		// // if (hrs == '0' || hrs == '00') return 'Nil';
		// return hrs;

		let totalMin = this.displayDatasource.filter(t => t.ot_salary_type == 2).map(t => t.jobseeker_ot_working_min).reduce((previous, current) => {
			return previous + current;
		}, 0);

		// Min to Number
		let totalMins = (totalMin / 60);
		return totalMins.toFixed(2);
	}

	getSumOfTotalWorkHrs() {
		if (this.displayDatasource.length === 0) { return ''; }
		// let totalMin = this.timesheets.map(t => t.totalworkhour).reduce((previous, current) => {
		// 	let min = moment.duration(current).asMinutes();
		// 	return previous + min;
		// }, 0);

		// let hrs = moment.duration(totalMin, 'minutes').format('hh:mm', {
		// 	trim: false
		// });
		// // if (hrs == '0' || hrs == '00') return 'Nil';
		// return hrs;

		let totalNormalMin = this.displayDatasource.map(t => t.jobseeker_normal_working_min).reduce((previous, current) => {
			return previous + current;
		}, 0);

		let totalOTMin = this.displayDatasource.map(t => t.jobseeker_ot_working_min).reduce((previous, current) => {
			return previous + current;
		}, 0);

		let totalMins = ((totalNormalMin + totalOTMin) / 60);
		return totalMins.toFixed(2);
	}

	getSumOfNormalWorkHrSalary() {
		if (this.displayDatasource.length === 0) { return ''; }
		// return this.timesheets.map(t => Number(t.salary)).reduce((previous, current) => {
		// 	return previous + current;
		// }, 0);
		return this.displayDatasource.map(t => t.employer_charge).reduce((previous, current) => {
			return Number(previous) + Number(current);
		}, 0);
	}

	getSumOfOT1point5WorkHrSalary() {
		if (this.displayDatasource.length === 0) { return ''; }
		return this.displayDatasource.filter(t => t.ot_salary_type == 1.5).map(t => t.employer_ot_charge).reduce((previous, current) => {
			return Number(previous) + Number(current);
		}, 0);
	}

	getSumOfOT2WorkHrSalary() {
		if (this.displayDatasource.length === 0) { return ''; }
		return this.displayDatasource.filter(t => t.ot_salary_type == 2).map(t => t.employer_ot_charge).reduce((previous, current) => {
			return Number(previous) + Number(current);
		}, 0);
	}

	getSumOfTotalWorkHrSalary() {
		if (this.displayDatasource.length === 0) { return ''; }
		return this.displayDatasource.map(t => t.employer_total_charge).reduce((previous, current) => {
			return Number(previous) + Number(current);
		}, 0);
	}

	getSumOfTotalOogetCommision() {
		if (this.displayDatasource.length === 0) { return ''; }
		return this.displayDatasource.map(t => t.ooget_commision).reduce((previous, current) => {
			if (current === undefined) {
				current = 0;
			}
			return Number(previous) + Number(current);
		}, 0);
	}
}
