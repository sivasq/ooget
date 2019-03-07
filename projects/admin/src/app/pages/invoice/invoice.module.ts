import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';

@NgModule({
	declarations: [CreateInvoiceComponent],
	imports: [
		CommonModule,
		SharedModule,
    	InvoiceRoutingModule
	]
})
export class InvoiceModule { }
