import { Component, OnInit } from '@angular/core';
import { Location, DatePipe } from '@angular/common';
import { ApiCallService } from '../../../services/api-call.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-jobseeker-timesheet-report',
	templateUrl: './jobseeker-timesheet-report.component.html',
	styleUrls: ['./jobseeker-timesheet-report.component.scss']
})
export class JobseekerTimesheetReportComponent implements OnInit {

	step;
	setStep(index: number) {
		this.step = index;
	}
	onEvent(event) {
		event.stopPropagation();
	}
	//busy Config
	busy: Subscription;
	public employeeFilter: string = '';
	public jobFilter: string = '';
	// displayedColumns: any[] = [
	// 	{
	// 		name: 'date',
	// 		displayName: 'Date',
	// 	},
	// 	{
	// 		name: 'punchintime',
	// 		displayName: 'In Time',
	// 	},
	// 	{
	// 		name: 'punchouttime',
	// 		displayName: 'Out Time',
	// 	},
	// 	{
	// 		name: 'verifiedpunchintime',
	// 		displayName: 'Out Time',
	// 	},
	// 	{
	// 		name: 'verifiedpunchouttime',
	// 		displayName: 'Out Time',
	// 	},
	// 	{
	// 		name: 'normalworkhour',
	// 		displayName: 'Nor. hr',
	// 	},
	// 	{
	// 		name: 'otworkhour',
	// 		displayName: 'OT Hr',
	// 	},
	// 	{
	// 		name: 'totalworkhour',
	// 		displayName: 'Tot.Hr',
	// 	},
	// 	{
	// 		name: 'normalsalary',
	// 		displayName: 'Nor. Sal',
	// 	},
	// 	{
	// 		name: 'otsalary',
	// 		displayName: 'OT Sal',
	// 	},
	// 	{
	// 		name: 'totalsalary',
	// 		displayName: 'Tot. Sal',
	// 	},
	// 	{
	// 		name: 'salarymultiplier',
	// 		displayName: 'OT Type',
	// 	}
	// ];

	displayedColumns = ['work_date', 'work_day', 'in_time', 'out_time', 'verified', 'verifiedpunchintime', 'verifiedpunchouttime', 'normalworkhour', 'otworkhour1', 'otworkhour2', 'totalworkhour', 'normalsalary', 'ot1salary', 'ot2salary', 'totalsalary', 'invoiceno'];

	employerDatas: any[] = [];

