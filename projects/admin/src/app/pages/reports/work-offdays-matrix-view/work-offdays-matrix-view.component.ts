import { Component, OnInit } from '@angular/core';
import { Location, DatePipe } from '@angular/common';
import { ApiCallService } from '../../../services/api-call.service';
import { Subscription, Observable } from 'rxjs';
import { AsyncSubscriber } from '../../../services/async.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
	selector: 'app-work-offdays-matrix-view',
	templateUrl: './work-offdays-matrix-view.component.html',
	styleUrls: ['./work-offdays-matrix-view.component.scss']
})
export class WorkOffdaysMatrixViewComponent implements OnInit {

	offDays = [
		{
			'name': 'name1',
			// 'day1': { 'offday': true, 'publicoffday': true, 'verified': true },
			// 'day2': { 'offday': false, 'publicoffday': true, 'verified': true },
			// 'day3': { 'offday': true, 'publicoffday': false, 'verified': false },
			// 'day4': { 'offday': false, 'publicoffday': false, 'verified': false },
			'timesheets': [
				{
					'day': 'day1',
					'date': "2019/02/01",
					'punchedin': false,
					'punchedout': false,
					'punchintime': "2018/08/14 00:00",
					'punchouttime': "2018/08/14 00:00",
					'verified': true,
					'_id': "5b71ab00249e740960d4ef2b",
				},
				{
					'day': 'day2',
					'date': "2019/02/02",
					'punchedin': false,
					'punchedout': false,
					'punchintime': "2018/08/14 00:00",
					'punchouttime': "2018/08/14 00:00",
					'verified': true,
					'_id': "5b71ab00249e740960d4ef2b",
				},
				{
					'day': 'day3',
					'date': "2019/02/03",
					'punchedin': false,
					'punchedout': false,
					'punchintime': "2018/08/14 00:00",
					'punchouttime': "2018/08/14 00:00",
					'verified': true,
					'_id': "5b71ab00249e740960d4ef2b",
				},
				{
					'day': 'day4',
					'date': "2019/02/04",
					'punchedin': false,
					'punchedout': false,
					'punchintime': "2018/08/14 00:00",
					'punchouttime': "2018/08/14 00:00",
					'verified': true,
					'_id': "5b71ab00249e740960d4ef2b",
				},
				{
					'day': 'day5',
					'date': "2019/02/05",
					'punchedin': false,
					'punchedout': false,
					'punchintime': "2018/08/14 00:00",
					'punchouttime': "2018/08/14 00:00",
					'verified': true,
					'_id': "5b71ab00249e740960d4ef2b",
				},
				{
					'day': 'day6',
					'date': "2019/02/06",
					'punchedin': false,
					'punchedout': false,
					'punchintime': "2018/08/14 00:00",
					'punchouttime': "2018/08/14 00:00",
					'verified': true,
					'_id': "5b71ab00249e740960d4ef2b",
				},
				{
					'day': 'day7',
					'date': "2019/02/07",
					'punchedin': false,
					'punchedout': false,
					'punchintime': "2018/08/14 00:00",
					'punchouttime': "2018/08/14 00:00",
					'verified': true,
					'_id': "5b71ab00249e740960d4ef2b",
				},
				{
					'day': 'day8',
					'date': "2019/02/08",
					'punchedin': false,
					'punchedout': false,
					'punchintime': "2018/08/14 00:00",
					'punchouttime': "2018/08/14 00:00",
					'verified': true,
					'_id': "5b71ab00249e740960d4ef2b",
				}
			]
		},
		{
			'name': 'name2',
			// 'day1': { 'offday': true, 'publicoffday': true, 'verified': true },
			// 'day2': { 'offday': false, 'publicoffday': true, 'verified': true },
			// 'day3': { 'offday': true, 'publicoffday': false, 'verified': false },
			// 'day4': { 'offday': false, 'publicoffday': false, 'verified': false },
			'timesheets': [
				{
					'day': 'day1',
					'date': "2019/02/01",
					'punchedin': false,
					'punchedout': false,
					'punchintime': "2018/08/14 00:00",
					'punchouttime': "2018/08/14 00:00",
					'verified': true,
					'_id': "5b71ab00249e740960d4ef2b",
				},
				{
					'day': 'day2',
					'date': "2019/02/02",
					'punchedin': false,
					'punchedout': false,
					'punchintime': "2018/08/14 00:00",
					'punchouttime': "2018/08/14 00:00",
					'verified': true,
					'_id': "5b71ab00249e740960d4ef2b",
				},
				{
					'day': 'day3',
					'date': "2019/02/03",
					'punchedin': false,
					'punchedout': false,
					'punchintime': "2018/08/14 00:00",
					'punchouttime': "2018/08/14 00:00",
					'verified': true,
					'_id': "5b71ab00249e740960d4ef2b",
				},
				{
					'day': 'day4',
					'date': "2019/02/04",
					'punchedin': false,
					'punchedout': false,
					'punchintime': "2018/08/14 00:00",
					'punchouttime': "2018/08/14 00:00",
					'verified': true,
					'_id': "5b71ab00249e740960d4ef2b",
				},
				{
					'day': 'day5',
					'date': "2019/02/05",
					'punchedin': false,
					'punchedout': false,
					'punchintime': "2018/08/14 00:00",
					'punchouttime': "2018/08/14 00:00",
					'verified': true,
					'_id': "5b71ab00249e740960d4ef2b",
				},
				{
					'day': 'day6',
					'date': "2019/02/06",
					'punchedin': false,
					'punchedout': false,
					'punchintime': "2018/08/14 00:00",
					'punchouttime': "2018/08/14 00:00",
					'verified': true,
					'_id': "5b71ab00249e740960d4ef2b",
				},
				{
					'day': 'day7',
					'date': "2019/02/07",
					'punchedin': false,
					'punchedout': false,
					'punchintime': "2018/08/14 00:00",
					'punchouttime': "2018/08/14 00:00",
					'verified': true,
					'_id': "5b71ab00249e740960d4ef2b",
				},
				{
					'day': 'day8',
					'date': "2019/02/08",
					'punchedin': false,
					'punchedout': false,
					'punchintime': "2018/08/14 00:00",
					'punchouttime': "2018/08/14 00:00",
					'verified': true,
					'_id': "5b71ab00249e740960d4ef2b",
				}
			]
		}
	]

