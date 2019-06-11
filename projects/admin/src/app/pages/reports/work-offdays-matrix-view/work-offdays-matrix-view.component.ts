import { Component, OnInit } from '@angular/core';
import { Location, DatePipe } from '@angular/common';
import { ApiCallService } from '../../../services/api-call.service';
import { Subscription, Observable } from 'rxjs';
import { AsyncSubscriber } from '../../../services/async.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
	selector: 'app-work-offdays-matrix-view',
	templateUrl: './work-offdays-matrix-view.component.html',
	styleUrls: ['./work-offdays-matrix-view.component.scss']
})
export class WorkOffdaysMatrixViewComponent implements OnInit {

	sampleResponse: any = {
		'success': true,
		'code': 200,
		'job': [
			{
				'workdays': {
					'sunday': false,
					'monday': true,
					'tuesday': true,
					'wednesday': true,
					'thursday': true,
					'friday': true,
					'saturday': false,
				},
				'workdaystype': 'flexible',
				'contracts': [
					{
						'contractstatus': 'closed',
						'offdays': [
							{
								'date': '2019/05/29',
								'_id': '5b7f62345ac6b313fc6b7144'
							},
							{
								'date': '2019/05/31',
								'_id': '5b7f62345ac6b313fc6b7144'
							}
						],
						'jobseekername': 'YYT',
						'timesheets': [
							{
								'date': '2019/05/31',
								'punchintime': '2019/05/31 00:00',
								'verifiedpunchintime': '2019/05/31 00:00',
								'punchouttime': '2019/05/31 00:00',
								'verifiedpunchouttime': '2019/05/31 00:00',
								'punchedin': false,
								'punchedout': false,
								'verifiedpunchinedited': false,
								'verifiedpunchoutedited': false,
								'notes': '',
								'late': false,
								'lateinhour': '00:00',
								'lateintimation': false,
								'normalworkhour': '00:00',
								'otworkhour': '00:00',
								'totalworkhour': '00:00',
								'normalsalary': 0,
								'otsalary': 0,
								'totalsalary': 0,
								'oogetscommission': 0,
								'salarymultiplier': 1.5,
								'verified': true,
								'payrollgenerated': false,
								'_id': '5b8814802348e217789a4932'
							},
							{
								'date': '2019/05/27',
								'punchintime': '2019/05/01 00:00',
								'verifiedpunchintime': '2019/05/01 00:00',
								'punchouttime': '2019/05/01 00:00',
								'verifiedpunchouttime': '2019/05/01 00:00',
								'punchedin': false,
								'punchedout': false,
								'verifiedpunchinedited': false,
								'verifiedpunchoutedited': false,
								'notes': '',
								'late': false,
								'lateinhour': '00:00',
								'lateintimation': false,
								'normalworkhour': '00:00',
								'otworkhour': '00:00',
								'totalworkhour': '00:00',
								'normalsalary': 0,
								'otsalary': 0,
								'totalsalary': 0,
								'oogetscommission': 0,
								'salarymultiplier': 1,
								'verified': false,
								'payrollgenerated': false,
								'_id': '5b8966002348e217789a4947'
							},
							{
								'date': '2019/05/02',
								'punchintime': '2019/05/02 00:00',
								'verifiedpunchintime': '2019/05/02 00:00',
								'punchouttime': '2019/05/02 00:00',
								'verifiedpunchouttime': '2019/05/02 00:00',
								'punchedin': false,
								'punchedout': false,
								'verifiedpunchinedited': false,
								'verifiedpunchoutedited': false,
								'notes': '',
								'late': false,
								'lateinhour': '00:00',
								'lateintimation': false,
								'normalworkhour': '00:00',
								'otworkhour': '00:00',
								'totalworkhour': '00:00',
								'normalsalary': 0,
								'otsalary': 0,
								'totalsalary': 0,
								'oogetscommission': 0,
								'salarymultiplier': 1,
								'verified': false,
								'payrollgenerated': false,
								'_id': '5b8ab7802348e217789a494a'
							}
						]
					},
					{
						'contractstatus': 'closed',
						'offdays': [],
						'jobseekername': 'Bevin Yap ',
						'timesheets': [
							{
								'date': '2019/05/31',
								'punchintime': '2019/05/31 00:00',
								'verifiedpunchintime': '2019/05/31 00:00',
								'punchouttime': '2019/05/31 00:00',
								'verifiedpunchouttime': '2019/05/31 00:00',
								'punchedin': false,
								'punchedout': false,
								'verifiedpunchinedited': false,
								'verifiedpunchoutedited': false,
								'notes': '',
								'late': false,
								'lateinhour': '00:00',
								'lateintimation': false,
								'normalworkhour': '00:00',
								'otworkhour': '00:00',
								'totalworkhour': '00:00',
								'normalsalary': 0,
								'otsalary': 0,
								'totalsalary': 0,
								'oogetscommission': 0,
								'salarymultiplier': 1,
								'verified': false,
								'payrollgenerated': false,
								'_id': '5b8814802348e217789a4934'
							},
							{
								'date': '2019/05/01',
								'punchintime': '2019/05/01 00:00',
								'verifiedpunchintime': '2019/05/01 00:00',
								'punchouttime': '2019/05/01 00:00',
								'verifiedpunchouttime': '2019/05/01 00:00',
								'punchedin': false,
								'punchedout': false,
								'verifiedpunchinedited': false,
								'verifiedpunchoutedited': false,
								'notes': '',
								'late': false,
								'lateinhour': '00:00',
								'lateintimation': false,
								'normalworkhour': '00:00',
								'otworkhour': '00:00',
								'totalworkhour': '00:00',
								'normalsalary': 0,
								'otsalary': 0,
								'totalsalary': 0,
								'oogetscommission': 0,
								'salarymultiplier': 1,
								'verified': false,
								'payrollgenerated': false,
								'_id': '5b8966002348e217789a4949'
							},
							{
								'date': '2019/05/02',
								'punchintime': '2019/05/02 00:00',
								'verifiedpunchintime': '2019/05/02 00:00',
								'punchouttime': '2019/05/02 00:00',
								'verifiedpunchouttime': '2019/05/02 00:00',
								'punchedin': false,
								'punchedout': false,
								'verifiedpunchinedited': false,
								'verifiedpunchoutedited': false,
								'notes': '',
								'late': false,
								'lateinhour': '00:00',
								'lateintimation': false,
								'normalworkhour': '00:00',
								'otworkhour': '00:00',
								'totalworkhour': '00:00',
								'normalsalary': 0,
								'otsalary': 0,
								'totalsalary': 0,
								'oogetscommission': 0,
								'salarymultiplier': 1,
								'verified': false,
								'payrollgenerated': false,
								'_id': '5b8ab7802348e217789a494c'
							}
						]
					}
				],
				'_id': '5b7b6f98b6508309e8984bb6'
			}
		],
		'holiday': [
			'2019/05/09',
			'2019/05/22',
			'2019/05/20'
		]
	};

