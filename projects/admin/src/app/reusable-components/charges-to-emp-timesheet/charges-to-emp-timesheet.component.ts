import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ChargesToEmpTimesheetDataSource } from './charges-to-emp-timesheet-datasource';

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
		this.displayedColumns = this.columns.map(column => column.name);
		this.dataSource = new ChargesToEmpTimesheetDataSource(this.paginator, this.sort, this.displayDatasource);
	}
}