	DemoemployerDatas1 = {
		'jobperiod': '01-01-2019 to 15-01-2019',
		'contracts': [
			{
				'company': 'company ABC',
				'worktime': '9am to 6pm',
				'breaks': [{
					'breakname': 'lunch',
					'start': '1pm',
					'end': '2pm'
				}],
				'rate': '25',
				'timesheets': [
					{
						'date': "2018/08/14",
						'late': false,
						'lateinhour': "00:00",
						'lateintimation': false,
						'normalsalary': 192,
						'normalworkhour': "07:30",
						'notes': "",
						'oogetscommission': 23.1,
						'otsalary': 230.4,
						'otworkhour': "06:00",
						'payrollgenerated': false,
						'punchedin': false,
						'punchedout': false,
						'punchintime': "2018/08/14 00:00",
						'punchouttime': "2018/08/14 00:00",
						'salarymultiplier': 1,
						'totalsalary': 422.4,
						'totalworkhour': "13:30",
						'verified': true,
						'verifiedpunchinedited': false,
						'verifiedpunchintime': "2018/08/14 09:00",
						'verifiedpunchoutedited': false,
						'verifiedpunchouttime': "2018/08/15 00:00",
						'_id': "5b71ab00249e740960d4ef2b",
					},
					{
						'date': "2018/08/15",
						'late': false,
						'lateinhour': "00:00",
						'lateintimation': false,
						'normalsalary': 193,
						'normalworkhour': "07:31",
						'notes': "",
						'oogetscommission': 23.1,
						'otsalary': 230.4,
						'otworkhour': "06:00",
						'payrollgenerated': false,
						'punchedin': false,
						'punchedout': false,
						'punchintime': "2018/08/14 00:00",
						'punchouttime': "2018/08/14 00:00",
						'salarymultiplier': 1,
						'totalsalary': 422.4,
						'totalworkhour': "13:30",
						'verified': true,
						'verifiedpunchinedited': false,
						'verifiedpunchintime': "2018/08/14 09:00",
						'verifiedpunchoutedited': false,
						'verifiedpunchouttime': "2018/08/15 00:00",
						'_id': "5b71ab00249e740960d4ef2b",
					},
					{
						'date': "2018/08/16",
						'late': false,
						'lateinhour': "00:00",
						'lateintimation': false,
						'normalsalary': 192,
						'normalworkhour': "07:30",
						'notes': "",
						'oogetscommission': 23.1,
						'otsalary': 230.4,
						'otworkhour': "06:00",
						'payrollgenerated': false,
						'punchedin': false,
						'punchedout': false,
						'punchintime': "2018/08/14 00:00",
						'punchouttime': "2018/08/14 00:00",
						'salarymultiplier': 1,
						'totalsalary': 422.4,
						'totalworkhour': "13:30",
						'verified': true,
						'verifiedpunchinedited': false,
						'verifiedpunchintime': "2018/08/14 09:00",
						'verifiedpunchoutedited': false,
						'verifiedpunchouttime': "2018/08/15 00:00",
						'_id': "5b71ab00249e740960d4ef2b",
					},
					{
						'date': "2018/08/17",
						'late': false,
						'lateinhour': "00:00",
						'lateintimation': false,
						'normalsalary': 192,
						'normalworkhour': "07:30",
						'notes': "",
						'oogetscommission': 23.1,
						'otsalary': 230.4,
						'otworkhour': "06:00",
						'payrollgenerated': false,
						'punchedin': false,
						'punchedout': false,
						'punchintime': "2018/08/14 00:00",
						'punchouttime': "2018/08/14 00:00",
						'salarymultiplier': 1,
						'totalsalary': 422.4,
						'totalworkhour': "13:30",
						'verified': true,
						'verifiedpunchinedited': false,
						'verifiedpunchintime': "2018/08/14 09:00",
						'verifiedpunchoutedited': false,
						'verifiedpunchouttime': "2018/08/15 00:00",
						'_id': "5b71ab00249e740960d4ef2b",
					}
				]
			},
			{
				'company': 'company XYZ',
				'worktime': '9am to 5pm',
				'breaks': [{
					'breakname': 'lunch',
					'start': '1pm',
					'end': '2pm'
				}],
				'rate': '27',
				'timesheets': [
					{
						'date': "2018/08/14",
						'late': false,
						'lateinhour': "00:00",
						'lateintimation': false,
						'normalsalary': 192,
						'normalworkhour': "07:30",
						'notes': "",
						'oogetscommission': 23.1,
						'otsalary': 230.4,
						'otworkhour': "06:00",
						'payrollgenerated': false,
						'punchedin': false,
						'punchedout': false,
						'punchintime': "2018/08/14 00:00",
						'punchouttime': "2018/08/14 00:00",
						'salarymultiplier': 1,
						'totalsalary': 422.4,
						'totalworkhour': "13:30",
						'verified': true,
						'verifiedpunchinedited': false,
						'verifiedpunchintime': "2018/08/14 09:00",
						'verifiedpunchoutedited': false,
						'verifiedpunchouttime': "2018/08/15 00:00",
						'_id': "5b71ab00249e740960d4ef2b",
					},
					{
						'date': "2018/08/15",
						'late': false,
						'lateinhour': "00:00",
						'lateintimation': false,
						'normalsalary': 193,
						'normalworkhour': "07:31",
						'notes': "",
						'oogetscommission': 23.1,
						'otsalary': 230.4,
						'otworkhour': "06:00",
						'payrollgenerated': false,
						'punchedin': false,
						'punchedout': false,
						'punchintime': "2018/08/14 00:00",
						'punchouttime': "2018/08/14 00:00",
						'salarymultiplier': 1,
						'totalsalary': 422.4,
						'totalworkhour': "13:30",
						'verified': true,
						'verifiedpunchinedited': false,
						'verifiedpunchintime': "2018/08/14 09:00",
						'verifiedpunchoutedited': false,
						'verifiedpunchouttime': "2018/08/15 00:00",
						'_id': "5b71ab00249e740960d4ef2b",
					},
					{
						'date': "2018/08/16",
						'late': false,
						'lateinhour': "00:00",
						'lateintimation': false,
						'normalsalary': 192,
						'normalworkhour': "07:30",
						'notes': "",
						'oogetscommission': 23.1,
						'otsalary': 230.4,
						'otworkhour': "06:00",
						'payrollgenerated': false,
						'punchedin': false,
						'punchedout': false,
						'punchintime': "2018/08/14 00:00",
						'punchouttime': "2018/08/14 00:00",
						'salarymultiplier': 1,
						'totalsalary': 422.4,
						'totalworkhour': "13:30",
						'verified': true,
						'verifiedpunchinedited': false,
						'verifiedpunchintime': "2018/08/14 09:00",
						'verifiedpunchoutedited': false,
						'verifiedpunchouttime': "2018/08/15 00:00",
						'_id': "5b71ab00249e740960d4ef2b",
					},
					{
						'date': "2018/08/17",
						'late': false,
						'lateinhour': "00:00",
						'lateintimation': false,
						'normalsalary': 192,
						'normalworkhour': "07:30",
						'notes': "",
						'oogetscommission': 23.1,
						'otsalary': 230.4,
						'otworkhour': "06:00",
						'payrollgenerated': false,
						'punchedin': false,
						'punchedout': false,
						'punchintime': "2018/08/14 00:00",
						'punchouttime': "2018/08/14 00:00",
						'salarymultiplier': 1,
						'totalsalary': 422.4,
						'totalworkhour': "13:30",
						'verified': true,
						'verifiedpunchinedited': false,
						'verifiedpunchintime': "2018/08/14 09:00",
						'verifiedpunchoutedited': false,
						'verifiedpunchouttime': "2018/08/15 00:00",
						'_id': "5b71ab00249e740960d4ef2b",
					}
				]
			}
		]
	};

