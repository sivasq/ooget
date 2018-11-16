import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatDialog, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { Issue } from '../models/issue';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DataSource } from '@angular/cdk/collections';
import { AddComponent } from '../dialogs/add/add.component';
import { EditComponent } from '../dialogs/edit/edit.component';
import { DeleteComponent } from '../dialogs/delete/delete.component';

import { Observable } from 'rxjs';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { DataService } from '../../../services/data.service';

@Component({
	selector: 'app-holiday-list',
	templateUrl: './holiday-list.component.html',
	styleUrls: ['./holiday-list.component.scss']
})
export class HolidayListComponent implements OnInit {

	// displayedColumns = ['id', 'title', 'state', 'url', 'created_at', 'updated_at', 'actions'];
	displayedColumns = ['holiday_date', 'holiday_name', 'actions'];
	exampleDatabase: DataService | null;
	dataSource: ExampleDataSource | null;
	index: number;
	id: number;

	constructor(public httpClient: HttpClient, public dialog: MatDialog, public dataService: DataService, public snackBar: MatSnackBar) { }

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	@ViewChild('filter') filter: ElementRef;

	ngOnInit() {
		this.loadData();
	}

	refresh() {
		this.loadData();
	}

	addNew(issue: Issue) {
		const dialogRef = this.dialog.open(AddComponent, {
			data: { issue: issue }
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result == undefined) return false;

			this.dataService.addIssue(result)
				.subscribe(responses => {
					this.dataService.dialogData = responses.holiday;

					this.exampleDatabase.dataChange.value.push(this.dataService.getDialogData());
					this.refreshTable();

					this.snackBar.open('Successfully added', 'close', {
						duration: 2000,
					});
				},
					(err: HttpErrorResponse) => {
						this.snackBar.open('Error occurred. Details: ' + err.name + ' ' + err.message, 'close', {
							duration: 5000,
						});
					});

			// if (result === 1) {
			// 	// After dialog is closed we're doing frontend updates
			// 	// For add we're just pushing a new row inside DataService
			// 	setTimeout(() => {
			// 		this.exampleDatabase.dataChange.value.push(this.dataService.getDialogData());
			// 		this.refreshTable();
			// 	},5000)

			// }
		});
	}

	startEdit(i: number, id: string, holidaydate: string, holidayname: string) {
		// this.id = id;
		// index row is used just for debugging proposes and can be removed
		this.index = i;
		// console.log(this.index);
		const dialogRef = this.dialog.open(EditComponent, {
			data: { holidayid: id, holidaydate: new Date(holidaydate), holidayname: holidayname }
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result == undefined) return false;

			this.dataService.updateIssue(result)
				.subscribe(responses => {
					this.dataService.dialogData = responses.holiday;

					this.exampleDatabase.dataChange.value[i] = this.dataService.getDialogData();
					this.refreshTable();

					this.snackBar.open('Successfully Updated', 'close', {
						duration: 2000,
					});
				},
					(err: HttpErrorResponse) => {
						this.snackBar.open('Error occurred. Details: ' + err.name + ' ' + err.message, 'close', {
							duration: 5000,
						});
					});

			// if (result === 1) {
			// 	// When using an edit things are little different, firstly we find record inside DataService by id
			// 	// const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.i === this.id);
			// 	// Then you update that record using data from dialogData (values you enetered)
			// 	this.exampleDatabase.dataChange.value[i] = this.dataService.getDialogData();
			// 	// And lastly refresh table
			// 	this.refreshTable();
			// }
		});
	}

	deleteItem(i: number, id: string, holidaydate: string, holidayname: string) {
		this.index = i;
		// this.id = id;
		const dialogRef = this.dialog.open(DeleteComponent, {
			data: { holidayid: id, holidaydate: new Date(holidaydate), holidayname: holidayname }
		});

		dialogRef.afterClosed().subscribe(result => {
			this.dataService.deleteIssue(result)
				.subscribe(responses => {
					this.exampleDatabase.dataChange.value.splice(i, 1);
					this.refreshTable();

					this.snackBar.open('Successfully Deleted', 'close', {
						duration: 2000,
					});
				},
					(err: HttpErrorResponse) => {
						this.snackBar.open('Error occurred. Details: ' + err.name + ' ' + err.message, 'close', {
							duration: 5000,
						});
					});
			// if (result === 1) {
			// 	// const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
			// 	// for delete we use splice in order to remove single object from DataService
			// 	this.exampleDatabase.dataChange.value.splice(i, 1);
			// 	this.refreshTable();
			// }
		});
	}

	// If you don't need a filter or a pagination this can be simplified, you just use code from else block
	private refreshTable() {
		// if there's a paginator active we're using it for refresh
		if (this.dataSource._paginator.hasNextPage()) {
			this.dataSource._paginator.nextPage();
			this.dataSource._paginator.previousPage();
			// in case we're on last page this if will tick
		} else if (this.dataSource._paginator.hasPreviousPage()) {
			this.dataSource._paginator.previousPage();
			this.dataSource._paginator.nextPage();
			// in all other cases including active filter we do it like this
		} else {
			this.dataSource.filter = '';
			this.dataSource.filter = this.filter.nativeElement.value;
		}
	}

	public loadData() {
		this.exampleDatabase = new DataService(this.httpClient);
		this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
		Observable.fromEvent(this.filter.nativeElement, 'keyup')
			.debounceTime(150)
			.distinctUntilChanged()
			.subscribe(() => {
				if (!this.dataSource) {
					return;
				}
				this.dataSource.filter = this.filter.nativeElement.value;
			});
	}
}

export class ExampleDataSource extends DataSource<Issue> {
	_filterChange = new BehaviorSubject('');

	get filter(): string {
		return this._filterChange.value;
	}

	set filter(filter: string) {
		this._filterChange.next(filter);
	}

	filteredData: Issue[] = [];
	renderedData: Issue[] = [];

	constructor(public _exampleDatabase: DataService, public _paginator: MatPaginator, public _sort: MatSort) {
		super();
		console.log(super());
		// Reset to the first page when the user changes the filter.
		this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
	}

	/** Connect function called by the table to retrieve one stream containing the data to render. */
	connect(): Observable<Issue[]> {
		// Listen for any changes in the base data, sorting, filtering, or pagination
		const displayDataChanges = [
			this._exampleDatabase.dataChange,
			this._sort.sortChange,
			this._filterChange,
			this._paginator.page
		];

		this._exampleDatabase.getAllIssues();

		return Observable.merge(...displayDataChanges).map(() => {
			// Filter data
			this.filteredData = this._exampleDatabase.data.slice().filter((issue: any) => {
				// console.log(issue.holidayname);
				const searchStr = (issue.holidayname + issue.holidaydate).toLowerCase();
				return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
			});

			// Sort filtered data
			const sortedData = this.sortData(this.filteredData.slice());

			// Grab the page's slice of the filtered sorted data.
			const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
			this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
			return this.renderedData;
		});
	}

	disconnect() { }

	/** Returns a sorted copy of the database data. */
	sortData(data: Issue[]): Issue[] {
		if (!this._sort.active || this._sort.direction === '') {
			return data;
		}

		return data.sort((a, b) => {
			let propertyA: number | string = '';
			let propertyB: number | string = '';

			switch (this._sort.active) {
				case 'holiday_name': [propertyA, propertyB] = [a.holidayname, b.holidayname]; break;
				case 'holiday_date': [propertyA, propertyB] = [a.holidaydate, b.holidaydate]; break;
			}

			const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
			const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

			return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
		});
	}
}
