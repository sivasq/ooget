// import { Component, OnInit } from '@angular/core';
// import { Angular5Csv } from 'angular5-csv/Angular5-csv';
// import { DatePipe } from '@angular/common';

import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
// import { MultipleDatePickerComponent, DateRangeHelper } from '../../multiple-date-picker';
import * as moment from 'moment/moment';
import { MultipleDatePickerComponent } from '../../multiple-date-picker/multiple-date-picker.component';
import { DateRangeHelper } from '../../multiple-date-picker/date-range-helper';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

	highlightDays: any[];
	initialCount: Array<any>; // this is the [(ngModel)] property
	datesArray: Array<any>;
	myMonth: any;

	testItems: any[] = [
		{ 'item': 'array1', 'id': 1 },
		{ 'item': 'array2', 'id': 2 },
		{ 'item': 'array3', 'id': 3 },
	]  // potential use if person wanted to create a choosen item to associate with a list of arrays

	constructor() { }

	// * you don't have to use @ViewChild as it this is used if you want to use some functions within the
	// multiple-date-picker that will help in testing and construction of your design.
	// For example: findArrayofDays() { console.log('this.projectScope = ' + this.projectScope); }
	// clearDays() {
	// this.projectScope = []; this.generate();
	// 	console.log('clearDays was fired off');
	// }
	// and runGenerate() { this.generate(); } 
	// remove this and from html
	@ViewChild(MultipleDatePickerComponent) private multipleDatePicker: MultipleDatePickerComponent;

	ngOnInit(): void {
		// this.heroService.getHeroes()
		// 	.then(heroes => this.heroes = heroes.slice(1, 5));
		// console.log('this is here = ' + matIcons);

		// set array to either [] or the following values like example below
		this.highlightDays = [
			{ date: moment().date(22).valueOf(), css: 'holiday', selectable: true, title: 'Holiday time !' },
			{ date: moment().date(25).valueOf(), css: 'off', selectable: false, title: 'We don\'t work today' },
			{ date: moment().date(30).valueOf(), css: 'birthday', selectable: true, title: 'I\'m thir... i\'m 28, seriously, I mean ...' }
		];
		console.log(this.highlightDays);
		// console.log(new Date(1532522820921));
		// examples to work with
		// console.log('date: moment().date(19).valueOf() ', moment().date(19).valueOf());
		// console.log('date: moment().date(20).valueOf() ', moment().date(20).valueOf());
		// console.log('date: moment().date(21).valueOf() ', moment().date(21).valueOf());

		// ***Setting project scope.
		this.initialCount = [];

		// enter variables for startDates and End dates
		let startDate = moment().date(20).valueOf(); // enter variable or ms value
		let endDate = moment().date(23).valueOf(); // enter variable or ms value // 1502510400000

		// console.log('calucator values ' + this.dateRangeHelper.dateRangeDaysCalculator(endDate, startDate))

		if (DateRangeHelper.dateRangeDaysCalculator(endDate, startDate) >= 0) {
			let days = DateRangeHelper.dateRangeDaysCalculator(endDate, startDate);
			this.datesArray = DateRangeHelper.getDates(new Date(startDate), (new Date(startDate)).addDays(days)); // date object used not moment in this case
			console.log('this.datesArray ', this.datesArray);
		}

		// takes array dates from daterangehelper and adds them to highlighted days for date picker day highlights
		if (this.datesArray !== undefined && this.datesArray.length > 0) {
			let daysArray = this.datesArray;
			let arrayObject = daysArray.find(x => x);
			let arrayKeys = Object.keys(daysArray);
			if (arrayObject !== undefined && arrayKeys.length > 0) {
				this.highlightDays = this.datesArray;
				let stayNames = 'Christian Smith' // should be set to variable 
				for (let i in daysArray) {
					if (true) {
						console.log(daysArray);
						// this.highlightDays.push({ date: daysArray[i], css: 'stay-dates', selectable: true, title: `days off for ${stayNames}` });  // set strings
						this.highlightDays.push({ date: daysArray[i], css: 'stay-dates', selectable: true, title: 'OFF' });  // set strings
					}
				}
			}
		}

		// calculate addional months to add onto the month object... if this is corrupt in anyway it will default to todays month info
		// let monthsFromToday = DateRangeHelper.dateRangeMonthsCalculator(startDate);
		// if (monthsFromToday > 0) {
		// 	// this.myMonth = moment().add(monthsFromToday, 'months');
		// } else {
		// 	this.myMonth = moment().startOf('day');
		// }

	}

	logMonthChanged(newMonth, oldMonth) {
		console.log(newMonth);
	}

	oneDaySelectionOnly(event, date) {
		console.log(event);
		this.highlightDays.push({ date: date.date._d, css: 'stay-dates', selectable: true, title: 'days off for'});
		console.log(this.highlightDays);
	}
}