	// offDays = [
	// 	{
	// 		'name': 'name1',
	// 		// 'day1': { 'offday': true, 'publicoffday': true, 'verified': true },
	// 		// 'day2': { 'offday': false, 'publicoffday': true, 'verified': true },
	// 		// 'day3': { 'offday': true, 'publicoffday': false, 'verified': false },
	// 		// 'day4': { 'offday': false, 'publicoffday': false, 'verified': false },
	// 		'timesheets': [
	// 			{
	// 				'day': 'day1',
	// 				'date': "2018/08/14",
	// 				'late': false,
	// 				'lateinhour': "00:00",
	// 				'lateintimation': false,
	// 				'normalsalary': 192,
	// 				'normalworkhour': "07:30",
	// 				'notes': "",
	// 				'oogetscommission': 23.1,
	// 				'otsalary': 230.4,
	// 				'otworkhour': "06:00",
	// 				'payrollgenerated': false,
	// 				'punchedin': false,
	// 				'punchedout': false,
	// 				'punchintime': "2018/08/14 00:00",
	// 				'punchouttime': "2018/08/14 00:00",
	// 				'salarymultiplier': 1,
	// 				'totalsalary': 422.4,
	// 				'totalworkhour': "13:30",
	// 				'verified': true,
	// 				'verifiedpunchinedited': false,
	// 				'verifiedpunchintime': "2018/08/14 09:00",
	// 				'verifiedpunchoutedited': false,
	// 				'verifiedpunchouttime': "2018/08/15 00:00",
	// 				'_id': "5b71ab00249e740960d4ef2b",
	// 			},
	// 			{
	// 				'day': 'day2',
	// 				'date': "2018/08/14",
	// 				'late': false,
	// 				'lateinhour': "00:00",
	// 				'lateintimation': false,
	// 				'normalsalary': 193,
	// 				'normalworkhour': "07:31",
	// 				'notes': "",
	// 				'oogetscommission': 23.1,
	// 				'otsalary': 230.4,
	// 				'otworkhour': "06:00",
	// 				'payrollgenerated': false,
	// 				'punchedin': false,
	// 				'punchedout': false,
	// 				'punchintime': "2018/08/14 00:00",
	// 				'punchouttime': "2018/08/14 00:00",
	// 				'salarymultiplier': 1,
	// 				'totalsalary': 422.4,
	// 				'totalworkhour': "13:30",
	// 				'verified': true,
	// 				'verifiedpunchinedited': false,
	// 				'verifiedpunchintime': "2018/08/14 09:00",
	// 				'verifiedpunchoutedited': false,
	// 				'verifiedpunchouttime': "2018/08/15 00:00",
	// 				'_id': "5b71ab00249e740960d4ef2b",
	// 			}
	// 		]
	// 	},
	// 	{
	// 		'name': 'name2',
	// 		// 'day1': { 'offday': true, 'publicoffday': true, 'verified': true },
	// 		// 'day2': { 'offday': false, 'publicoffday': true, 'verified': true },
	// 		// 'day3': { 'offday': true, 'publicoffday': false, 'verified': false },
	// 		// 'day4': { 'offday': false, 'publicoffday': false, 'verified': false },
	// 		'timesheets': [
	// 			{
	// 				'day': 'day1',
	// 				'date': "2018/08/14",
	// 				'late': false,
	// 				'lateinhour': "00:00",
	// 				'lateintimation': false,
	// 				'normalsalary': 192,
	// 				'normalworkhour': "07:30",
	// 				'notes': "",
	// 				'oogetscommission': 23.1,
	// 				'otsalary': 230.4,
	// 				'otworkhour': "06:00",
	// 				'payrollgenerated': false,
	// 				'punchedin': false,
	// 				'punchedout': false,
	// 				'punchintime': "2018/08/14 00:00",
	// 				'punchouttime': "2018/08/14 00:00",
	// 				'salarymultiplier': 1,
	// 				'totalsalary': 422.4,
	// 				'totalworkhour': "13:30",
	// 				'verified': true,
	// 				'verifiedpunchinedited': false,
	// 				'verifiedpunchintime': "2018/08/14 09:00",
	// 				'verifiedpunchoutedited': false,
	// 				'verifiedpunchouttime': "2018/08/15 00:00",
	// 				'_id': "5b71ab00249e740960d4ef2b",
	// 			},
	// 			{
	// 				'day': 'day2',
	// 				'date': "2018/08/14",
	// 				'late': false,
	// 				'lateinhour': "00:00",
	// 				'lateintimation': false,
	// 				'normalsalary': 193,
	// 				'normalworkhour': "07:31",
	// 				'notes': "",
	// 				'oogetscommission': 23.1,
	// 				'otsalary': 230.4,
	// 				'otworkhour': "06:00",
	// 				'payrollgenerated': false,
	// 				'punchedin': false,
	// 				'punchedout': false,
	// 				'punchintime': "2018/08/14 00:00",
	// 				'punchouttime': "2018/08/14 00:00",
	// 				'salarymultiplier': 1,
	// 				'totalsalary': 422.4,
	// 				'totalworkhour': "13:30",
	// 				'verified': true,
	// 				'verifiedpunchinedited': false,
	// 				'verifiedpunchintime': "2018/08/14 09:00",
	// 				'verifiedpunchoutedited': false,
	// 				'verifiedpunchouttime': "2018/08/15 00:00",
	// 				'_id': "5b71ab00249e740960d4ef2b",
	// 			}
	// 		]
	// 	}
	// ]

