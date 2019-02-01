import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-work-offdays-matrix-view',
  templateUrl: './work-offdays-matrix-view.component.html',
  styleUrls: ['./work-offdays-matrix-view.component.scss']
})
export class WorkOffdaysMatrixViewComponent implements OnInit {

	offDays = [
		{
			'name': 'name1',


		}
	]


	constructor(private _location: Location) { }

	backClicked() {
		this._location.back();
	}

	ngOnInit() {
	}

}
