import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
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

	employerDatas;

	DemoemployerDatas = {
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

	isEmployerAvailable: boolean;
	employerCount;
	employers_list;
	SelectedEmployer;
	constructor(private _location: Location, private _httpService: ApiCallService) {
		this.getAllEmployers();
	}

	getAllEmployers() {
		this.busy = this._httpService.getAllEmployers()
			.subscribe(
				response => {
					if (response.success) {
						console.log(response.employers);
						if ((response.employers).length > 0) {
							this.isEmployerAvailable = true;
							this.employerCount = (response.employers).length;
							this.employers_list = response.employers;
						} else {
							this.isEmployerAvailable = false;
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

	getEmployerJobs(event) {
		console.log(event);
		this.busy = this._httpService.getEmployerJobs({ 'companyid': event })
			.subscribe(
				response => {
					if (response.success) {
						// console.log(response.employerreport);
						if ((response.employerreport).length > 0) {
							// this.isEmployerAvailable = true;
							// this.employerCount = (response.employerreport).length;
							// this.employers_list = response.employerreport;

							this.employerDatas = response.employerreport[0];
							console.log(this.employerDatas);
						} else {
							this.isEmployerAvailable = false;
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

	backClicked() {
		this._location.back();
	}

	ngOnInit() {
		this.employerDatas = this.DemoemployerDatas;
	}

}
