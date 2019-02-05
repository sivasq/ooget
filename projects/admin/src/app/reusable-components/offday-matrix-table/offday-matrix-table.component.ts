import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { OffdayMatrixTableDataSource } from './offday-matrix-table-datasource';
import * as moment from 'moment';
import 'moment-duration-format';

@Component({
	selector: 'app-offday-matrix-table',
	templateUrl: './offday-matrix-table.component.html',
	styleUrls: ['./offday-matrix-table.component.scss']
})
export class OffdayMatrixTableComponent implements OnInit, OnChanges {
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	dataSource: OffdayMatrixTableDataSource;

	@Input() pageSize;
	@Input() displayDatasource;
	/** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
	@Input() columns;
	displayedColumns: string[];

	@Input() days;
	displayedDates: string[];

	ngOnInit() {
		this.displayedColumns = this.columns;
		this.displayedDates = this.days;
		this.dataSource = new OffdayMatrixTableDataSource(this.paginator, this.sort, this.displayDatasource);
	}

	ngOnChanges(changes: SimpleChanges) {
		this.displayedColumns = changes.columns.currentValue;
		this.displayedDates = changes.days.currentValue;
		this.dataSource = new OffdayMatrixTableDataSource(this.paginator, this.sort, this.displayDatasource.currentValue);
		console.log(changes.columns.currentValue);
		console.log(changes.days.currentValue);
		console.log(changes.displayDatasource.currentValue);
	}

	demo(element, column) {
		// console.log(element);
		let elements = element.filter(item => item.date == column);
		return elements[0];
	}
}
