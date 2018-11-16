import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FaqviewComponent } from './faqview/faqview.component';

const routes: Routes = [
	{
		path: '',
		component: FaqviewComponent,
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class FaqRoutingModule { }