	DemoemployerDatas = {
		"success": true,
		"code": 200,
		"timesheetreport": [
			{
				"_id": "5cc00a37e3c4f90eb4230dcc",
				"contractstatus": "closed",
				"createdAt": "2019/04/24 15:03:19",

				"job": {
					"_id": "5cc00865e3c4f90eb4230dc3",
					"jobperiodfrom": "2019/04/24",
					"jobperiodto": "2019/04/25",
					"starttime": "13:22",
					"endtime": "22:22",
					"breaktime": [
						{
							"_id": "5cc0128ae3c4f90eb4230dd1",
							"breakname": "luch",
							"breakstart": "14:32",
							"breakend": "15:32"
						}
					],
					"salary": 18
				},
				"timesheet": [
					{
						"id": 3,
						"job_id": 1,
						"jobseeker_id": 1,
						"contracts_id": 2,
						"clock_in": "2019-06-06 09:00:00",
						"clock_out": "2019-06-06 15:21:08",
						"date": "2019-06-05",
						"day": "Wed",
						"holiday": "N",
						"holiday_changed_by": null,
						"clock_verified_in": null,
						"clock_verified_out": "2019-06-07 01:00:00",
						"total_job_min": 480,
						"jobseeker_normal_working_min": 480,
						"jobseeker_ot_working_min": 420,
						"clock_in_verified_by": null,
						"clock_out_verified_by": 4,
						"ot_salary": "157.50",
						"salary": "120.00",
						"salary_total": "277.50",
						"sheet_verified": "2019-06-07 20:57:01",
						"sheet_verified_by": 4,
						"invoice_no": null,
						"contract_status": 1,
						"notes": "4",
						"note_by": null,
						"late_info": "demo",
						"ooget_commision": "92.50",
						"normal_salary_type": 1,
						"ot_salary_type": 1.5
					},
					{
						"id": 3,
						"job_id": 1,
						"jobseeker_id": 1,
						"contracts_id": 2,
						"clock_in": "2019-06-06 09:00:00",
						"clock_out": "2019-06-06 15:21:08",
						"date": "2019-06-05",
						"day": "Wed",
						"holiday": "N",
						"holiday_changed_by": null,
						"clock_verified_in": null,
						"clock_verified_out": "2019-06-07 01:00:00",
						"total_job_min": 480,
						"jobseeker_normal_working_min": 480,
						"jobseeker_ot_working_min": 420,
						"clock_in_verified_by": null,
						"clock_out_verified_by": 4,
						"ot_salary": "157.50",
						"salary": "120.00",
						"salary_total": "277.50",
						"sheet_verified": "2019-06-07 20:57:01",
						"sheet_verified_by": 4,
						"invoice_no": null,
						"contract_status": 1,
						"notes": "4",
						"note_by": null,
						"late_info": "demo",
						"ooget_commision": "92.50",
						"normal_salary_type": 1,
						"ot_salary_type": 1.5
					},
				],
				"companyname": "Emp1"
			},
			{
				"_id": "5c71201360bef614c0c88b76",
				"contractstatus": "closed",
				"createdAt": "2019/02/23 18:27:31",

				"job": {
					"_id": "5c6e631a88c0190360b18afd",
					"jobperiodfrom": "2019/02/22",
					"jobperiodto": "2019/02/27",
					"starttime": "18:00",
					"endtime": "22:00",
					"breaktime": [
						{
							"_id": "5c6e631a88c0190360b18aff",
							"breakname": "Dinner",
							"breakstart": "20:00",
							"breakend": "20:30"
						}
					],
					"salary": 39
				},
				"timesheet": [
					{
						"id": 3,
						"job_id": 1,
						"jobseeker_id": 1,
						"contracts_id": 2,
						"clock_in": "2019-06-06 09:00:00",
						"clock_out": "2019-06-06 15:21:08",
						"date": "2019-06-05",
						"day": "Wed",
						"holiday": "N",
						"holiday_changed_by": null,
						"clock_verified_in": null,
						"clock_verified_out": "2019-06-07 01:00:00",
						"total_job_min": 480,
						"jobseeker_normal_working_min": 480,
						"jobseeker_ot_working_min": 420,
						"clock_in_verified_by": null,
						"clock_out_verified_by": 4,
						"ot_salary": "157.50",
						"salary": "120.00",
						"salary_total": "277.50",
						"sheet_verified": "2019-06-07 20:57:01",
						"sheet_verified_by": 4,
						"invoice_no": null,
						"contract_status": 1,
						"notes": "4",
						"note_by": null,
						"late_info": "demo",
						"ooget_commision": "92.50",
						"normal_salary_type": 1,
						"ot_salary_type": 1.5
					},
					{
						"id": 3,
						"job_id": 1,
						"jobseeker_id": 1,
						"contracts_id": 2,
						"clock_in": "2019-06-06 09:00:00",
						"clock_out": "2019-06-06 15:21:08",
						"date": "2019-06-05",
						"day": "Wed",
						"holiday": "N",
						"holiday_changed_by": null,
						"clock_verified_in": null,
						"clock_verified_out": "2019-06-07 01:00:00",
						"total_job_min": 480,
						"jobseeker_normal_working_min": 480,
						"jobseeker_ot_working_min": 420,
						"clock_in_verified_by": null,
						"clock_out_verified_by": 4,
						"ot_salary": "157.50",
						"salary": "120.00",
						"salary_total": "277.50",
						"sheet_verified": "2019-06-07 20:57:01",
						"sheet_verified_by": 4,
						"invoice_no": null,
						"contract_status": 1,
						"notes": "4",
						"note_by": null,
						"late_info": "demo",
						"ooget_commision": "92.50",
						"normal_salary_type": 1,
						"ot_salary_type": 1.5
					},
					{
						"id": 3,
						"job_id": 1,
						"jobseeker_id": 1,
						"contracts_id": 2,
						"clock_in": "2019-06-06 09:00:00",
						"clock_out": "2019-06-06 15:21:08",
						"date": "2019-06-05",
						"day": "Wed",
						"holiday": "N",
						"holiday_changed_by": null,
						"clock_verified_in": null,
						"clock_verified_out": "2019-06-07 01:00:00",
						"total_job_min": 480,
						"jobseeker_normal_working_min": 480,
						"jobseeker_ot_working_min": 420,
						"clock_in_verified_by": null,
						"clock_out_verified_by": 4,
						"ot_salary": "157.50",
						"salary": "120.00",
						"salary_total": "277.50",
						"sheet_verified": "2019-06-07 20:57:01",
						"sheet_verified_by": 4,
						"invoice_no": null,
						"contract_status": 1,
						"notes": "4",
						"note_by": null,
						"late_info": "demo",
						"ooget_commision": "92.50",
						"normal_salary_type": 1,
						"ot_salary_type": 1.5
					},
					{
						"id": 3,
						"job_id": 1,
						"jobseeker_id": 1,
						"contracts_id": 2,
						"clock_in": "2019-06-06 09:00:00",
						"clock_out": "2019-06-06 15:21:08",
						"date": "2019-06-05",
						"day": "Wed",
						"holiday": "N",
						"holiday_changed_by": null,
						"clock_verified_in": null,
						"clock_verified_out": "2019-06-07 01:00:00",
						"total_job_min": 480,
						"jobseeker_normal_working_min": 480,
						"jobseeker_ot_working_min": 420,
						"clock_in_verified_by": null,
						"clock_out_verified_by": 4,
						"ot_salary": "157.50",
						"salary": "120.00",
						"salary_total": "277.50",
						"sheet_verified": "2019-06-07 20:57:01",
						"sheet_verified_by": 4,
						"invoice_no": null,
						"contract_status": 1,
						"notes": "4",
						"note_by": null,
						"late_info": "demo",
						"ooget_commision": "92.50",
						"normal_salary_type": 1,
						"ot_salary_type": 1.5
					}
				],
				"companyname": "Emp1"
			}
		]
	};

