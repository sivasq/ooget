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
		"timesheetreport": [{
			"_id": "5b740342268343160c343b05",
			"contractstatus": "closed",
			"createdAt": "2018/08/15 18:41:06",
			"offdays": [],
			"job": {
				"_id": "5b6d34aec7c3ca13584a78b4",
				"jobperiodfrom": "2018/08/11",
				"jobperiodto": "2018/08/30",
				"starttime": "19:10",
				"endtime": "23:00",
				"breaktime": [{
					"breakname": "tea1",
					"breakstart": "11:00",
					"breakend": "11:30",
					"_id": "5b73d8ee177fd20c10a787bd"
				},
				{
					"breakname": "lunch",
					"breakstart": "13:00",
					"breakend": "14:00",
					"_id": "5b73d8ee177fd20c10a787be"
				}
				],
				"salary": 23.8
			},
			"timesheet": [{
				"date": "2018/08/16",
				"punchintime": "2018/08/16 00:00",
				"verifiedpunchintime": "2018/08/16 19:35",
				"punchouttime": "2018/08/16 00:00",
				"verifiedpunchouttime": "2018/08/17 00:00",
				"punchedin": false,
				"punchedout": false,
				"verifiedpunchinedited": true,
				"verifiedpunchoutedited": false,
				"notes": "",
				"late": false,
				"lateinhour": "00:00",
				"lateintimation": false,
				"normalworkhour": "02:20",
				"otworkhour": "00:35",
				"totalworkhour": "02:55",
				"normalsalary": 53.55,
				"otsalary": 17.85,
				"totalsalary": 71.4,
				"oogetscommission": 3.6,
				"salarymultiplier": 1,
				"verified": true,
				"payrollgenerated": false,
				"_id": "5b7546709336341624b4b272"
			},
			{
				"date": "2018/08/17",
				"punchintime": "2018/08/17 00:00",
				"verifiedpunchintime": "2018/08/17 00:00",
				"punchouttime": "2018/08/17 00:00",
				"verifiedpunchouttime": "2018/08/17 00:00",
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
				"_id": "5b759f809336341624b4b275"
			},
			{
				"date": "2018/08/18",
				"punchintime": "2018/08/18 21:26",
				"verifiedpunchintime": "2018/08/18 21:26",
				"punchouttime": "2018/08/18 00:00",
				"verifiedpunchouttime": "2018/08/18 00:00",
				"punchedin": true,
				"punchedout": false,
				"verifiedpunchinedited": false,
				"verifiedpunchoutedited": false,
				"notes": "",
				"late": true,
				"lateinhour": "02:16",
				"lateintimation": false,
				"normalworkhour": "00:00",
				"otworkhour": "00:00",
				"totalworkhour": "00:00",
				"normalsalary": 0,
				"otsalary": 0,
				"totalsalary": 0,
				"oogetscommission": 0,
				"salarymultiplier": 1.5,
				"verified": false,
				"payrollgenerated": false,
				"_id": "5b76f10007502a09dc49c5c8"
			},
			{
				"date": "2018/08/19",
				"punchintime": "2018/08/19 00:00",
				"verifiedpunchintime": "2018/08/19 00:00",
				"punchouttime": "2018/08/19 00:00",
				"verifiedpunchouttime": "2018/08/19 00:00",
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
				"verified": false,
				"payrollgenerated": false,
				"_id": "5b7842807d822710f43638bd"
			},
			{
				"date": "2018/08/20",
				"punchintime": "2018/08/20 19:13",
				"verifiedpunchintime": "2018/08/20 19:10",
				"punchouttime": "2018/08/20 20:00",
				"verifiedpunchouttime": "2018/08/20 20:00",
				"punchedin": true,
				"punchedout": true,
				"verifiedpunchinedited": false,
				"verifiedpunchoutedited": false,
				"notes": "",
				"late": false,
				"lateinhour": "00:00",
				"lateintimation": false,
				"normalworkhour": "00:50",
				"otworkhour": "00:00",
				"totalworkhour": "00:50",
				"normalsalary": 17.85,
				"otsalary": 0,
				"totalsalary": 17.85,
				"oogetscommission": 0.89,
				"salarymultiplier": 1,
				"verified": false,
				"payrollgenerated": false,
				"_id": "5b7994007d822710f43638bf"
			},
			{
				"date": "2018/08/21",
				"punchintime": "2018/08/21 00:00",
				"verifiedpunchintime": "2018/08/21 00:00",
				"punchouttime": "2018/08/21 00:00",
				"verifiedpunchouttime": "2018/08/21 00:00",
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
				"_id": "5b7ae580b6508309e8984bb2"
			},
			{
				"date": "2018/08/22",
				"punchintime": "2018/08/22 00:00",
				"verifiedpunchintime": "2018/08/22 00:00",
				"punchouttime": "2018/08/22 00:00",
				"verifiedpunchouttime": "2018/08/22 00:00",
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
				"salarymultiplier": 2,
				"verified": false,
				"payrollgenerated": false,
				"_id": "5b7c37003f760f0dd49ff789"
			},
			{
				"date": "2018/08/23",
				"punchintime": "2018/08/23 00:00",
				"verifiedpunchintime": "2018/08/23 00:00",
				"punchouttime": "2018/08/23 00:00",
				"verifiedpunchouttime": "2018/08/23 00:00",
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
				"_id": "5b7d88803f760f0dd49ff78e"
			},
			{
				"date": "2018/08/24",
				"punchintime": "2018/08/24 00:00",
				"verifiedpunchintime": "2018/08/24 00:00",
				"punchouttime": "2018/08/24 00:00",
				"verifiedpunchouttime": "2018/08/24 00:00",
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
				"_id": "5b7eda00507ab00df491ceb2"
			},
			{
				"date": "2018/08/25",
				"punchintime": "2018/08/25 00:00",
				"verifiedpunchintime": "2018/08/25 00:00",
				"punchouttime": "2018/08/25 00:00",
				"verifiedpunchouttime": "2018/08/25 00:00",
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
				"verified": false,
				"payrollgenerated": false,
				"_id": "5b802b805ac6b313fc6b7165"
			},
			{
				"date": "2018/08/26",
				"punchintime": "2018/08/26 00:00",
				"verifiedpunchintime": "2018/08/26 00:00",
				"punchouttime": "2018/08/26 00:00",
				"verifiedpunchouttime": "2018/08/26 00:00",
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
				"verified": false,
				"payrollgenerated": false,
				"_id": "5b817d005ac6b313fc6b716b"
			},
			{
				"date": "2018/08/27",
				"punchintime": "2018/08/27 00:00",
				"verifiedpunchintime": "2018/08/27 00:00",
				"punchouttime": "2018/08/27 00:00",
				"verifiedpunchouttime": "2018/08/27 00:00",
				"punchedin": false,
				"punchedout": false,
				"verifiedpunchinedited": false,
				"verifiedpunchoutedited": false,
				"notes": "",
				"late": false,
				"lateinhour": "00:00",
				"lateintimation": true,
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
				"_id": "5b82ce805ac6b313fc6b7170",
				"lateintimatedat": "2018/08/28 13:38",
				"latereason": "late"
			},
			{
				"date": "2018/08/28",
				"punchintime": "2018/08/28 00:00",
				"verifiedpunchintime": "2018/08/28 00:00",
				"punchouttime": "2018/08/28 00:00",
				"verifiedpunchouttime": "2018/08/28 00:00",
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
				"_id": "5b8420005ac6b313fc6b7175"
			},
			{
				"date": "2018/08/29",
				"punchintime": "2018/08/29 00:00",
				"verifiedpunchintime": "2018/08/29 00:00",
				"punchouttime": "2018/08/29 00:00",
				"verifiedpunchouttime": "2018/08/29 00:00",
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
				"_id": "5b8571805ac6b313fc6b717a"
			},
			{
				"date": "2018/08/30",
				"punchintime": "2018/08/30 00:00",
				"verifiedpunchintime": "2018/08/30 00:00",
				"punchouttime": "2018/08/30 00:00",
				"verifiedpunchouttime": "2018/08/30 00:00",
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
				"_id": "5b86c3005ac6b313fc6b7189"
			}
			],
			"companyname": "Testing Company new"
		}]
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
		console.log('event', event);
		console.log('SelectedDateRange', this.SelectedDateRange);
	}
	getAllJobseekersList() {
		this.busy = this._httpService.getAllJobseekersList()
			.subscribe(
				response => {
					if (response.success) {
						this.jobseekers = response.jobseekers;

					} else if (!response.success) {
						console.log(response);
					}
				},
				error => {
					console.log(error);
				}
			);
	}

	getJobseekerContracts() {
		if (!this.SelectedDateRange) return false;
		if (!this.SelectedJobseeker) return false;

		this.busy = this._httpService.getJobseekerContracts({ 'jobseekerid': this.SelectedJobseeker, 'fromdate': this.datePipe.transform(this.SelectedDateRange.begin, 'yyyy/MM/dd'), 'todate': this.datePipe.transform(this.SelectedDateRange.end, 'yyyy/MM/dd') })
			.subscribe(
				response => {
					if (response.success) {
						this.employerDatas = response.timesheetreport;
						console.log(this.employerDatas);

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
		// this.employerDatas = this.DemoemployerDatas;
	}
}
