import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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

  @Output() onFAQItemEdit: EventEmitter<any> = new EventEmitter<any>();

  @Output() onFAQItemDelete: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  changeEditMode(faqItem) {
    this.onFAQItemEdit.emit(faqItem);
  }

  deleteFaq(faqId) {
    this.onFAQItemDelete.emit(faqId);
  }

  ngOnInit() {
  }

}