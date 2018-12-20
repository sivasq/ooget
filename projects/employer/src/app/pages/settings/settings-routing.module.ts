import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../../services/auth-guard.service';
import { ViewCompanyDetailsComponent } from './view-company-details/view-company-details.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditCompanyDetailsComponent } from './edit-company-details/edit-company-details.component';

const routes: Routes = [
	{
		path: 'viewcompany',
		component: ViewCompanyDetailsComponent,
		canActivate: [AuthGuardService]
	},
	{
		path: 'editcompany',
		component: EditCompanyDetailsComponent,
		canActivate: [AuthGuardService]
	},
	{
		path: 'adduser',
		component: AddUserComponent,
		canActivate: [AuthGuardService]
	},
	{
		path: 'edituser',
		component: EditUserComponent,
		canActivate: [AuthGuardService]
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
