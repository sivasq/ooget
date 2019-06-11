import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CalendarEvent, CalendarView, CalendarMonthViewDay, CalendarEventAction } from 'angular-calendar';
import { isSameMonth, isSameDay, startOfMonth, endOfMonth, startOfWeek, endOfWeek, startOfDay, endOfDay, format } from 'date-fns';
import { Observable, of, Subscription } from 'rxjs';
import { ApiCallService } from '../../../services/api-call.service';
import { AsyncSubscriber } from '../../../services/async.service';

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
	selector: 'app-calendar-report',
	templateUrl: './calendar-report.component.html',
	styleUrls: ['./calendar-report.component.scss']
})
export class CalendarReportComponent implements OnInit {
	responseData = {
		'success': true,
		'page': 1,
		'total_results': 447,
		'total_pages': 23,
		'results': [
			{
				'name': 'jobseeker 1',
				'daytype': 'working',
				'date': '2019-02-05'
			}, {
				'name': 'jobseeker 2',
				'daytype': 'working',
				'date': '2019-02-01'
			}, {
				'name': 'jobseeker 3',
				'daytype': 'working',
				'date': '2019-02-08'
			}, {
				'name': 'jobseeker 4',
				'daytype': 'working',
				'date': '2019-02-13'
			}, {
				'name': 'jobseeker 5',
				'daytype': 'working',
				'date': '2019-02-08'
			}, {
				'name': 'jobseeker 6',
				'daytype': 'working',
				'date': '2019-02-15'
			}, {
				'name': 'jobseeker 7',
				'daytype': 'working',
				'date': '2019-02-08'
			}, {
				'name': 'jobseeker 8',
				'daytype': 'off',
				'date': '2019-02-19'
			}, {
				'name': 'jobseeker 9',
				'daytype': 'off',
				'date': '2019-02-08'
			}, {
				'name': 'jobseeker 10',
				'daytype': 'working',
				'date': '2019-02-08'
			}, {
				'name': 'jobseeker 11',
				'daytype': 'off',
				'date': '2019-02-08'
			}, {
				'name': 'jobseeker 12',
				'daytype': 'working',
				'date': '2019-02-21'
			}, {
				'name': 'jobseeker 13',
				'daytype': 'off',
				'date': '2019-02-07'
			}, {
				'name': 'jobseeker 14',
				'daytype': 'working',
				'date': '2019-02-23'
			}, {
				'name': 'jobseeker 15',
				'daytype': 'off',
				'date': '2019-02-25'
			}, {
				'name': 'jobseeker 16',
				'daytype': 'working',
				'date': '2019-02-06'
			}, {
				'name': 'jobseeker 17',
				'daytype': 'working',
				'date': '2019-02-25'
			}, {
				'name': 'jobseeker 18',
				'daytype': 'working',
				'date': '2019-02-22'
			}, {
				'name': 'jobseeker 19',
				'daytype': 'working',
				'date': '2019-02-07'
			}, {
				'name': 'jobseeker 20',
				'daytype': 'working',
				'date': '2019-02-04'
			}
		]
	};

	view: CalendarView = CalendarView.Month;
	CalendarView = CalendarView;
	viewMode = 'all';

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

	appearance$: Observable<any>;

	busy: Subscription;
	isEmployerAvailable: boolean;
	isJobsAvailable: boolean;
	employers_list = [];
	jobs_list = [];
	selectedEmployer;
	selectedJob;

	constructor(private http: HttpClient, private _httpService: ApiCallService, private asyncSubscriber: AsyncSubscriber) {
		this.appearance$ = asyncSubscriber.getAppearance.pipe();
		this.getAllEmployers();
	}

	// Get All Employers List
	getAllEmployers() {
		this.busy = this._httpService.getAllEmployers()
			.subscribe(
				response => {
					if (response.success) {
						this.employers_list = response.result;
					} else if (!response.success) {
						console.log(response);
					}
				},
				error => {
					this.employers_list = [];
					console.log(error);
				}
			);
	}

