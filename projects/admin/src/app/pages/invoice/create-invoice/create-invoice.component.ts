import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { ApiCallService } from '../../../services/api-call.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-create-invoice',
	templateUrl: './create-invoice.component.html',
	styleUrls: ['./create-invoice.component.scss']
})
export class CreateInvoiceComponent implements OnInit {

	busy: Subscription;
	isEmployerAvailable: boolean;
	isJobsAvailable: boolean;
	employers_list = [];
	jobs_list = [];
	selectedEmployer;
	selectedJob;
	terms;
	attentionTO;

	public options: Object = {
		placeholderText: 'Invoice Terms Goes Here!',
		charCounterCount: true,
		toolbarButtons: ['undo', 'redo', '|', 'fontSize', '|', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', '|', 'html'],
		toolbarButtonsXS: ['undo', 'redo', '|', 'fontSize', '|', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', '|', 'html'],
		toolbarButtonsSM: ['undo', 'redo', '|', 'fontSize', '|', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', '|', 'html'],
		toolbarButtonsMD: ['undo', 'redo', '|', 'fontSize', '|', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', '|', 'html'],
	}

	constructor(private router: Router, private activatedRoute: ActivatedRoute, private _httpService: ApiCallService) {
		this.selectedJob = this.activatedRoute.snapshot.params['job_id'];
		this.selectedEmployer = this.activatedRoute.snapshot.params['emp_id'];

		this.getAllEmployers();

		if (this.selectedEmployer) {
			this.getEmployerJobs(this.selectedEmployer);
		}
	}

	public changingQueryParams() {

		this.router.navigate(['/admin/employers/' + this.selectedEmployer + '/jobs/' + this.selectedJob+'/invoice']);

		// Add Query Parameters to Route
		// const queryParams: Params = { job_id: 'myNewValue' };
		// this.router.navigate(
		// 	[],
		// 	{
		// 		relativeTo: this.activatedRoute,
		// 		queryParams: queryParams,
		// 		queryParamsHandling: "merge", // remove to replace all query params by provided
		// 	});
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
		this.changingQueryParams();
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

	changeSearch(event) {
		this.changingQueryParams();
		// console.log(this.month);
		// console.log(this.year);
		// console.log(this.selectedJob);

		// this.busy = this._httpService.getMatrixOffDays({ 'jobid': this.selectedJob, 'fromdate': this.datePipe.transform(new Date(this.year, this.month, 1), 'yyyy/MM/dd'), 'todate': this.datePipe.transform(new Date(this.year, this.month + 1, 0), 'yyyy/MM/dd') })
		// 	.subscribe(
		// 		response => {
		// 			if (response.success) {
		// 				this.generateHeaderColumns();
		// 				this.response = response;
		// 			} else if (!response.success) {
		// 				console.log(response);
		// 			}
		// 		},
		// 		error => {
		// 			console.log(error);
		// 		}
		// 	);
	}

	ngOnInit() {
		this.activatedRoute.params.subscribe(params => {
			console.log(params);
			this.selectedJob = this.activatedRoute.snapshot.params['job_id'];
			this.selectedEmployer = this.activatedRoute.snapshot.params['emp_id'];
		});
	}

}
