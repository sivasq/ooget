import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ColumnConfig } from 'material-dynamic-table';
import { FilteredDataSource } from '../../../data-source/filtered-data-source';

@Component({
	selector: 'app-charges-to-employer-report',
	templateUrl: './charges-to-employer-report.component.html',
	styleUrls: ['./charges-to-employer-report.component.scss']
})
export class ChargesToEmployerReportComponent implements OnInit {

	columns: ColumnConfig[] = [
		{
			name: 'date',
			displayName: 'Date',
			type: 'string'
		},
		{
			name: 'normalsalary',
			displayName: 'Normalsalary',
			type: 'string'
		},
		{
			name: 'normalworkhour',
			displayName: 'Normalworkhour',
			type: 'string'
		}
	];

	panelOpenState = false;
	datas = [1, 2, 3];
	employerDatas = [
		{
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
				}
			]
		}
	]

	constructor(private _location: Location) { }

	backClicked() {
		this._location.back();
	}

	getDataSource(sourceData) {
		return new FilteredDataSource<any>(sourceData);
	}

	ngOnInit() {
	}

}
