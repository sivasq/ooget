import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-payment-report',
  templateUrl: './admin-payment-report.component.html',
  styleUrls: ['./admin-payment-report.component.scss']
})
export class AdminPaymentReportComponent implements OnInit {

	constructor(private _location: Location) { }

	backClicked() {
		this._location.back();
	}

	ngOnInit() {
	}

}
