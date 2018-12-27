import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
	selector: 'app-not-authorized',
	templateUrl: './not-authorized.component.html',
	styleUrls: ['./not-authorized.component.scss']
})
export class NotAuthorizedComponent implements OnInit {

	constructor(private _location: Location) { }

	backClicked() {
		this._location.back();
	}

	ngOnInit() {
	}

}
