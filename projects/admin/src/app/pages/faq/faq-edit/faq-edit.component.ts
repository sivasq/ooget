import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-faq-edit',
	templateUrl: './faq-edit.component.html',
	styleUrls: ['./faq-edit.component.scss']
})
export class FaqEditComponent implements OnInit {

	@Input() title;

	@Output() onFAQItemUpdated: EventEmitter<any> = new EventEmitter<any>();
	@Output() onFAQUpdateCancel: EventEmitter<any> = new EventEmitter<any>();

	@Input() faqDetails: any;

	question: string;
	answer: string;

	constructor() { }

	// reset() {
	//   this.faqDetails.question = this.faqDetails.answer = undefined;
	// }

	update(): void {
		const faqItem: any = {
			id: this.faqDetails.id,
			name: this.faqDetails.name,
			body: this.faqDetails.body,
			type: 3
		}
		// console.log(faqItem);
		this.onFAQItemUpdated.emit(faqItem);
	}

	cancel(): void {
		this.onFAQUpdateCancel.emit();
	}

	ngOnInit() {
		// console.log(this.faqDetails);
	}

}
