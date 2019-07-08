import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { MatSort } from '@angular/material';
import { JobseekerTimesheetDataSource } from './jobseeker-timesheet-datasource';
import * as moment from 'moment';
import 'moment-duration-format';
import { BehaviorSubject } from 'rxjs';

@Component({
	selector: 'app-jobseeker-timesheet',
	templateUrl: './jobseeker-timesheet.component.html',
	styleUrls: ['./jobseeker-timesheet.component.scss']
})
export class JobseekerTimesheetComponent implements OnInit {
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	dataSource: JobseekerTimesheetDataSource;

	private _dataSource = new BehaviorSubject<any>([]);

	@Input()
	set setDataSource(value) {
		this._dataSource.next(value);
	};

	get getDataSource() {
		return this._dataSource.getValue();
	}

	@Input() pageSize;
	@Input() columns;
	displayedColumns: string[];
	displayDatasource: any[];

	ngOnInit() {
		// this.displayedColumns = this.columns.map(column => column.name);
		this.displayedColumns = this.columns;
		// this.dataSource = new JobseekerTimesheetDataSource(this.paginator, this.sort, this.displayDatasource);
		this._dataSource.subscribe(x => {
			this.dataSource = new JobseekerTimesheetDataSource(this.paginator, this.sort, this.getDataSource);
			this.displayDatasource = this.getDataSource;
			// console.log(this.displayDatasource);
		});
	}

	// getSumOfNormalWorkHrs() {
	// 	let totalMin = this.displayDatasource.map(t => t.normalworkhour).reduce((previous, current) => {
	// 		let min = moment.duration(current).asMinutes();
	// 		return previous + min
	// 	}, 0);

	// 	let hrs = moment.duration(totalMin, "minutes").format("hh:mm", {
	// 		trim: false
	// 	});
	// 	// if (hrs == '0' || hrs == '00') return 'Nil';
	// 	return hrs;
	// }

	// getSumOfOT1point5WorkHrs() {
	// 	let totalMin = this.displayDatasource.filter(t => t.salarymultiplier == 1 || t.salarymultiplier == 1.5).map(t => t.otworkhour).reduce((previous, current) => {
	// 		let min = moment.duration(current).asMinutes();
	// 		return previous + min
	// 	}, 0);

	// 	let hrs = moment.duration(totalMin, "minutes").format("hh:mm", {
	// 		trim: false
	// 	});
	// 	// if (hrs == '0' || hrs == '00') return 'Nil';
	// 	return hrs;
	// }

	// getSumOfOT2WorkHrs() {
	// 	let totalMin = this.displayDatasource.filter(t => t.salarymultiplier == 2).map(t => t.otworkhour).reduce((previous, current) => {
	// 		let min = moment.duration(current).asMinutes();
	// 		return previous + min
	// 	}, 0);

	// 	let hrs = moment.duration(totalMin, "minutes").format("hh:mm", {
	// 		trim: false
	// 	});
	// 	// if (hrs == '0' || hrs == '00') return 'Nil';
	// 	return hrs;
	// }

	// getSumOfOTWorkHrs() {
	// 	let totalMin = this.displayDatasource.map(t => t.otworkhour).reduce((previous, current) => {
	// 		let min = moment.duration(current).asMinutes();
	// 		return previous + min
	// 	}, 0);

	// 	let hrs = moment.duration(totalMin, "minutes").format("hh:mm", {
	// 		trim: false
	// 	});
	// 	// if (hrs == '0' || hrs == '00') return 'Nil';
	// 	return hrs;
	// }

	// getSumOfTotalWorkHrs() {
	// 	let totalMin = this.displayDatasource.map(t => t.totalworkhour).reduce((previous, current) => {
	// 		let min = moment.duration(current).asMinutes();
	// 		return previous + min
	// 	}, 0);

	// 	let hrs = moment.duration(totalMin, "minutes").format("hh:mm", {
	// 		trim: false
	// 	});
	// 	// if (hrs == '0' || hrs == '00') return 'Nil';
	// 	return hrs;
	// }

	// getSumOfNormalWorkHrSalary() {
	// 	return this.displayDatasource.map(t => t.normalsalary).reduce((previous, current) => {
	// 		return previous + current
	// 	}, 0);
	// }

	// getSumOfOT1point5WorkHrSalary() {
	// 	return this.displayDatasource.filter(t => t.salarymultiplier == 1 || t.salarymultiplier == 1.5).map(t => t.otsalary).reduce((previous, current) => {
	// 		return previous + current
	// 	}, 0);
	// }

	// getSumOfOT2WorkHrSalary() {
	// 	return this.displayDatasource.filter(t => t.salarymultiplier == 2).map(t => t.otsalary).reduce((previous, current) => {
	// 		return previous + current
	// 	}, 0);
	// }

	// getSumOfTotalWorkHrSalary() {
	// 	return this.displayDatasource.map(t => t.totalsalary).reduce((previous, current) => {
	// 		return previous + current
	// 	}, 0);
	// }

	// getSumOfTotalOogetCommision() {
	// 	return this.displayDatasource.map(t => t.oogetscommission).reduce((previous, current) => {
	// 		if (current == undefined) {
	// 			current = 0;
	// 		}
	// 		return previous + current
	// 	}, 0);
	// }

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
		return this.displayDatasource.map(t => t.salary).reduce((previous, current) => {
			return Number(previous) + Number(current);
		}, 0);
	}

	getSumOfOT1point5WorkHrSalary() {
		if (this.displayDatasource.length === 0) { return ''; }
		return this.displayDatasource.filter(t => t.ot_salary_type == 1.5).map(t => t.ot_salary).reduce((previous, current) => {
			return Number(previous) + Number(current);
		}, 0);
	}

	getSumOfOT2WorkHrSalary() {
		if (this.displayDatasource.length === 0) { return ''; }
		return this.displayDatasource.filter(t => t.ot_salary_type == 2).map(t => t.ot_salary).reduce((previous, current) => {
			return Number(previous) + Number(current);
		}, 0);
	}

	getSumOfTotalWorkHrSalary() {
		if (this.displayDatasource.length === 0) { return ''; }
		return this.displayDatasource.map(t => t.salary_total).reduce((previous, current) => {
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
