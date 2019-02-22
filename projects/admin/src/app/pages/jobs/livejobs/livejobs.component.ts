import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../../../services/api-call.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { JsonToTextService } from '../../../services/json-to-text.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-livejobs',
	templateUrl: './livejobs.component.html',
	styleUrls: ['./livejobs.component.scss']
})
export class LivejobsComponent implements OnInit {

	//busy Config
	busy: Subscription;

	//set Live jobs array
	public liveJobs: any[] = [];

	constructor(private _httpService: ApiCallService, private route: ActivatedRoute, public datePipe: DatePipe, public toUpperCase: UpperCasePipe, public texts: JsonToTextService) {
		this.getLiveJobsList();
	}

	getLiveJobsList() {
		this.busy = this._httpService.getLiveJobsList()
			.subscribe(
				response => {
					if (response.success) {

						this.liveJobs = response.livejobs;

					} else if (!response.success) {

						console.log(response);
					}
				},
				error => {
					console.log(error);
				}
			);
	}

	ngOnInit() { }
}
