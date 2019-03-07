import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';
import { AuthGuardService } from '../../services/auth-guard.service';

const routes: Routes = [
	{
		path: '',
		component: CreateInvoiceComponent,
		canActivate: [AuthGuardService],
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class InvoiceRoutingModule { }
