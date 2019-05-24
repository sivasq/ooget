import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Holiday } from '../pages/holidays/models/holiday';
import { ConfigService } from './config.service';
import { ApiCallService } from './api-call.service';

@Injectable()
export class HolidayDataService {
	public API_URL = 'http://192.168.1.14/ooget/';
	// public API_URL = "http://104.197.80.225:3010/ooget/admin";
	// public API_URL = "https://api.ooget.com.sg/ooget/admin";
	headers;

	dataChange: BehaviorSubject<Holiday[]> = new BehaviorSubject<Holiday[]>([]);

	// Temporarily stores data from dialogs
	// dialogData: any;

	constructor(private httpClient: HttpClient, public snackBar?: MatSnackBar, private _httpService?: ApiCallService) {
		let userToken = localStorage.getItem('ogToken');
		this.headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			});
	}

	get data(): Holiday[] {
		return this.dataChange.value;
	}

	// getDialogData() {
	// 	return this.dialogData;
	// }

	/** CRUD METHODS */
	getAllHolidays(): void {
		let date = { 'from': '2019-05-06', 'to': '2019-06-25' };
		this.httpClient.post<any>(this.API_URL + '?module=Holiday&mode=GetHolidayList', date, { headers: this.headers }).subscribe(response => {
			this.dataChange.next(response.result);
			// console.log(data.message);
		},
			(error: HttpErrorResponse) => {
				console.log(error.name + ' ' + error.message);
			});
	}

	// DEMO ONLY, you can find working methods below
	addHoliday(holiday: Holiday) {
		// this.dialogData = holiday;
		return this.httpClient.post<any>(this.API_URL + '?module=Holiday&mode=CreateHoliday', holiday, { headers: this.headers })
		// .subscribe(responses => {
		// 	this.dialogData = responses.holiday;
		// 	this.snackBar.open('Successfully added', 'close', {
		// 		duration: 2000,
		// 	});
		// },
		// 	(err: HttpErrorResponse) => {
		// 		this.snackBar.open('Error occurred. Details: ' + err.name + ' ' + err.message, 'close', {
		// 			duration: 5000,
		// 		});
		// 	});
	}

	updateHoliday(holiday: Holiday) {
		// this.dialogData = holiday;
		return this.httpClient.post<any>(this.API_URL + '?module=Holiday&mode=UpdateHoliday', holiday, { headers: this.headers })
		// .subscribe(data => {
		// 	this.dialogData = holiday;
		// 	this.snackBar.open('Successfully Updated', 'close', {
		// 		duration: 2000,
		// 	});
		// },
		// 	(err: HttpErrorResponse) => {
		// 		this.snackBar.open('Error occurred. Details: ' + err.name + ' ' + err.message, 'close', {
		// 			duration: 5000,
		// 		});
		// 	});
	}

	deleteHoliday(holidayid: any) {
		// console.log(id);
		// let id = { 'holidayid': holidayid }
		return this.httpClient.post<any>(this.API_URL + '?module=Holiday&mode=DeleteHoliday', holidayid, { headers: this.headers })
		// .subscribe(data => {
		// 	console.log(data);
		// 	this.snackBar.open('Successfully Deleted', 'close', {
		// 		duration: 2000,
		// 	});
		// },
		// 	(err: HttpErrorResponse) => {
		// 		this.snackBar.open('Error occurred. Details: ' + err.name + ' ' + err.message, 'close', {
		// 			duration: 5000,
		// 		});
		// 	}
		// );
	}

	// REAL LIFE CRUD Methods I've used in my projects. ToasterService uses Material Toasts for displaying messages:
	// ADD, POST METHOD
	// addItem(holiday: Holiday): void {
	// 	this.httpClient.post(this.API_URL, holiday).subscribe(data => {
	// 		this.dialogData = holiday;
	// 		this.snackBar.open('Successfully added', 'close', {
	// 			duration: 2000,
	// 		});
	// 	},
	// 		(err: HttpErrorResponse) => {
	// 			this.snackBar.open('Error occurred. Details: ' + err.name + ' ' + err.message, 'close', {
	// 				duration: 5000,
	// 			});
	// 		});
	// }

	// UPDATE, PUT METHOD
	// updateItem(holiday: Holiday): void {
	// 	this.httpClient.put(this.API_URL + holiday.id, holiday).subscribe(data => {
	// 		this.dialogData = holiday;
	// 		this.snackBar.open('Successfully added', 'close', {
	// 			duration: 2000,
	// 		});
	// 	},
	// 		(err: HttpErrorResponse) => {
	// 			this.snackBar.open('Error occurred. Details: ' + err.name + ' ' + err.message, 'close', {
	// 				duration: 5000,
	// 			});
	// 		}
	// 	);
	// }

	// DELETE METHOD
	// deleteItem(id: number): void {
	// 	this.httpClient.delete(this.API_URL + id).subscribe(data => {
	// 		console.log(data['']);
	// 		this.snackBar.open('Successfully Deleted', 'close', {
	// 			duration: 2000,
	// 		});
	// 	},
	// 		(err: HttpErrorResponse) => {
	// 			this.snackBar.open('Error occurred. Details: ' + err.name + ' ' + err.message, 'close', {
	// 				duration: 5000,
	// 			});
	// 		}
	// 	);
	// }

}
