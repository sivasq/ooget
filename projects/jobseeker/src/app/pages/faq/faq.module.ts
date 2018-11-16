import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaqRoutingModule } from './faq-routing.module';
import { FaqviewComponent } from './faqview/faqview.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
	imports: [
		CommonModule,
		FaqRoutingModule,
		SharedModule
	],
	declarations: [FaqviewComponent]
})
export class FaqModule { }
