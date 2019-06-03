import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-faq-add',
	templateUrl: './faq-add.component.html',
	styleUrls: ['./faq-add.component.scss']
})
export class FaqAddComponent implements OnInit {

	@Input() title;

	@Output() onFAQItemAdded: EventEmitter<any> = new EventEmitter<any>();

	question: string;
	answer: string;

	constructor() { }

	reset() {
		this.question = this.answer = null;
	}

	// type 1 = employer, 2 = jobseeker, 3 = employer & Jobseeker
	add(form): void {
		const faqItem: any = {
			name: this.question,
			body: this.answer,
			type: 3
		}
		this.onFAQItemAdded.emit(faqItem);
		form.resetForm();
	}

	ngOnInit() {
	}

}
