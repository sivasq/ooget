import { Component, ChangeDetectionStrategy, OnInit, Input } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CalendarEvent, CalendarView, CalendarMonthViewDay, CalendarEventAction } from 'angular-calendar';
import {
	isSameMonth,
	isSameDay,
	startOfMonth,
	endOfMonth,
	startOfWeek,
	endOfWeek,
	startOfDay,
	endOfDay,
	format
} from 'date-fns';
import { Observable, of } from 'rxjs';
import { ApiCallService } from '../../services/api-call.service';
import { ConfigService } from '../../services/config.service';
import { MatSnackBar } from '@angular/material';
// import { colors } from '../demo-utils/colors';

interface Film {
	id: number;
	title: string;
	release_date: string;
}

function getTimezoneOffsetString(date: Date): string {
	const timezoneOffset = date.getTimezoneOffset();
	const hoursOffset = String(
		Math.floor(Math.abs(timezoneOffset / 60))
	).padStart(2, '0');
	const minutesOffset = String(Math.abs(timezoneOffset % 60)).padEnd(2, '0');
	const direction = timezoneOffset > 0 ? '-' : '+';
	return `T00:00:00${direction}${hoursOffset}${minutesOffset}`;
}

export const colors: any = {
	red: {
		primary: '#ad2121',
		secondary: '#FAE3E3'
	},
	blue: {
		primary: '#1e90ff',
		secondary: '#D1E8FF'
	},
	yellow: {
		primary: '#e3bc08',
		secondary: '#FDF1BA'
	},
	green: {
		primary: '#027306',
		secondary: '#C1D8C2'
	}
};

@Component({
	selector: 'app-roster-off-days-manage',
	templateUrl: './roster-off-days-manage.component.html',
	styleUrls: ['./roster-off-days-manage.component.scss']
})
export class RosterOffDaysManageComponent implements OnInit {

	@Input() contractId;
	responseData = {
		'page': 1,
		'total_results': 447,
		'total_pages': 23,
		'results': [
			{
				'holiday': 'N',
				'date': '2019-05-01'
			}, {
				'holiday': 'P',
				'date': '2019-05-02'
			}, {
				'holiday': null,
				'date': '2019-05-03'
			}, {
				'holiday': 'N',
				'date': '2019-05-04'
			}, {
				'holiday': 'N',
				'date': '2019-05-05'
			}, {
				'holiday': 'N',
				'date': '2019-05-06'
			}, {
				'holiday': 'N',
				'date': '2019-05-07'
			}, {
				'holiday': 'P',
				'date': '2019-05-08'
			}, {
				'holiday': 'P',
				'date': '2019-05-09'
			}, {
				'holiday': 'N',
				'date': '2019-05-10'
			}, {
				'holiday': 'P',
				'date': '2019-05-11'
			}, {
				'holiday': 'N',
				'date': '2019-05-12'
			}, {
				'holiday': 'P',
				'date': '2019-05-13'
			}, {
				'holiday': 'N',
				'date': '2019-05-14'
			}, {
				'holiday': 'P',
				'date': '2019-05-15'
			}, {
				'holiday': 'N',
				'date': '2019-05-16'
			}, {
				'holiday': 'N',
				'date': '2019-05-17'
			}, {
				'holiday': 'N',
				'date': '2019-05-18'
			}, {
				'holiday': 'N',
				'date': '2019-05-19'
			}, {
				'holiday': 'N',
				'date': '2019-05-20'
			}, {
				'holiday': 'P',
				'date': '2019-05-21'
			}, {
				'holiday': 'N',
				'date': '2019-05-22'
			}, {
				'holiday': 'P',
				'date': '2019-05-23'
			}, {
				'holiday': 'N',
				'date': '2019-05-24'
			}, {
				'holiday': 'P',
				'date': '2019-05-25'
			}, {
				'holiday': 'N',
				'date': '2019-05-26'
			}, {
				'holiday': 'N',
				'date': '2019-05-27'
			}, {
				'holiday': 'N',
				'date': '2019-05-28'
			}, {
				'holiday': 'N',
				'date': '2019-05-29'
			}, {
				'holiday': 'N',
				'date': '2019-05-30'
			}, {
				'holiday': 'P',
				'date': '2019-05-31'
			}
		]
	};

	view: CalendarView = CalendarView.Month;
	CalendarView = CalendarView;
	viewMode = 'all';

	// view: string = 'month';

	viewDate: Date = new Date();
	events$: Observable<Array<CalendarEvent<{ res: any }>>>;
	activeDayIsOpen = false;

