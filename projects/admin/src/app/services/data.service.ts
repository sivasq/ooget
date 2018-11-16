import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Issue } from '../pages/holidays/models/issue';
import { ConfigService } from './config.service';

@Injectable()
export class DataService {
	public API_URL = "http://104.197.80.225:3010/ooget/admin";
	headers;

	dataChange: BehaviorSubject<Issue[]> = new BehaviorSubject<Issue[]>([]);

	// Temporarily stores data from dialogs
	dialogData: any;

	constructor(private httpClient: HttpClient, public snackBar?: MatSnackBar) {
		let userToken = localStorage.getItem('ogToken');
		this.headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'token': userToken
			})
	}

	get data(): Issue[] {
		return this.dataChange.value;
	}

	getDialogData() {
		return this.dialogData;
	}

	/** CRUD METHODS */
	getAllIssues(): void {
		let data: '';
		this.httpClient.post<any>(this.API_URL + '/fetchholidaylist', data, { headers: this.headers }).subscribe(response => {
			this.dataChange.next(response.holidays);
			// console.log(data.message);
		},
			(error: HttpErrorResponse) => {
				console.log(error.name + ' ' + error.message);
			});
	}

	// DEMO ONLY, you can find working methods below
	addIssue(issue: Issue) {
		// this.dialogData = issue;
		return this.httpClient.post<any>(this.API_URL + '/addholiday', issue, { headers: this.headers })
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

	updateIssue(issue: Issue) {
		// this.dialogData = issue;
		return this.httpClient.post<any>(this.API_URL + '/editholiday', issue, { headers: this.headers })
		// .subscribe(data => {
		// 	this.dialogData = issue;
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

	deleteIssue(holidayid: any) {
		// console.log(id);
		// let id = { 'holidayid': holidayid }
		return this.httpClient.post<any>(this.API_URL + '/deleteholiday', holidayid, { headers: this.headers })
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
	// addItem(issue: Issue): void {
	// 	this.httpClient.post(this.API_URL, issue).subscribe(data => {
	// 		this.dialogData = issue;
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
	// updateItem(issue: Issue): void {
	// 	this.httpClient.put(this.API_URL + issue.id, issue).subscribe(data => {
	// 		this.dialogData = issue;
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