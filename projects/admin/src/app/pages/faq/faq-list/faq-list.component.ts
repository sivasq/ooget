import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiCallService } from '../../../services/api-call.service';

@Component({
	selector: 'app-faq-list',
	templateUrl: './faq-list.component.html',
	styleUrls: ['./faq-list.component.scss']
})
export class FaqListComponent implements OnInit {

	@Input() title;

	@Input() multi = false;

	@Input() displayMode;

	@Input() faqList: any[] = [];

	faqDetail: any = [];

	@Output() onFAQItemEdit: EventEmitter<any> = new EventEmitter<any>();

	@Output() onFAQItemDelete: EventEmitter<any> = new EventEmitter<any>();

	constructor(private _httpService: ApiCallService) { }

	changeEditMode(faqItem) {
		this.onFAQItemEdit.emit(faqItem);
	}

	deleteFaq(faqId) {
		this.onFAQItemDelete.emit(faqId);
	}

	getFaqItemDetails(faqId) {
		console.log(faqId);
		this._httpService.getFaqItemDetails({ 'id': faqId })
			.subscribe(
				response => {
					// Response is success
					if (response.success) {
						// Show Success Snackbar
						this.faqDetail = response.result[0];
						// Response is failed
					} else if (!response.success) {
						console.log(response);
					}
				},
				error => {
					console.log(error);
				}
			);
	}

	ngOnInit() {
	}

}