	busy: Subscription;
	public employeeFilter = '';
	public jobFilter = '';
	public matrixDatas: any = '';

	displayedColumns = [];
	displayedDates = [];

	isEmployerAvailable: boolean;
	isJobsAvailable: boolean;
	employers_list = [];
	jobs_list = [];

	monthLongValues: any[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	listOfMonths: any[] = [];
	listOfYears: any[] = [];
	appearance$: Observable<any>;
	SearchForm: FormGroup;

	selectedMonth;
	selectedYear;
	selectedEmployer;
	selectedJob;

	constructor(private datePipe: DatePipe, private _location: Location, private _httpService: ApiCallService, private asyncSubscriber: AsyncSubscriber, private fb: FormBuilder) {
		this.appearance$ = asyncSubscriber.getAppearance.pipe();
		this.getAllEmployers();
		this.generateMonths();
		this.generateYears();
	}

	// Get All Employers List
	getAllEmployers() {
		this.busy = this._httpService.getAllEmployers()
			.subscribe(
				response => {
					if (response.success) {
						this.employers_list = response.result;
					} else if (!response.success) {
						console.log(response);
					}
				},
				error => {
					this.employers_list = [];
					console.log(error);
				}
			);
	}

	// Get Jobs For Employer
	getEmployerJobs(event) {
		this.busy = this._httpService.getSingleEmployersJobsList({ 'employerid': event })
			.subscribe(
				response => {
					if (response.success) {
						this.jobs_list = response.result;
					} else if (!response.success) {
						console.log(response);
					}
				},
				error => {
					this.jobs_list = [];
					console.log(error);
				}
			);
	}

	// Generate List Of Months
	generateMonths() {
		for (let month = 1; month < 10; month++) {
			this.listOfMonths.push({ 'monthValue': month - 1, 'monthName': this.monthLongValues[month - 1] });
		}
		for (let month = 10; month <= 12; month++) {
			this.listOfMonths.push({ 'monthValue': month - 1, 'monthName': this.monthLongValues[month - 1] });
		}
		// console.log(this.listOfMonths);
	}

	// Generate List Of Years
	generateYears() {
		let currentYear = new Date().getFullYear();
		for (let year = currentYear; year >= currentYear - 25; year--) {
			this.listOfYears.push(year);
		}
		// console.log(this.listOfYears);
	}

	// If Job / Date Period Change
	changeSearch() {
		if (this.selectedJob !== undefined && this.selectedYear !== undefined && this.selectedMonth !== undefined) {
			this.getMatrixOffDays();
		}
	}

	// Get Off
	getMatrixOffDays() {
		// this.generateHeaderColumns();
		// this.matrixDatas = this.sampleResponse;
		// return false;

		this.busy = this._httpService.getMatrixOffDays({ 'jobid': this.selectedJob, 'from': this.datePipe.transform(new Date(this.selectedYear, this.selectedMonth, 1), 'yyyy/MM/dd'), 'to': this.datePipe.transform(new Date(this.selectedYear, this.selectedMonth + 1, 0), 'yyyy/MM/dd') })
			.subscribe(
				response => {
					if (response.success) {
						this.generateHeaderColumns();
						// let arrays = [];
						// console.log(response.result);
						// let arrayOfResult = arrays.push(response.result);
						this.matrixDatas = response.result;
						// console.log(arrayOfResult);
					} else if (!response.success) {
						console.log(response);
						this.generateHeaderColumns();
						this.matrixDatas = [];
					}
				},
				error => {
					console.log(error);
				}
			);
	}

	// Generate Header Column for selected Date Range
	generateHeaderColumns() {
		// Generate Dates In between days
		let datesInGivenPeriod = this.getDates(new Date(this.selectedYear, this.selectedMonth, 1), new Date(this.selectedYear, this.selectedMonth + 1, 0));

		if (datesInGivenPeriod.length === 0) { return false; } // if date list is Empty

		let displayedColumns = [];
		displayedColumns.push('name'); // Push 1st Column as Name
		let displayedDates = datesInGivenPeriod.map((date) => {
			displayedColumns.push(this.datePipe.transform(date, 'yyyy-MM-dd')); // Push Dates into Displayed Columns Array
			return this.datePipe.transform(date, 'yyyy-MM-dd'); // Format Date
		});
		this.displayedColumns = displayedColumns;
		this.displayedDates = displayedDates;
		// console.log(this.displayedDates);
	}

	// Generate in Between Dates, from given start and end date
	getDates(startDate, endDate) {
		let inBetweenDates = [];
		let currentDate = startDate;

		while (currentDate <= endDate) {
			inBetweenDates.push(currentDate);
			currentDate = new Date(currentDate.valueOf());
			currentDate.setDate(currentDate.getDate() + 1);
		}
		return inBetweenDates;
	}

	// Go TO Location Back
	backClicked() {
		this._location.back();
	}

	ngOnInit() { }
}
