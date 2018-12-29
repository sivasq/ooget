import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ColumnConfig } from 'material-dynamic-table';
import { FilteredDataSource } from '../../../data-source/filtered-data-source';

export interface ChargesToEmpTimesheetItem {
	name: string;
	id: number;
}

@Component({
	selector: 'app-charges-to-employer-report',
	templateUrl: './charges-to-employer-report.component.html',
	styleUrls: ['./charges-to-employer-report.component.scss']
})
export class ChargesToEmployerReportComponent implements OnInit {
	step = 0;
	setStep(index: number) {
		this.step = index;
	}

	onEvent(event) {
		event.stopPropagation();
	}

	public employeeFilter: string = '';
	isExpanded;
	expand() {
		this.isExpanded = true;
		console.log("called");
	}
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

	// displayedColumns = ['id', 'name'];

	EXAMPLE_DATA: ChargesToEmpTimesheetItem[] = [
		{ id: 1, name: 'Hydrogen' },
		{ id: 2, name: 'Helium' },
		{ id: 3, name: 'Lithium' },
		{ id: 4, name: 'Beryllium' },
		{ id: 5, name: 'Boron' },
		{ id: 6, name: 'Carbon' },
		{ id: 7, name: 'Nitrogen' },
		{ id: 8, name: 'Oxygen' },
		{ id: 9, name: 'Fluorine' },
		{ id: 10, name: 'Neon' },
		{ id: 11, name: 'Sodium' },
		{ id: 12, name: 'Magnesium' },
		{ id: 13, name: 'Aluminum' },
		{ id: 14, name: 'Silicon' },
		{ id: 15, name: 'Phosphorus' },
		{ id: 16, name: 'Sulfur' },
		{ id: 17, name: 'Chlorine' },
		{ id: 18, name: 'Argon' },
		{ id: 19, name: 'Potassium' },
		{ id: 20, name: 'Calcium' },
	];

	constructor(private _location: Location) { }

	getDataSource(sourceData) {
		return new FilteredDataSource<any>(sourceData);
	}

	ngOnInit() {
	}

}