	// Get Jobs For Employer
	getEmployerJobs(event) {
		this.busy = this._httpService.getSingleEmployersJobsList({ 'employerid': event })
			.subscribe(
				response => {
					if (response.success) {
						this.jobs_list = response.result;
					} else if (!response.success) {
						console.log(response);
					}
				},
				error => {
					this.jobs_list = [];
					console.log(error);
				}
			);
	}

	handleEvent(action: string, event: CalendarEvent): void {
		console.log('event', event);
		console.log('action', action);
		// this.modalData = { event, action };
		// this.modal.open(this.modalContent, { size: 'lg' });
	}

	ngOnInit(): void {
		this.fetchEvents(this.viewMode);
	}

	fetchEvents(viewmode): void {
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
		// 		format(getStart(this.viewDate), 'YYYY-MM-DD')
		// 	)
		// 	.set(
		// 		'primary_release_date.lte',
		// 		format(getEnd(this.viewDate), 'YYYY-MM-DD')
		// 	)
		// 	.set('api_key', '0ec33936a68018857d727958dca1424f');

		this.events$ =
			this._httpService.GetJobTimeSheetList({ 'from': format(getStart(this.viewDate), 'YYYY-MM-DD'), 'to': format(getEnd(this.viewDate), 'YYYY-MM-DD'), 'jobid': 1 })
				// of(this.responseData)
				.map(
					response => {
						if (response.success) {
							return response.result.filter(item => {
								if (viewmode === 'all') {
									return item.worked === 'ON' || item.worked === 'OFF';
								} else {
									return item.worked === viewmode;
								}
							}).map((res: any) => {
								return {
									title: res.firstname,
									start: new Date(
										res.date + getTimezoneOffsetString(this.viewDate)
									),
									color: this.checkDayType(res.worked),
									allDay: true,
									meta: {
										res
									},
									// actions: this.actions
								};
							});
						} else if (!response.success) {
							return [];
						}
					},
					error => {
						console.log(error);
						return [];
					}
				);
	}