	isEmployerAvailable: boolean;
	employerCount;
	jobseekers = '';
	SelectedJobseeker;
	SelectedDateRange;

	constructor(private _location: Location, private _httpService: ApiCallService, private datePipe: DatePipe) {
		this.getAllJobseekersList();
	}
	getDateChange(event) {
		// console.log('event', event);
		// console.log('SelectedDateRange', this.SelectedDateRange);
	}
	getAllJobseekersList() {
		this.busy = this._httpService.getAllJobseekers()
			.subscribe(
				response => {
					if (response.success) {
						this.jobseekers = response.result;
					} else if (!response.success) {
						// console.log(response);
					}
				},
				error => {
					// console.log(error);
				}
			);
	}

	getJobseekerContracts() {
		// this.employerDatas = this.DemoemployerDatas.timesheetreport;
		// return false;
		if (!this.SelectedDateRange) return false;
		if (!this.SelectedJobseeker) return false;

		this.busy = this._httpService.getJobseekerContracts({ 'jobseekerid': this.SelectedJobseeker, 'from': this.datePipe.transform(this.SelectedDateRange.begin, 'yyy-MM-dd'), 'to': this.datePipe.transform(this.SelectedDateRange.end, 'yyy-MM-dd') })
			.subscribe(
				response => {
					if (response.success) {
						this.employerDatas = response.result;
						// console.log(this.employerDatas);

					} else if (!response.success) {
						// console.log(response);
					}
				},
				error => {
					// console.log(error);
				}
			);
	}

	backClicked() {
		this._location.back();
	}

	ngOnInit() {
		// this.employerDatas = this.DemoemployerDatas;
	}
}