	//busy Config

	offDays1 = [
		{
			'name': 'name1',
			// 'day1': { 'offday': true, 'publicoffday': true, 'verified': true },
			// 'day2': { 'offday': false, 'publicoffday': true, 'verified': true },
			// 'day3': { 'offday': true, 'publicoffday': false, 'verified': false },
			// 'day4': { 'offday': false, 'publicoffday': false, 'verified': false },
			'timesheets': [
				{
					'day': 'day1',
					'date': "2019/03/01",
					'punchedin': false,
					'punchedout': false,
					'punchintime': "2018/08/14 00:00",
					'punchouttime': "2018/08/14 00:00",
					'verified': true,
					'_id': "5b71ab00249e740960d4ef2b",
				},
				{
					'day': 'day2',
					'date': "2019/03/02",
					'punchedin': false,
					'punchedout': false,
					'punchintime': "2018/08/14 00:00",
					'punchouttime': "2018/08/14 00:00",
					'verified': true,
					'_id': "5b71ab00249e740960d4ef2b",
				},
				{
					'day': 'day3',
					'date': "2019/03/03",
					'punchedin': false,
					'punchedout': false,
					'punchintime': "2018/08/14 00:00",
					'punchouttime': "2018/08/14 00:00",
					'verified': true,
					'_id': "5b71ab00249e740960d4ef2b",
				},
				{
					'day': 'day4',
					'date': "2019/03/04",
					'punchedin': false,
					'punchedout': false,
					'punchintime': "2018/08/14 00:00",
					'punchouttime': "2018/08/14 00:00",
					'verified': true,
					'_id': "5b71ab00249e740960d4ef2b",
				},
				{
					'day': 'day5',
					'date': "2019/03/05",
					'punchedin': false,
					'punchedout': false,
					'punchintime': "2018/08/14 00:00",
					'punchouttime': "2018/08/14 00:00",
					'verified': true,
					'_id': "5b71ab00249e740960d4ef2b",
				},
				{
					'day': 'day6',
					'date': "2019/03/06",
					'punchedin': false,
					'punchedout': false,
					'punchintime': "2018/08/14 00:00",
					'punchouttime': "2018/08/14 00:00",
					'verified': true,
					'_id': "5b71ab00249e740960d4ef2b",
				},
				{
					'day': 'day7',
					'date': "2019/03/07",
					'punchedin': false,
					'punchedout': false,
					'punchintime': "2018/08/14 00:00",
					'punchouttime': "2018/08/14 00:00",
					'verified': true,
					'_id': "5b71ab00249e740960d4ef2b",
				},
				{
					'day': 'day8',
					'date': "2019/03/08",
					'punchedin': false,
					'punchedout': false,
					'punchintime': "2018/08/14 00:00",
					'punchouttime': "2018/08/14 00:00",
					'verified': true,
					'_id': "5b71ab00249e740960d4ef2b",
				}
			]
		},
		{
			'name': 'name2',
			// 'day1': { 'offday': true, 'publicoffday': true, 'verified': true },
			// 'day2': { 'offday': false, 'publicoffday': true, 'verified': true },
			// 'day3': { 'offday': true, 'publicoffday': false, 'verified': false },
			// 'day4': { 'offday': false, 'publicoffday': false, 'verified': false },
			'timesheets': [
				{
					'day': 'day1',
					'date': "2019/03/01",
					'punchedin': false,
					'punchedout': false,
					'punchintime': "2018/08/14 00:00",
					'punchouttime': "2018/08/14 00:00",
					'verified': true,
					'_id': "5b71ab00249e740960d4ef2b",
				},
				{
					'day': 'day2',
					'date': "2019/03/02",
					'punchedin': false,
					'punchedout': false,
					'punchintime': "2018/08/14 00:00",
					'punchouttime': "2018/08/14 00:00",
					'verified': true,
					'_id': "5b71ab00249e740960d4ef2b",
				},
				{
					'day': 'day3',
					'date': "2019/03/03",
					'punchedin': false,
					'punchedout': false,
					'punchintime': "2018/08/14 00:00",
					'punchouttime': "2018/08/14 00:00",
					'verified': true,
					'_id': "5b71ab00249e740960d4ef2b",
				},
				{
					'day': 'day4',
					'date': "2019/03/04",
					'punchedin': false,
					'punchedout': false,
					'punchintime': "2018/08/14 00:00",
					'punchouttime': "2018/08/14 00:00",
					'verified': true,
					'_id': "5b71ab00249e740960d4ef2b",
				},
				{
					'day': 'day5',
					'date': "2019/03/05",
					'punchedin': false,
					'punchedout': false,
					'punchintime': "2018/08/14 00:00",
					'punchouttime': "2018/08/14 00:00",
					'verified': true,
					'_id': "5b71ab00249e740960d4ef2b",
				},
				{
					'day': 'day6',
					'date': "2019/03/06",
					'punchedin': false,
					'punchedout': false,
					'punchintime': "2018/08/14 00:00",
					'punchouttime': "2018/08/14 00:00",
					'verified': true,
					'_id': "5b71ab00249e740960d4ef2b",
				},
				{
					'day': 'day7',
					'date': "2019/03/07",
					'punchedin': false,
					'punchedout': false,
					'punchintime': "2018/08/14 00:00",
					'punchouttime': "2018/08/14 00:00",
					'verified': true,
					'_id': "5b71ab00249e740960d4ef2b",
				},
				{
					'day': 'day8',
					'date': "2019/03/08",
					'punchedin': false,
					'punchedout': false,
					'punchintime': "2018/08/14 00:00",
					'punchouttime': "2018/08/14 00:00",
					'verified': true,
					'_id': "5b71ab00249e740960d4ef2b",
				}
			]
		}
	]


