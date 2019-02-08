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

	// contracts = [
	// 	{
	// 		"contractstatus": "closed",
	// 		"offdays": [],
	// 		"jobseekername": "Tee Chee",
	// 		"timesheets": [
	// 			{
	// 				"date": "2019/01/09",
	// 				"punchintime": "2019/01/09 11:30",
	// 				"verifiedpunchintime": "2019/01/09 11:45",
	// 				"punchouttime": "2019/01/09 14:14",
	// 				"verifiedpunchouttime": "2019/01/09 14:14",
	// 				"punchedin": true,
	// 				"punchedout": true,
	// 				"verifiedpunchinedited": false,
	// 				"verifiedpunchoutedited": false,
	// 				"notes": "",
	// 				"late": false,
	// 				"lateinhour": "00:00",
	// 				"lateintimation": false,
	// 				"normalworkhour": "01:29",
	// 				"otworkhour": "00:00",
	// 				"totalworkhour": "01:29",
	// 				"normalsalary": 31.25,
	// 				"otsalary": 0,
	// 				"totalsalary": 31.25,
	// 				"oogetscommission": 6.25,
	// 				"salarymultiplier": 1,
	// 				"verified": false,
	// 				"payrollgenerated": false,
	// 				"_id": "5c356ab807aa2e0dc4b37124"
	// 			},
	// 			{
	// 				"date": "2019/01/10",
	// 				"punchintime": "2019/01/10 00:00",
	// 				"verifiedpunchintime": "2019/01/10 00:00",
	// 				"punchouttime": "2019/01/10 00:00",
	// 				"verifiedpunchouttime": "2019/01/10 00:00",
	// 				"punchedin": false,
	// 				"punchedout": false,
	// 				"verifiedpunchinedited": false,
	// 				"verifiedpunchoutedited": false,
	// 				"notes": "",
	// 				"late": false,
	// 				"lateinhour": "00:00",
	// 				"lateintimation": false,
	// 				"normalworkhour": "00:00",
	// 				"otworkhour": "00:00",
	// 				"totalworkhour": "00:00",
	// 				"normalsalary": 0,
	// 				"otsalary": 0,
	// 				"totalsalary": 0,
	// 				"oogetscommission": 0,
	// 				"salarymultiplier": 1,
	// 				"verified": false,
	// 				"payrollgenerated": false,
	// 				"_id": "5c361a80e760ca0514defda6"
	// 			}
	// 		]
	// 	},
	// 	{
	// 		"contractstatus": "closed",
	// 		"offdays": [],
	// 		"jobseekername": "Tee Yuan",
	// 		"timesheets": [
	// 			{
	// 				"date": "2019/01/11",
	// 				"punchintime": "2019/01/09 11:30",
	// 				"verifiedpunchintime": "2019/01/09 11:45",
	// 				"punchouttime": "2019/01/09 14:14",
	// 				"verifiedpunchouttime": "2019/01/09 14:14",
	// 				"punchedin": true,
	// 				"punchedout": true,
	// 				"verifiedpunchinedited": false,
	// 				"verifiedpunchoutedited": false,
	// 				"notes": "",
	// 				"late": false,
	// 				"lateinhour": "00:00",
	// 				"lateintimation": false,
	// 				"normalworkhour": "01:29",
	// 				"otworkhour": "00:00",
	// 				"totalworkhour": "01:29",
	// 				"normalsalary": 31.25,
	// 				"otsalary": 0,
	// 				"totalsalary": 31.25,
	// 				"oogetscommission": 6.25,
	// 				"salarymultiplier": 1,
	// 				"verified": false,
	// 				"payrollgenerated": false,
	// 				"_id": "5c356ab807aa2e0dc4b37124"
	// 			},
	// 			{
	// 				"date": "2019/01/13",
	// 				"punchintime": "2019/01/10 00:00",
	// 				"verifiedpunchintime": "2019/01/10 00:00",
	// 				"punchouttime": "2019/01/10 00:00",
	// 				"verifiedpunchouttime": "2019/01/10 00:00",
	// 				"punchedin": false,
	// 				"punchedout": false,
	// 				"verifiedpunchinedited": false,
	// 				"verifiedpunchoutedited": false,
	// 				"notes": "",
	// 				"late": false,
	// 				"lateinhour": "00:00",
	// 				"lateintimation": false,
	// 				"normalworkhour": "00:00",
	// 				"otworkhour": "00:00",
	// 				"totalworkhour": "00:00",
	// 				"normalsalary": 0,
	// 				"otsalary": 0,
	// 				"totalsalary": 0,
	// 				"oogetscommission": 0,
	// 				"salarymultiplier": 1,
	// 				"verified": false,
	// 				"payrollgenerated": false,
	// 				"_id": "5c361a80e760ca0514defda6"
	// 			}
	// 		]
	// 	}
	// ]

	//busy Config

	sampleResponse: any = {
		"success": true,
		"code": 200,
		"job": [
			{
				"workdays": {
					'sunday': false,
					'monday': true,
					'tuesday': true,
					'wednesday': true,
					'thursday': true,
					'friday': true,
					'saturday': false,
				},
				"workdaystype": "flexible",
				"contracts": [
					{
						"contractstatus": "closed",
						"offdays": [
							{
								"date": "2018/08/29",
								"_id": "5b7f62345ac6b313fc6b7144"
							},
							{
								"date": "2018/08/31",
								"_id": "5b7f62345ac6b313fc6b7144"
							}
						],
						"jobseekername": "YYT",
						"timesheets": [
							{
								"date": "2018/08/31",
								"punchintime": "2018/08/31 00:00",
								"verifiedpunchintime": "2018/08/31 00:00",
								"punchouttime": "2018/08/31 00:00",
								"verifiedpunchouttime": "2018/08/31 00:00",
								"punchedin": false,
								"punchedout": false,
								"verifiedpunchinedited": false,
								"verifiedpunchoutedited": false,
								"notes": "",
								"late": false,
								"lateinhour": "00:00",
								"lateintimation": false,
								"normalworkhour": "00:00",
								"otworkhour": "00:00",
								"totalworkhour": "00:00",
								"normalsalary": 0,
								"otsalary": 0,
								"totalsalary": 0,
								"oogetscommission": 0,
								"salarymultiplier": 1.5,
								"verified": true,
								"payrollgenerated": false,
								"_id": "5b8814802348e217789a4932"
							},
							{
								"date": "2018/08/27",
								"punchintime": "2018/09/01 00:00",
								"verifiedpunchintime": "2018/09/01 00:00",
								"punchouttime": "2018/09/01 00:00",
								"verifiedpunchouttime": "2018/09/01 00:00",
								"punchedin": false,
								"punchedout": false,
								"verifiedpunchinedited": false,
								"verifiedpunchoutedited": false,
								"notes": "",
								"late": false,
								"lateinhour": "00:00",
								"lateintimation": false,
								"normalworkhour": "00:00",
								"otworkhour": "00:00",
								"totalworkhour": "00:00",
								"normalsalary": 0,
								"otsalary": 0,
								"totalsalary": 0,
								"oogetscommission": 0,
								"salarymultiplier": 1,
								"verified": false,
								"payrollgenerated": false,
								"_id": "5b8966002348e217789a4947"
							},
							{
								"date": "2018/09/02",
								"punchintime": "2018/09/02 00:00",
								"verifiedpunchintime": "2018/09/02 00:00",
								"punchouttime": "2018/09/02 00:00",
								"verifiedpunchouttime": "2018/09/02 00:00",
								"punchedin": false,
								"punchedout": false,
								"verifiedpunchinedited": false,
								"verifiedpunchoutedited": false,
								"notes": "",
								"late": false,
								"lateinhour": "00:00",
								"lateintimation": false,
								"normalworkhour": "00:00",
								"otworkhour": "00:00",
								"totalworkhour": "00:00",
								"normalsalary": 0,
								"otsalary": 0,
								"totalsalary": 0,
								"oogetscommission": 0,
								"salarymultiplier": 1,
								"verified": false,
								"payrollgenerated": false,
								"_id": "5b8ab7802348e217789a494a"
							}
						]
					},
					{
						"contractstatus": "closed",
						"offdays": [],
						"jobseekername": "Bevin Yap ",
						"timesheets": [
							{
								"date": "2018/08/31",
								"punchintime": "2018/08/31 00:00",
								"verifiedpunchintime": "2018/08/31 00:00",
								"punchouttime": "2018/08/31 00:00",
								"verifiedpunchouttime": "2018/08/31 00:00",
								"punchedin": false,
								"punchedout": false,
								"verifiedpunchinedited": false,
								"verifiedpunchoutedited": false,
								"notes": "",
								"late": false,
								"lateinhour": "00:00",
								"lateintimation": false,
								"normalworkhour": "00:00",
								"otworkhour": "00:00",
								"totalworkhour": "00:00",
								"normalsalary": 0,
								"otsalary": 0,
								"totalsalary": 0,
								"oogetscommission": 0,
								"salarymultiplier": 1,
								"verified": false,
								"payrollgenerated": false,
								"_id": "5b8814802348e217789a4934"
							},
							{
								"date": "2018/09/01",
								"punchintime": "2018/09/01 00:00",
								"verifiedpunchintime": "2018/09/01 00:00",
								"punchouttime": "2018/09/01 00:00",
								"verifiedpunchouttime": "2018/09/01 00:00",
								"punchedin": false,
								"punchedout": false,
								"verifiedpunchinedited": false,
								"verifiedpunchoutedited": false,
								"notes": "",
								"late": false,
								"lateinhour": "00:00",
								"lateintimation": false,
								"normalworkhour": "00:00",
								"otworkhour": "00:00",
								"totalworkhour": "00:00",
								"normalsalary": 0,
								"otsalary": 0,
								"totalsalary": 0,
								"oogetscommission": 0,
								"salarymultiplier": 1,
								"verified": false,
								"payrollgenerated": false,
								"_id": "5b8966002348e217789a4949"
							},
							{
								"date": "2018/09/02",
								"punchintime": "2018/09/02 00:00",
								"verifiedpunchintime": "2018/09/02 00:00",
								"punchouttime": "2018/09/02 00:00",
								"verifiedpunchouttime": "2018/09/02 00:00",
								"punchedin": false,
								"punchedout": false,
								"verifiedpunchinedited": false,
								"verifiedpunchoutedited": false,
								"notes": "",
								"late": false,
								"lateinhour": "00:00",
								"lateintimation": false,
								"normalworkhour": "00:00",
								"otworkhour": "00:00",
								"totalworkhour": "00:00",
								"normalsalary": 0,
								"otsalary": 0,
								"totalsalary": 0,
								"oogetscommission": 0,
								"salarymultiplier": 1,
								"verified": false,
								"payrollgenerated": false,
								"_id": "5b8ab7802348e217789a494c"
							}
						]
					}
				],
				"_id": "5b7b6f98b6508309e8984bb6"
			}
		],
		"holiday": [
			"2018/08/09",
			"2018/08/22",
			"2018/08/20"
		]
	}

	response: any = '';

	busy: Subscription;
	public employeeFilter: string = '';
	public jobFilter: string = '';

	// displayedColumns = ['name', 'day1', 'day2', 'day3', 'day4', 'day5'];
	displayedColumns = [];
	displayedDates = [];

	employerDatas;

	isEmployerAvailable: boolean;
	isJobsAvailable: boolean;
	employerCount;
	jobCount;
	employers_list = [];
	jobs_list = [];
	selectedEmployer;
	selectedJob;

	monthLongValues: any[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	months: any[] = [];
	years: any[] = [];
	appearance$: Observable<any>;
	SearchForm: FormGroup;
	month;
	year;

	constructor(private datePipe: DatePipe, private _location: Location, private _httpService: ApiCallService, private asyncSubscriber: AsyncSubscriber, private fb: FormBuilder, ) {
		this.appearance$ = asyncSubscriber.getAppearance.pipe();
		this.getAllEmployers();
		this.generateMonths();
		this.generateYears();
	}

	getAllEmployers() {
		this.busy = this._httpService.getAllEmployers()
			.subscribe(
				response => {
					if (response.success) {
						this.employers_list = response.employers;
					} else if (!response.success) {
						console.log(response);
					}
				},
				error => {
					console.log(error);
				}
			);
	}

	getEmployerJobs(event) {
		this.busy = this._httpService.getSingleEmployersJobsList({ 'companyid': event })
			.subscribe(
				response => {
					if (response.success) {
						this.jobs_list = response.jobs;
					} else if (!response.success) {
						console.log(response);
					}
				},
				error => {
					console.log(error);
				}
			);
	}

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
		console.log(this.selectedJob);

		this.busy = this._httpService.getMatrixOffDays({ 'jobid': this.selectedJob, 'fromdate': this.datePipe.transform(new Date(this.year, this.month, 1), 'yyyy/MM/dd'), 'todate': this.datePipe.transform(new Date(this.year, this.month + 1, 0), 'yyyy/MM/dd') })
			.subscribe(
				response => {
					if (response.success) {
						this.generateHeaderColumns();
						this.response = response;
					} else if (!response.success) {
						console.log(response);
					}
				},
				error => {
					console.log(error);
				}
			);
	}

	generateHeaderColumns() {
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

	ngOnInit() {
		this.month = 7;
		this.year = 2018;

		// this.response = this.sampleResponse;
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
