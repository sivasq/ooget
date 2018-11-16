import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiCallService } from '../../../services/api-call.service';

@Component({
	selector: 'app-faqview',
	templateUrl: './faqview.component.html',
	styleUrls: ['./faqview.component.scss']
})
export class FaqviewComponent implements OnInit {

	title = 'FAQ';

	multi = false;

	displayMode = 'default';

	faqList: any[] = [];

	public busy: Subscription;
	
	constructor(private _httpService: ApiCallService) {
		this.getAllFaqItems();
	}

	getAllFaqItems() {
		console.log();
		this._httpService.getAllFaqItems()
			.subscribe(
				response => {
					// Response is success
					if (response.success) {
						// Show Success Snackbar
						this.faqList = response.faqs;
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

	ngOnInit() { }

}