import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
// import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import { MatTableDataSource } from '@angular/material';
import { ApiCallService } from '../../../services/api-call.service';

import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common';
type AOA = any[][];

@Component({
	selector: 'app-import-holiday',
	templateUrl: './import-holiday.component.html',
	styleUrls: ['./import-holiday.component.scss']
})
export class ImportHolidayComponent implements OnInit {
	// https://github.com/SheetJS/js-xlsx
	data: any[] = [];
	// wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
	// fileName: string = 'SheetJS.xlsx';

	public allPhHolidays: any = [];
	public importedHolidays = [];
	public dublicateHolidays: any = [];

	importedHolidaysDataSource = new MatTableDataSource(this.importedHolidays);
	dublicateHolidaysDataSource = new MatTableDataSource(this.dublicateHolidays);

	// displayedColumns = ['holiday_date', 'holiday_name', 'holiday_group_code', 'holiday_group_name', 'leave_type_code', 'leave_type'];
	displayedColumns = ['holiday_date', 'holiday_name'];

	@ViewChild('chooseCsvFile') myCsvFileInputVariable: ElementRef;
	@ViewChild('chooseXlFile') myXlsFileInputVariable: ElementRef;

	csvdata = [];
	public csvOptions = {
		fieldSeparator: ',',
		quoteStrings: '',
		decimalseparator: '.',
		showLabels: true,
		showTitle: false,
		title: 'Your title',
		useBom: true,
		noDownload: false,
		headers: ['holiday_date', 'holiday_name']
		// headers: ['holiday_date', 'holiday_name', 'holiday_group_code', 'holiday_group_name', 'leave_type_code', 'leave_type']
	};

	constructor(private _httpService: ApiCallService, private datePipe: DatePipe) {
		this.getAllPHHolidays();
	}

	getAllPHHolidays() {
		this._httpService.getAllPHHolidays()
			.subscribe(
				response => {
					if (response.success) {
						// console.log(response.holidays);
						if ((response.holidays).length > 0) {
							this.allPhHolidays = response.holidays;
						}
					} else if (!response.success) {
						console.log(response);
					}
				},
				error => {
					console.log(error);
				}
			);
	}

	public handleDuplicateDays() {
		this.dublicateHolidays = [];
		this.allPhHolidays.map((item1) => {
			this.importedHolidays = this.importedHolidays.filter((item2) => {
				if (item2.holiday_date != item1.holidaydate) {
					return true;
				}
				if (item2.holiday_date == item1.holidaydate) {
					this.dublicateHolidays.push(item2);
				}
			})
		})
		this.importedHolidaysDataSource.data = this.importedHolidays;
		this.dublicateHolidaysDataSource.data = this.dublicateHolidays;
		// console.log(this.importedHolidays);
		// console.log(this.dublicateHolidays);
	}

	public extractData(data) { // Input csv data to the function
		this.importedHolidays = [];
		let csvData = data;
		let allTextLines = csvData.split(/\r\n|\n/);
		let csvHeaders = allTextLines[0].split(',');

		// let customHeader = ['holiday_date', 'holiday_name', 'holiday_group_code', 'holiday_group_name', 'leave_type_code', 'leave_type'];
		let customHeader = ['holiday_date', 'holiday_name'];
		let isHeadersMatch = (csvHeaders.length == customHeader.length) && csvHeaders.every(function (element, index) {
			return element === customHeader[index];
		});

		if (isHeadersMatch) {
			for (let line = 1; line < allTextLines.length; line++) {
				// split content based on comma
				let data = allTextLines[line].split(',');
				if (data.length == csvHeaders.length) {
					let holidayObject = {};
					for (let column = 0; column < csvHeaders.length; column++) {
						let key = csvHeaders[column];
						holidayObject[key] = data[column];
					}
					this.importedHolidays.push(holidayObject);
				}
			}
			console.log(this.importedHolidays);
			// this.importedHolidaysDataSource.filter = "";
			// this.importedHolidaysDataSource.data = this.importedHolidays;
			this.handleDuplicateDays();
			// console.log(this.importedHolidays); //The data in the form of 2 dimensional array.
		} else {
			console.log("error");
		}
	}

	public handleFileSelect(evt) {
		console.log('csv');
		if (evt.target.files && evt.target.files[0]) {
			var files = evt.target.files; // FileList object
			var file = files[0];
			var reader = new FileReader();
			reader.readAsText(file);
			reader.onload = (event: any) => {
				var csv = event.target.result; // Content of CSV file
				this.myCsvFileInputVariable.nativeElement.value = "";
				this.extractData(csv); //Here you can call the above function.
			}
		}
	}

	public handleFileSelectXl(evt: any) {
		console.log('xls');
		/* wire up file reader */
		const target: DataTransfer = <DataTransfer>(evt.target);
		if (target.files.length !== 1) throw new Error('Cannot use multiple files');
		const reader: FileReader = new FileReader();
		reader.readAsBinaryString(target.files[0]);
		reader.onload = (evt: any) => {
			/* read workbook */
			const bstr: string = evt.target.result;
			const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
			/* grab first sheet */
			const wsname: string = wb.SheetNames[0];
			const ws: XLSX.WorkSheet = wb.Sheets[wsname];
			/* save data */
			this.data = <AOA>(XLSX.utils.sheet_to_json(ws));
			// Clear file from input
			this.myXlsFileInputVariable.nativeElement.value = "";
			// console.log(this.data);
			this.importedHolidays = this.data;
			// this.importedHolidaysDataSource.data = this.importedHolidays;
			this.importedHolidays = this.importedHolidays.map((item) => {
				return { 'holiday_date': this.datePipe.transform(item.holiday_date, 'yyyy/MM/dd'), 'holiday_name': item.holiday_name }
			});
			this.handleDuplicateDays();
			// console.log(this.importedHolidays);
		}
	}

	downloadSampleCSV() {
		// new Angular5Csv(this.csvdata, 'TimeSheet', this.csvOptions);
	}

	public onRowClicked(row) {
		console.log(row);
	}

	ngOnInit() { }

}
