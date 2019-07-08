import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiCallService } from '../../../services/api-call.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-contract-details',
	templateUrl: './contract-details.component.html',
	styleUrls: ['./contract-details.component.scss']
})
export class ContractDetailsComponent implements OnInit {
	busy: Subscription;
	contract_id;
	contractorJobDetails;
	contractStatus = ['Open', 'Closed'];
	constructor(private _httpService: ApiCallService, private route: ActivatedRoute) {
		this.contract_id = this.route.snapshot.params['contract_id'];
	}

	// Get Contractor Job Details
	getContractorJobDetails(contractId) {
		this.busy = this._httpService.getContractDetails(contractId)
			.subscribe(
				response => {
					if (response.success) {
						this.contractorJobDetails = response.result[0];
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
		this.getContractorJobDetails({ 'contractid': this.contract_id });
	}
}
