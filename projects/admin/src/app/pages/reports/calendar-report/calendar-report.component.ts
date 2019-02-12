import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CalendarEvent, CalendarView, CalendarMonthViewDay } from 'angular-calendar';
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
import { Observable } from 'rxjs';
import { ApiCallService } from '../../../services/api-call.service';
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
	selector: 'app-calendar-report',
	templateUrl: './calendar-report.component.html',
	styleUrls: ['./calendar-report.component.scss']
})
export class CalendarReportComponent implements OnInit {
	responseData = {
		"page": 1,
		"total_results": 447,
		"total_pages": 23,
		"results": [
			{
				"name": "jobseeker 1",
				"daytype": "working",
				"date": "2019-02-05"
			}, {
				"name": "jobseeker 2",
				"daytype": "working",
				"date": "2019-02-01"
			}, {
				"name": "jobseeker 3",
				"daytype": "working",
				"date": "2019-02-08"
			}, {
				"name": "jobseeker 4",
				"daytype": "working",
				"date": "2019-02-13"
			}, {
				"name": "jobseeker 5",
				"daytype": "working",
				"date": "2019-02-08"
			}, {
				"name": "jobseeker 6",
				"daytype": "working",
				"date": "2019-02-15"
			}, {
				"name": "jobseeker 7",
				"daytype": "working",
				"date": "2019-02-08"
			}, {
				"name": "jobseeker 8",
				"daytype": "off",
				"date": "2019-02-19"
			}, {
				"name": "jobseeker 9",
				"daytype": "off",
				"date": "2019-02-08"
			}, {
				"name": "jobseeker 10",
				"daytype": "working",
				"date": "2019-02-08"
			}, {
				"name": "jobseeker 11",
				"daytype": "off",
				"date": "2019-02-08"
			}, {
				"name": "jobseeker 12",
				"daytype": "working",
				"date": "2019-02-21"
			}, {
				"name": "jobseeker 13",
				"daytype": "off",
				"date": "2019-02-07"
			}, {
				"name": "jobseeker 14",
				"daytype": "working",
				"date": "2019-02-23"
			}, {
				"name": "jobseeker 15",
				"daytype": "off",
				"date": "2019-02-25"
			}, {
				"name": "jobseeker 16",
				"daytype": "working",
				"date": "2019-02-06"
			}, {
				"name": "jobseeker 17",
				"daytype": "working",
				"date": "2019-02-25"
			}, {
				"name": "jobseeker 18",
				"daytype": "working",
				"date": "2019-02-22"
			}, {
				"name": "jobseeker 19",
				"daytype": "working",
				"date": "2019-02-07"
			}, {
				"name": "jobseeker 20",
				"daytype": "working",
				"date": "2019-02-04"
			}
		]
	};

	view: CalendarView = CalendarView.Month;
	CalendarView = CalendarView;
	viewMode = 'all';

	// view: string = 'month';

	viewDate: Date = new Date();
	events$: Observable<Array<CalendarEvent<{ res: any }>>>;
	activeDayIsOpen: boolean = false;

	constructor(private http: HttpClient, private _httpService: ApiCallService) { }

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

		const params = new HttpParams()
			.set(
				'primary_release_date.gte',
				format(getStart(this.viewDate), 'YYYY-MM-DD')
			)
			.set(
				'primary_release_date.lte',
				format(getEnd(this.viewDate), 'YYYY-MM-DD')
			)
			.set('api_key', '0ec33936a68018857d727958dca1424f');

		this.events$ =
			this.http
				.get('https://api.themoviedb.org/3/discover/movie', { params })
				// .pipe(
				// .map(({ results }: { results: any[] }) => {
				.map((response: any) => {
					return this.responseData.results.map((res: any) => {
						return {
							title: res.name,
							start: new Date(
								res.date + getTimezoneOffsetString(this.viewDate)
							),
							color: this.checkDayType(res.daytype),
							allDay: true,
							meta: {
								res
							}
						};
					});
				})
		// );
	}

	checkDayType(daytype) {
		if (daytype == 'working') {
			return colors.green
		}
		if (daytype == 'off') {
			return colors.red
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
		window.open(
			`https://www.themoviedb.org/movie/${event.meta.res.id}`,
			'_blank'
		);
	}

	print(): void {
		let printContents, popupWin;
		printContents = document.getElementById('print-section').innerHTML;
		let stylesHtml = this.getTagsHtml('style');
		let linksHtml = this.getTagsHtml('link');
		popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
		popupWin.document.open();
		popupWin.document.write(`
    <html>
        <head>
		  <title>Off Days Calendar View</title>
		  	${linksHtml}
            ${stylesHtml}
		  <link rel="stylesheet" type="text/css" href="style.css" />
          <style>
          //........Customized style.......
          </style>
        </head>
    	<body onload="window.print();window.close()">${printContents}</body>
    </html>`
		);
		popupWin.document.close();
	}

	private getTagsHtml(tagName: keyof HTMLElementTagNameMap): string {
		const htmlStr: string[] = [];
		const elements = document.getElementsByTagName(tagName);
		for (let idx = 0; idx < elements.length; idx++) {
			htmlStr.push(elements[idx].outerHTML);
		}
		return htmlStr.join('\r\n');
	}
}
