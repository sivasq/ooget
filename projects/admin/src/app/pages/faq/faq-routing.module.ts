import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FaqManageComponent } from './faq-manage/faq-manage.component';

const routes: Routes = [
	{
		path: '',
		component: FaqManageComponent,
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class FaqRoutingModule { }
