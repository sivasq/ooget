import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { OffdayMatrixTableDataSource } from './offday-matrix-table-datasource';
import * as moment from 'moment';
import 'moment-duration-format';
import { BehaviorSubject } from 'rxjs';

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

	ngOnInit() {
		this._displayedColumns.subscribe(x => { this.displayedColumns = this.getDisplayedColumns; });
		this._displayedDates.subscribe(x => { this.displayedDates = this.getDisplayedDates; });
		this._dataSource.subscribe(x => {
			this.dataSource = new OffdayMatrixTableDataSource(this.paginator, this.sort, this.getDataSource.job[0].contracts);

			this.publicHolidays = this.getDataSource.job[0].contracts;
		});
	}

	demo(element, column) {
		let elements = element.filter(item => item.date == column);
		return elements[0];
	}
}
