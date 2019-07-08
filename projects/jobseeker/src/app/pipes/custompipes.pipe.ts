import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as _ from 'lodash';
import * as moment from 'moment';

// @Pipe({
//   name: 'custompipes'
// })
// export class CustompipesPipe implements PipeTransform {
//   transform(value: any, args?: any): any {
//     return null;
//   }
// }

// Filter Main Location by Unique
@Pipe({
	name: 'uniquemainlocation',
	pure: false
})
export class UniqueMainLocation implements PipeTransform {
	transform(value: any): any {
		if (value !== undefined && value !== null) {
			return _.uniqBy(value, 'mainlocation');
		}
		return value;
	}
}

//Filter SubLocation Once Choose Main Location
@Pipe({
	name: 'sublocationfilter'
})
export class SubLocationFilter implements PipeTransform {
	transform(items: any[], filter: string): any {
		if (!items || !filter) {
			return items;
		}
		// console.log(items.filter(item => item.mainlocation.toLowerCase() == filter.toLowerCase()));
		return items.filter(item => item.mainlocation.toLowerCase() == filter.toLowerCase());
	}
}

@Pipe({
	name: 'multiplesublocationfilter'
})
export class MultipleSubLocationFilter implements PipeTransform {
	transform(myobjects: any, args?: Array<string>): any {
		var resultdata = [];
		if (args && Array.isArray(myobjects)) {
			args.forEach(function (filterobj) {
				let filtervalue = filterobj;
				myobjects.forEach(function (objectToFilter) {
					if (objectToFilter.region == filtervalue) {
						resultdata.push(objectToFilter);
					}
				})
			});
		}
		return resultdata;
	}
}

//Filter SubLocation Once Choose Main Location
@Pipe({
	name: 'datex'
})
export class DatexPipe implements PipeTransform {
	transform(value: string, format: string = ""): any {
		// console.log(value);
		// console.log(format);
		if (!value || value === "") return "";
		return moment(value).format(format);
	}
}

@Pipe({
	name: 'search'
})
export class SearchPipe implements PipeTransform {
	transform(items: any[], searchText: string): any {
		// console.log(items);
		// console.log(searchText);
		if (items.length == 0) return false;

		if (!searchText) return false;

		// searchText = searchText.toLowerCase();
		return items.includes(searchText);
	}
}

@Pipe({ name: 'safeHtml' })
export class SafeHtml implements PipeTransform {
	constructor(private sanitizer: DomSanitizer) { }

	transform(html) {
		// return this.sanitizer.bypassSecurityTrustStyle(html);
		return this.sanitizer.bypassSecurityTrustHtml(html);
		// return this.sanitizer.bypassSecurityTrustScript(html);
		// return this.sanitizer.bypassSecurityTrustUrl(html);
		// return this.sanitizer.bypassSecurityTrustResourceUrl(html);
	}
}