	actions: CalendarEventAction[] = [
		{
			label: '<i class="fa fa-fw fa-pencil"></i>',
			onClick: ({ event }: { event: CalendarEvent }): void => {
				this.handleEvent('Edited', event);
			}
		},
		{
			label: '<i class="fa fa-fw fa-times"></i>',
			onClick: ({ event }: { event: CalendarEvent }): void => {
				// this.events = this.events.filter(iEvent => iEvent !== event);
				this.handleEvent('Deleted', event);
			}
		}
	];

	constructor(private http: HttpClient, private _httpService: ApiCallService, private config: ConfigService, public snackBar: MatSnackBar) { }

	handleEvent(action: string, event: CalendarEvent): void {
		console.log('event', event);
		console.log('action', action);
		// this.modalData = { event, action };
		// this.modal.open(this.modalContent, { size: 'lg' });
	}

	fetchEvents(viewmode): void {
		console.log('called');
		const getStart: any = {
			month: startOfMonth,
			week: startOfWeek,
			day: startOfDay
		}[this.view];

		const getEnd: any = {
			month: endOfMonth,
			week: endOfWeek,
			day: endOfDay
		}[this.view];

		// const params = new HttpParams()
		// 	.set(
		// 		'primary_release_date.gte',
		// format(getStart(this.viewDate), 'YYYY-MM-DD')
		// 	)
		// 	.set(
		// 		'primary_release_date.lte',
		// 		format(getEnd(this.viewDate), 'YYYY-MM-DD')
		// 	)
		// 	.set('api_key', '0ec33936a68018857d727958dca1424f');

		const headers = this._httpService.createAuthorizationHeaderFormData();
		const params = this._httpService.createUrlParams('Timesheet', 'GetTimeSheet');
		this.events$ = this.http.post(this.config.base_url, { 'contractid': this.contractId, 'from': format(getStart(this.viewDate), 'YYYY-MM-DD'), 'to': format(getEnd(this.viewDate), 'YYYY-MM-DD') }, { headers: headers, params: params })
			.map((response: any) => {
				if (response.success) {
					return response.result.map((res: any) => {
						return {
							title: res.holiday,
							start: new Date(
								res.date + getTimezoneOffsetString(this.viewDate)
							),
							color: this.checkDayType(res.holiday),
							allDay: true,
							meta: {
								res
							},
							actions: this.actions
						};
					});
				} else {
					return false;
				}
			});
	}

	checkDayType(daytype) {
		if (daytype == 'N') {
			return colors.green;
		}
		if (daytype == 'P') {
			return colors.red;
		}
		if (daytype == 'Y') {
			return colors.yellow;
		}
	}

	beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
		// console.log(body);
		body.forEach(day => {
			if (day.date.getDate() % 2 === 1 && day.inMonth) {
				day.cssClass = 'odd-cell';
			}
		});
	}

	dayClicked({ date, events }: { date: Date; events: Array<CalendarEvent<{ res: any }>>; }) {
		if (events.length === 0) { return false; }

		if (events[0].meta.res.holiday === 'P') { return false; }

		if (events[0].meta.res.holiday !== 'P') {
			this.toggleOffDay(events[0].meta.res);
		}
		// console.log(date);
		// console.log(events);
		// if (isSameMonth(date, this.viewDate)) {
		// 	if (
		// 		(isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
		// 		events.length === 0
		// 	) {
		// 		this.activeDayIsOpen = false;
		// 	} else {
		// 		this.activeDayIsOpen = true;
		// 		this.viewDate = date;
		// 	}
		// }
	}

	toggleOffDay(res) {
		let offDayData = {};
		let contractId = { 'timesheet_id': res.id };
		offDayData = Object.assign(offDayData, contractId);

		if (res.holiday === 'N') {
			let status = { 'status': 'Y' };
			offDayData = Object.assign(offDayData, status);
		} else if (res.holiday === 'Y') {
			let status = { 'status': 'N' };
			offDayData = Object.assign(offDayData, status);
		}

		this._httpService.addOffDay(offDayData)
			.subscribe(
				response => {
					if (response.success) {
						this.fetchEvents('demo');

						let snackBarRef = this.snackBar.open('Successfully Updated', 'Close', {
							duration: 5000,
						});

						snackBarRef.onAction().subscribe(() => {
							snackBarRef.dismiss();
							console.log('The snack-bar action was triggered!');
						});
					} else if (!response.success) {
						console.log(response);
					}
				},
				error => {
					console.log(error);
				}
			);
	}

	eventClicked(event: CalendarEvent<{ res: any }>): void {
		window.open(
			`https://www.themoviedb.org/movie/${event.meta.res.id}`,
			'_blank'
		);
	}

	ngOnInit(): void {
		this.fetchEvents(this.viewMode);
	}
}
