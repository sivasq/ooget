import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Holiday } from '../pages/holidays/models/holiday';
import { ConfigService } from './config.service';
import { ApiCallService } from './api-call.service';

@Injectable()
export class HolidayDataService {
	// public API_URL = 'http://192.168.1.14/ooget/';
	public API_URL = 'http://104.197.80.225/ooget/';
	// public API_URL = "https://api.ooget.com.sg/ooget/admin";
	headers;

	dataChange: BehaviorSubject<Holiday[]> = new BehaviorSubject<Holiday[]>([]);

	// Temporarily stores data from dialogs
	// dialogData: any;

	constructor(private http: HttpClient, public snackBar?: MatSnackBar, private _httpService?: ApiCallService) {
		// let userToken = localStorage.getItem('ogToken');
		// this.headers = new HttpHeaders(
		// 	{
		// 		'Content-Type': 'application/json',
		// 		'Access-Control-Allow-Origin': '*',
		// 		'token': userToken
		// 	});
	}

	get data(): Holiday[] {
		return this.dataChange.value;
	}

	createAuthorizationHeaderJson() {
		const headers = {};
		headers['Content-Type'] = 'application/json';
		headers['Access-Control-Allow-Origin'] = '*';
		headers['Token'] = localStorage.getItem('ogToken');
		return headers;
	}

	createUrlParams(moduleName, modeName) {
		const params = {};
		params['module'] = moduleName;
		params['mode'] = modeName;
		return params;
	}

	// getDialogData() {
	// 	return this.dialogData;
	// }

	/** CRUD METHODS */
	getAllHolidays(): void {
		let date = { 'from': '2000-01-01', 'to': '2030-12-31' };
		const headers = this.createAuthorizationHeaderJson();
		const params = this.createUrlParams('Holiday', 'GetHolidayList');
		this.http.post<any>(this.API_URL, date, { headers: headers, params: params })
			.subscribe(
				response => {
					this.dataChange.next(response.result);
				},
				(error: HttpErrorResponse) => {
					console.log(error.name + ' ' + error.message);
				});
	}

	addHoliday(holiday: Holiday) {
		const headers = this.createAuthorizationHeaderJson();
		const params = this.createUrlParams('Holiday', 'CreateHoliday');
		return this.http.post<any>(this.API_URL, holiday, { headers: headers, params: params });
	}

	updateHoliday(holiday: Holiday) {
		const headers = this.createAuthorizationHeaderJson();
		const params = this.createUrlParams('Holiday', 'UpdateHoliday');
		return this.http.post<any>(this.API_URL, holiday, { headers: headers, params: params });
	}

	deleteHoliday(holidayid: any) {
		const headers = this.createAuthorizationHeaderJson();
		const params = this.createUrlParams('Holiday', 'DeleteHoliday');
		return this.http.post<any>(this.API_URL, holidayid, { headers: headers, params: params });
	}
}
