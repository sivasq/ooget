import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../../services/auth-guard.service';
import { ViewCompanyDetailsComponent } from './view-company-details/view-company-details.component';

const routes: Routes = [
	{
		path: '',
		component: ViewCompanyDetailsComponent,
		canActivate: [AuthGuardService]
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
