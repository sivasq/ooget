import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-work-offdays-calendar-view',
  templateUrl: './work-offdays-calendar-view.component.html',
  styleUrls: ['./work-offdays-calendar-view.component.scss']
})
export class WorkOffdaysCalendarViewComponent implements OnInit {

	constructor(private _location: Location) { }

	backClicked() {
		this._location.back();
	}

	ngOnInit() {
	}

}
