import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { OffdayMatrixTableDataSource } from './offday-matrix-table-datasource';
import * as moment from 'moment';
import 'moment-duration-format';

@Component({
	selector: 'app-offday-matrix-table',
	templateUrl: './offday-matrix-table.component.html',
	styleUrls: ['./offday-matrix-table.component.scss']
})
export class OffdayMatrixTableComponent implements OnInit {
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	dataSource: OffdayMatrixTableDataSource;

	@Input() pageSize;
	@Input() displayDatasource;
	/** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
	@Input() columns;
	displayedColumns: string[];

	ngOnInit() {
		this.displayedColumns = this.columns;
		this.dataSource = new OffdayMatrixTableDataSource(this.paginator, this.sort, this.displayDatasource);
	}

	demo(element, column) {
		// console.log(element);
		let elements = element.filter(item => item.day == column);
		return elements[0];
	}
}
