import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ApiCallService } from '../../../services/api-call.service';
import { Subscription } from 'rxjs';

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
					'day': 'day2',
					'date': "2018/08/14",
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
					'day': 'day2',
					'date': "2018/08/14",
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
				}
			]
		}
	]

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

	// displayedColumns = ['work_date', 'in_time', 'out_time', 'verified', 'verifiedpunchintime', 'verifiedpunchouttime', 'normalworkhour', 'otworkhour1', 'otworkhour2', 'salarymultiplier', 'totalworkhour', 'normalsalary', 'ot1salary', 'ot2salary', 'totalsalary', 'invoiceno'];

	displayedColumns = ['name', 'day1', 'day2', 'day3', 'day4', 'day5'];
	// displayedColumns = ['day1'];

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
						'date': "2018/08/14",
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
						'date': "2018/08/14",
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
		// this.getAllEmployers();
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

	backClicked() {
		this._location.back();
	}

	ngOnInit() {
		// this.employerDatas = this.DemoemployerDatas;
	}

}
