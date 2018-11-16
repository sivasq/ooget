import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaqRoutingModule } from './faq-routing.module';
import { FaqManageComponent } from './faq-manage/faq-manage.component';
import { FaqAddComponent } from './faq-add/faq-add.component';
import { FaqListComponent } from './faq-list/faq-list.component';
import { SharedModule } from '../../shared/shared.module';
import { FaqEditComponent } from './faq-edit/faq-edit.component';

@NgModule({
	imports: [
		CommonModule,
		FaqRoutingModule,
		SharedModule
	],
	declarations: [FaqManageComponent, FaqAddComponent, FaqListComponent, FaqEditComponent]
})
export class FaqModule { }
