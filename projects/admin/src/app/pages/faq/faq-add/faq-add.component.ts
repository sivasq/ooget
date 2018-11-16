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

	add(form): void {
		const faqItem: any = {
			faqquestion: this.question,
			faqanswer: this.answer
		}
		this.onFAQItemAdded.emit(faqItem);
		form.resetForm();
	}

	ngOnInit() {
	}

}