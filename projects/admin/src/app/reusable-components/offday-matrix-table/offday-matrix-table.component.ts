import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { OffdayMatrixTableDataSource } from './offday-matrix-table-datasource';
import * as moment from 'moment';
import 'moment-duration-format';
import { BehaviorSubject } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
	selector: 'app-offday-matrix-table',
	templateUrl: './offday-matrix-table.component.html',
	styleUrls: ['./offday-matrix-table.component.scss']
})
export class OffdayMatrixTableComponent implements OnInit {

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	dataSource: OffdayMatrixTableDataSource;
	displayedColumns: string[];
	displayedDates: string[];
	publicHolidays: string[];
	jobWorkdaysType = '';
	jobWorkdays = '';

	private _displayedColumns = new BehaviorSubject<any[]>([]);
	private _displayedDates = new BehaviorSubject<any[]>([]);
	private _dataSource = new BehaviorSubject<any>([]);

	@Input() pageSize;

	@Input()
	set setDisplayedDates(value) {
		this._displayedDates.next(value);
	};

	get getDisplayedDates() {
		return this._displayedDates.getValue();
	}

	@Input()
	set setDisplayedColumns(value) {
		this._displayedColumns.next(value);
	};

	get getDisplayedColumns() {
		return this._displayedColumns.getValue();
	}

	@Input()
	set setDataSource(value) {
		this._dataSource.next(value);
	};

	get getDataSource() {
		return this._dataSource.getValue();
	}

	constructor(private datePipe: DatePipe) { }

	ngOnInit() {
		this._displayedColumns.subscribe(x => { this.displayedColumns = this.getDisplayedColumns; });
		this._displayedDates.subscribe(x => { this.displayedDates = this.getDisplayedDates; });
		this._dataSource.subscribe(x => {
			this.dataSource = new OffdayMatrixTableDataSource(this.paginator, this.sort, this.getDataSource);
			console.log(this.getDataSource);
			// this.publicHolidays = this.getDataSource.holiday;
			// this.jobWorkdays = this.getDataSource.job[0].workdays;
			// this.jobWorkdaysType = this.getDataSource.job[0].workdaystype;
		});
	}

	checkIsHoliday(rowData, date): any {
		// let elements = rowData.filter(row => row.date == date);
		// return elements[0];
		// if (this.jobWorkdaysType == 'flexible') {
		console.log(rowData);
		console.log(date);
		let flexibleOffDays = rowData.filter(rowData => rowData.date == date);
		if (flexibleOffDays.length > 0) {
			if (flexibleOffDays[0].worked == 'OFF') {
				return { 'response': 'offday' };
			}
		}
	}
	// return flexibleOffDays;
	// }

	// 	if (this.jobWorkdaysType == 'normal') {
	// 		let day = this.datePipe.transform(date, 'EEEE').toLowerCase();
	// 		// let normalOffDays = offdays.filter(offday => offday.date == date);
	// 		if (!this.jobWorkdays[day]) {
	// 			return { 'response': 'normaloffday' };
	// 		}
	// 	}


// isPublicHoliday(date) {
// 	return this.publicHolidays.includes(date);
// }

checkVerified(rowData, date): any {
	let row = rowData.filter(row => row.date == date);
	return row[0];
	// console.log(row[0]?.verified);
}
}
