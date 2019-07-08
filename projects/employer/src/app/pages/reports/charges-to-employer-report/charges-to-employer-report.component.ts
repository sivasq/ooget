import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ApiCallService } from '../../../services/api-call.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-charges-to-employer-report',
	templateUrl: './charges-to-employer-report.component.html',
	styleUrls: ['./charges-to-employer-report.component.scss']
})
export class ChargesToEmployerReportComponent implements OnInit {
	step;

	// busy Config
	busy: Subscription;
	public employeeFilter: string = '';
	public jobFilter: string = '';

	displayedColumns = ['work_date', 'in_time', 'out_time', 'verified', 'verifiedpunchintime', 'verifiedpunchouttime', 'normalworkhour', 'otworkhour1', 'otworkhour2', 'salarymultiplier', 'totalworkhour', 'normalsalary', 'ot1salary', 'ot2salary', 'totalsalary', 'invoiceno'];

	employerDatas;

	DemoemployerDatas = {
		'jobs': [
			{
				'jobNumber': 'Job Number',
				'contractors': [
					{
						'name': 'name',
						'employeeCode': 'Employee Code',
						'timesheets': [
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
						]
					},
					{
						'name': 'name1',
						'employeeCode': 'Employee Code1',
						'timesheets': [
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
						]
					},
					{
						'name': 'name1',
						'employeeCode': 'Employee Code1',
						'timesheets': [
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
	constructor(private _location: Location, private _httpService: ApiCallService) { }

	setStep(index: number) {
		this.step = index;
	}
	onEvent(event) {
		event.stopPropagation();
	}

	getEmployerJobs() {
		// console.log(event);
		// this.employerDatas = this.DemoemployerDatas;
		// return false;
		this.busy = this._httpService.getEmployerJobs()
			.subscribe(
				response => {
					if (response.success) {
						// console.log(response.employerreport);
						if ((response.result.jobs).length > 0) {
							// this.isEmployerAvailable = true;
							// this.employerCount = (response.employerreport).length;
							// this.employers_list = response.employerreport;

							this.employerDatas = response.result.jobs;

							// console.log(this.employerDatas[0]);
							// console.log(this.employerDatas);
						} else {
							this.employerDatas = [];
							this.isEmployerAvailable = false;
						}
					} else if (!response.success) {
						// console.log(response);
					}
				},
				error => {
					// console.log(error);
				}
			);
	}

	ngOnInit() {
		this.getEmployerJobs();
	}

}