	busy: Subscription;
	public employeeFilter: string = '';
	public jobFilter: string = '';

	// displayedColumns = ['name', 'day1', 'day2', 'day3', 'day4', 'day5'];
	displayedColumns = [];
	displayedDates = [];

	employerDatas;

	isEmployerAvailable: boolean;
	employerCount;
	employers_list;
	SelectedEmployer;

	monthLongValues: any[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	months: any[] = [];
	years: any[] = [];
	appearance$: Observable<any>;
	SearchForm: FormGroup;
	month;
	year;

	constructor(private datePipe: DatePipe, private _location: Location, private _httpService: ApiCallService, private asyncSubscriber: AsyncSubscriber, private fb: FormBuilder, ) {
		this.appearance$ = asyncSubscriber.getAppearance.pipe();
		// this.getAllEmployers();
		this.generateMonths();
		this.generateYears();
	}

	// getAllEmployers() {
	// 	this.busy = this._httpService.getAllEmployers()
	// 		.subscribe(
	// 			response => {
	// 				if (response.success) {
	// 					console.log(response.employers);
	// 					if ((response.employers).length > 0) {
	// 						this.isEmployerAvailable = true;
	// 						this.employerCount = (response.employers).length;
	// 						this.employers_list = response.employers;
	// 					} else {
	// 						this.isEmployerAvailable = false;
	// 					}
	// 				} else if (!response.success) {
	// 					console.log(response);
	// 				}
	// 			},
	// 			error => {
	// 				console.log(error);
	// 			}
	// 		);
	// }

	// getEmployerJobs(event) {
	// 	console.log(event);
	// 	this.busy = this._httpService.getEmployerJobs({ 'companyid': event })
	// 		.subscribe(
	// 			response => {
	// 				if (response.success) {
	// 					// console.log(response.employerreport);
	// 					if ((response.employerreport).length > 0) {
	// 						// this.isEmployerAvailable = true;
	// 						// this.employerCount = (response.employerreport).length;
	// 						// this.employers_list = response.employerreport;

	// 						// this.employerDatas = response.employerreport[0];
	// 						console.log(this.employerDatas);
	// 					} else {
	// 						this.isEmployerAvailable = false;
	// 					}
	// 				} else if (!response.success) {
	// 					console.log(response);
	// 				}
	// 			},
	// 			error => {
	// 				console.log(error);
	// 			}
	// 		);
	// }

	// Months Generate
	generateMonths() {
		for (let month = 1; month < 10; month++) {
			this.months.push({ "monthValue": month - 1, "monthName": this.monthLongValues[month - 1] });
		}
		for (let month = 10; month <= 12; month++) {
			this.months.push({ "monthValue": month - 1, "monthName": this.monthLongValues[month - 1] });
		}

		console.log(this.months);
	}

	// Years Generate
	generateYears() {
		let currentYear = new Date().getFullYear();
		for (let year = currentYear; year >= currentYear - 25; year--) {
			this.years.push(year);
		}
		console.log(this.years);
	}

	backClicked() {
		this._location.back();
	}

	getDates(startDate, endDate) {
		var dates = [];
		var currentDate = startDate;

		while (currentDate <= endDate) {
			dates.push(currentDate);
			currentDate = new Date(currentDate.valueOf());
			currentDate.setDate(currentDate.getDate() + 1);
		}
		return dates;
	}

	// If Employment Type Change
	changeSearch(event) {
		console.log(this.month);
		console.log(this.year);

		let dates = this.getDates(new Date(this.year, this.month, 1), new Date(this.year, this.month + 1, 0));

		let displayedColumns = [];
		displayedColumns.push('name');
		let displayedDates = dates.map((item) => {
			displayedColumns.push(this.datePipe.transform(item, 'yyyy/MM/dd'));
			return this.datePipe.transform(item, 'yyyy/MM/dd');
		});
		this.displayedColumns = displayedColumns;
		this.displayedDates = displayedDates;
		this.offDays = this.offDays1;
		console.log(this.displayedColumns);
		console.log(this.displayedDates);
	}

	ngOnInit() {
		this.month = 1;
		this.year = 2019;

		// var firstDay = new Date(this.year, this.month, 1);
		// var lastDay = new Date(this.year, this.month + 1, 0);

		// Generate Dates
		let dates = this.getDates(new Date(this.year, this.month, 1), new Date(this.year, this.month + 1, 0));

		let displayedColumns = [];
		displayedColumns.push('name');
		let displayedDates = dates.map((item) => {
			displayedColumns.push(this.datePipe.transform(item, 'yyyy/MM/dd'));
			return this.datePipe.transform(item, 'yyyy/MM/dd');
		});
		this.displayedColumns = displayedColumns;
		this.displayedDates = displayedDates;
	}
}
