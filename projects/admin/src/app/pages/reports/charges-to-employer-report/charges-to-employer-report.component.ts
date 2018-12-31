import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ApiCallService } from '../../../services/api-call.service';

@Component({
	selector: 'app-charges-to-employer-report',
	templateUrl: './charges-to-employer-report.component.html',
	styleUrls: ['./charges-to-employer-report.component.scss']
})
export class ChargesToEmployerReportComponent implements OnInit {
	step;
	setStep(index: number) {
		this.step = index;
	}
	onEvent(event) {
		event.stopPropagation();
	}

	public employeeFilter: string = '';
	public jobFilter: string = '';

	displayedColumns: any[] = [
		{
			name: 'date',
			displayName: 'Date',
		},
		{
			name: 'punchintime',
			displayName: 'In Time',
		},
		{
			name: 'punchouttime',
			displayName: 'Out Time',
		},
		{
			name: 'normalworkhour',
			displayName: 'Nor. hr',
		},
		{
			name: 'otworkhour',
			displayName: 'OT Hr',
		},
		{
			name: 'totalworkhour',
			displayName: 'Tot.Hr',
		},
		{
			name: 'normalsalary',
			displayName: 'Nor. Sal',
		},
		{
			name: 'otsalary',
			displayName: 'OT Sal',
		},
		{
			name: 'totalsalary',
			displayName: 'Tot. Sal',
		},
		{
			name: 'salarymultiplier',
			displayName: 'OT Type',
		}
	];

	employerDatas;

	DemoemployerDatas = {
		'companyName': 'Company name',
		'compnyCode': 'Company Code',
		'jobs': [
			{
				'jobNumber': 'Job Number',
				'contractors': [
					{
						'name': 'name',
						'employeeCode': 'Employee Code',
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
							}
						]
					},
					{
						'name': 'name1',
						'employeeCode': 'Employee Code1',
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
			},
			{
				'jobNumber': 'Job Number',
				'contractors': [
					{
						'name': 'name',
						'employeeCode': 'Employee Code',
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
							}
						]
					},
					{
						'name': 'name1',
						'employeeCode': 'Employee Code1',
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
		this._httpService.getAllEmployers()
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
		this._httpService.getEmployerJobs()
			.subscribe(
				response => {
					if (response.success) {
						console.log(response.employers);
						if ((response.employers).length > 0) {
							this.isEmployerAvailable = true;
							this.employerCount = (response.employers).length;
							this.employers_list = response.employers;

							this.employerDatas = this.DemoemployerDatas;
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

	ngOnInit() {
	}

}