	checkDayType(daytype) {
		if (daytype == 'ON') {
			return colors.green;
		}
		if (daytype == 'OFF') {
			return colors.red;
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

	dayClicked({ date, events }: { date: Date; events: Array<CalendarEvent<{ res: any }>>; }): void {
		if (isSameMonth(date, this.viewDate)) {
			if (
				(isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
				events.length === 0
			) {
				this.activeDayIsOpen = false;
			} else {
				this.activeDayIsOpen = true;
				this.viewDate = date;
			}
		}
	}

	eventClicked(event: CalendarEvent<{ res: any }>): void {
		// window.open(
		// 	`https://www.themoviedb.org/movie/${event.meta.res.id}`,
		// 	'_blank'
		// );
	}
	print(){}
	// print(): void {
	// 	let printContents, popupWin;
	// 	printContents = document.getElementById('print-section').innerHTML;
	// 	let stylesHtml = this.getTagsHtml('style');
	// 	let linksHtml = this.getTagsHtml('link');
	// 	popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
	// 	popupWin.document.open();
	// 	popupWin.document.write(`
    // <html>
    //     <head>
	// 	  <title>Off Days Calendar View</title>
	// 	  	${linksHtml}
    //         ${stylesHtml}
    //       <style>
    //       .cal-month-view .cal-header { text-align: center; font-weight: bolder } .cal-month-view .cal-cell-row:hover { background-color: #fafafa } .cal-month-view .cal-header .cal-cell { padding: 5px 0; overflow: hidden; text-overflow: ellipsis; display: block; white-space: nowrap } .cal-month-view .cal-cell-row .cal-cell:hover, .cal-month-view .cal-cell.cal-has-events.cal-open { background-color: #ededed } .cal-month-view .cal-days { border: 1px solid #e1e1e1; border-bottom: 0 } .cal-month-view .cal-cell-top { min-height: 78px; flex: 1 } .cal-month-view .cal-cell-row { -js-display: flex; display: flex } .cal-month-view .cal-cell { float: left; flex: 1; -js-display: flex; display: flex; flex-direction: column; align-items: stretch } .cal-month-view .cal-day-cell { min-height: 100px } @media all and (-ms-high-contrast:none) { .cal-month-view .cal-day-cell { display: block } } .cal-month-view .cal-day-cell:not(:last-child) { border-right: 1px solid #e1e1e1 } .cal-month-view .cal-days .cal-cell-row { border-bottom: 1px solid #e1e1e1 } .cal-month-view .cal-day-badge { margin-top: 18px; margin-left: 10px; background-color: #b94a48; display: inline-block; min-width: 10px; padding: 3px 7px; font-size: 12px; font-weight: 700; line-height: 1; color: #fff; text-align: center; white-space: nowrap; vertical-align: middle; border-radius: 10px } .cal-month-view .cal-day-number { font-size: 1.2em; font-weight: 400; opacity: .5; margin-top: 15px; margin-right: 15px; float: right; margin-bottom: 10px } .cal-month-view .cal-events { flex: 1; align-items: flex-end; margin: 3px; line-height: 10px; -js-display: flex; display: flex; flex-wrap: wrap } .cal-month-view .cal-event { width: 10px; height: 10px; border-radius: 50%; display: inline-block; margin: 2px; background-color: #1e90ff; border-color: #d1e8ff; color: #fff } .cal-month-view .cal-day-cell.cal-in-month.cal-has-events { cursor: pointer } .cal-month-view .cal-day-cell.cal-out-month .cal-day-number { opacity: .1; cursor: default } .cal-month-view .cal-day-cell.cal-weekend .cal-day-number { color: #8b0000 } .cal-month-view .cal-day-cell.cal-today { background-color: #e8fde7 } .cal-month-view .cal-day-cell.cal-today .cal-day-number { font-size: 1.9em } .cal-month-view .cal-day-cell.cal-drag-over { background-color: #e0e0e0!important } .cal-month-view .cal-open-day-events { padding: 15px; color: #fff; background-color: #555; box-shadow: inset 0 0 15px 0 rgba(0, 0, 0, .5) } .cal-month-view .cal-open-day-events .cal-event { position: relative; top: 2px } .cal-month-view .cal-out-month .cal-day-badge, .cal-month-view .cal-out-month .cal-event { opacity: .3 } .cal-month-view .cal-draggable { cursor: move } .cal-month-view .cal-drag-active * { pointer-events: none } .cal-month-view .cal-event-title { cursor: pointer } .cal-month-view .cal-event-title:hover { text-decoration: underline } .cal-week-view .cal-day-headers { -js-display: flex; display: flex; border: 1px solid #e1e1e1; padding-left: 70px } .cal-week-view .cal-day-headers .cal-header { flex: 1; text-align: center; padding: 5px } .cal-week-view .cal-day-headers .cal-header:not(:last-child) { border-right: 1px solid #e1e1e1 } .cal-week-view .cal-day-headers .cal-header:first-child { border-left: 1px solid #e1e1e1 } .cal-week-view .cal-day-headers .cal-drag-over, .cal-week-view .cal-day-headers .cal-header:hover { background-color: #ededed } .cal-week-view .cal-day-headers span { font-weight: 400; opacity: .5 } .cal-week-view .cal-day-column { flex-grow: 1; border-left: 1px solid #e1e1e1 } .cal-week-view .cal-event { font-size: 12px; background-color: #d1e8ff; border: 1px solid #1e90ff; color: #1e90ff } .cal-week-view .cal-time-label-column { width: 70px; height: 100% } .cal-week-view .cal-all-day-events { border: 1px solid #e1e1e1; border-top: 0; border-bottom-width: 3px; padding-top: 3px; position: relative } .cal-week-view .cal-all-day-events .cal-day-columns { height: 100%; width: 100%; -js-display: flex; display: flex; position: absolute; top: 0; z-index: 0 } .cal-week-view .cal-all-day-events .cal-events-row { position: relative; height: 31px; margin-left: 70px } .cal-week-view .cal-all-day-events .cal-event-container { display: inline-block; position: absolute } .cal-week-view .cal-all-day-events .cal-event-container.resize-active { z-index: 1; pointer-events: none } .cal-week-view .cal-all-day-events .cal-event { padding: 0 5px; margin-left: 2px; margin-right: 2px; height: 28px; line-height: 28px } .cal-week-view .cal-all-day-events .cal-starts-within-week .cal-event { border-top-left-radius: 5px; border-bottom-left-radius: 5px } .cal-week-view .cal-all-day-events .cal-ends-within-week .cal-event { border-top-right-radius: 5px; border-bottom-right-radius: 5px } .cal-week-view .cal-all-day-events .cal-time-label-column { -js-display: flex; display: flex; align-items: center; justify-content: center; font-size: 14px } .cal-week-view .cal-all-day-events .cal-resize-handle { width: 6px; height: 100%; cursor: col-resize; position: absolute; top: 0 } .cal-week-view .cal-all-day-events .cal-resize-handle.cal-resize-handle-after-end { right: 0 } .cal-week-view .cal-header.cal-today { background-color: #e8fde7 } .cal-week-view .cal-header.cal-weekend span { color: #8b0000 } .cal-week-view .cal-event, .cal-week-view .cal-header { overflow: hidden; text-overflow: ellipsis; white-space: nowrap } .cal-week-view .cal-drag-active { pointer-events: none; z-index: 1 } .cal-week-view .cal-drag-active * { pointer-events: none } .cal-week-view .cal-time-events { position: relative; border: 1px solid #e1e1e1; border-top: 0; -js-display: flex; display: flex } .cal-week-view .cal-time-events .cal-day-columns { -js-display: flex; display: flex; flex-grow: 1 } .cal-week-view .cal-time-events .cal-day-columns:not(.cal-resize-active) .cal-hour-segment:hover { background-color: #ededed } .cal-week-view .cal-time-events .cal-day-column { position: relative } .cal-week-view .cal-time-events .cal-event-container { position: absolute; z-index: 1 } .cal-week-view .cal-time-events .cal-event { width: calc(100% - 2px); height: calc(100% - 2px); margin: 1px; padding: 0 5px; line-height: 25px } .cal-week-view .cal-time-events .cal-resize-handle { width: 100%; height: 4px; cursor: row-resize; position: absolute } .cal-week-view .cal-time-events .cal-resize-handle.cal-resize-handle-after-end { bottom: 0 } .cal-week-view .cal-hour-odd { background-color: #fafafa } .cal-week-view .cal-hour-segment { position: relative } .cal-week-view .cal-hour-segment::after { content: '\00a0' } .cal-week-view .cal-event-container:not(.cal-draggable) { cursor: pointer } .cal-week-view .cal-draggable { cursor: move } .cal-week-view .cal-drag-over .cal-hour-segment { background-color: #ededed } .cal-week-view .cal-hour-segment, .cal-week-view mwl-calendar-week-view-hour-segment { display: block } .cal-week-view .cal-hour:last-child :not(:last-child) .cal-hour-segment, .cal-week-view .cal-hour:not(:last-child) .cal-hour-segment { border-bottom: thin dashed #e1e1e1 } .cal-week-view .cal-time { font-weight: 700; padding-top: 5px; width: 70px; text-align: center } .cal-week-view .cal-hour-segment.cal-after-hour-start .cal-time { display: none } .cal-week-view .cal-starts-within-day .cal-event { border-top-left-radius: 5px; border-top-right-radius: 5px } .cal-week-view .cal-ends-within-day .cal-event { border-bottom-left-radius: 5px; border-bottom-right-radius: 5px } .cal-day-view .cal-hour-rows { width: 100%; border: 1px solid #e1e1e1; overflow-x: scroll; position: relative } .cal-day-view .cal-hour:nth-child(odd) { background-color: #fafafa } .cal-day-view .cal-hour-segment, .cal-day-view mwl-calendar-day-view-hour-segment { display: block } .cal-day-view .cal-hour-segment::after { content: '\00a0' } .cal-day-view .cal-hour:last-child :not(:last-child) .cal-hour-segment, .cal-day-view .cal-hour:not(:last-child) .cal-hour-segment { border-bottom: thin dashed #e1e1e1 } .cal-day-view .cal-time { font-weight: 700; padding-top: 5px; width: 70px; text-align: center } .cal-day-view .cal-hour-segment.cal-after-hour-start .cal-time { display: none } .cal-day-view .cal-drag-over .cal-hour-segment, .cal-day-view .cal-hour-segment:hover { background-color: #ededed } .cal-day-view .cal-drag-active .cal-hour-segment { pointer-events: none } .cal-day-view .cal-event-container { position: absolute; cursor: pointer } .cal-day-view .cal-event-container.resize-active { z-index: 1; pointer-events: none } .cal-day-view .cal-event { padding: 5px; font-size: 12px; background-color: #d1e8ff; border: 1px solid #1e90ff; color: #1e90ff; box-sizing: border-box; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; height: 100% } .cal-day-view .cal-all-day-events>* { cursor: pointer } .cal-day-view .cal-draggable { cursor: move } .cal-day-view .cal-starts-within-day .cal-event { border-top-left-radius: 5px; border-top-right-radius: 5px } .cal-day-view .cal-ends-within-day .cal-event { border-bottom-left-radius: 5px; border-bottom-right-radius: 5px } .cal-day-view .cal-drag-active { z-index: 1 } .cal-day-view .cal-drag-active * { pointer-events: none } .cal-day-view .cal-resize-handle { width: 100%; height: 4px; cursor: row-resize; position: absolute } .cal-day-view .cal-resize-handle.cal-resize-handle-after-end { bottom: 0 } .cal-tooltip { position: absolute; z-index: 1070; display: block; font-style: normal; font-weight: 400; letter-spacing: normal; line-break: auto; line-height: 1.5; text-align: start; text-decoration: none; text-shadow: none; text-transform: none; white-space: normal; word-break: normal; word-spacing: normal; font-size: 11px; word-wrap: break-word; opacity: .9 } .cal-tooltip.cal-tooltip-top { padding: 5px 0; margin-top: -3px } .cal-tooltip.cal-tooltip-top .cal-tooltip-arrow { bottom: 0; left: 50%; margin-left: -5px; border-width: 5px 5px 0; border-top-color: #000 } .cal-tooltip.cal-tooltip-right { padding: 0 5px; margin-left: 3px } .cal-tooltip.cal-tooltip-right .cal-tooltip-arrow { top: 50%; left: 0; margin-top: -5px; border-width: 5px 5px 5px 0; border-right-color: #000 } .cal-tooltip.cal-tooltip-bottom { padding: 5px 0; margin-top: 3px } .cal-tooltip.cal-tooltip-bottom .cal-tooltip-arrow { top: 0; left: 50%; margin-left: -5px; border-width: 0 5px 5px; border-bottom-color: #000 } .cal-tooltip.cal-tooltip-left { padding: 0 5px; margin-left: -3px } .cal-tooltip.cal-tooltip-left .cal-tooltip-arrow { top: 50%; right: 0; margin-top: -5px; border-width: 5px 0 5px 5px; border-left-color: #000 } .cal-tooltip-inner { max-width: 200px; padding: 3px 8px; color: #fff; text-align: center; background-color: #000; border-radius: .25rem } .cal-tooltip-arrow { position: absolute; width: 0; height: 0; border-color: transparent; border-style: solid }
    //       </style>
    //     </head>
	// 	<body onload="window.print()">
	// 		${printContents}
	// 	</body>
    // </html>`
	// 	);
	// 	popupWin.document.close();
	// }

	private getTagsHtml(tagName: keyof HTMLElementTagNameMap): string {
		const htmlStr: string[] = [];
		const elements = document.getElementsByTagName(tagName);
		for (let idx = 0; idx < elements.length; idx++) {
			htmlStr.push(elements[idx].outerHTML);
		}
		return htmlStr.join('\r\n');
	}
}
