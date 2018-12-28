import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../../services/auth-guard.service';
import { ViewCompanyDetailsComponent } from './view-company-details/view-company-details.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditCompanyDetailsComponent } from './edit-company-details/edit-company-details.component';
import { ProfileComponent } from './profile/profile.component';
import { ListUserComponent } from './list-user/list-user.component';
import { NgxPermissionsGuard } from 'ngx-permissions';

const routes: Routes = [
	{
		path: 'viewcompany',
		component: ViewCompanyDetailsComponent,
		canActivate: [AuthGuardService, NgxPermissionsGuard],
		data: {
			permissions: {
				only: 'superemployer',
				redirectTo: '/employer/401'
			}
		}
	},
	{
		path: 'editcompany',
		component: EditCompanyDetailsComponent,
		canActivate: [AuthGuardService, NgxPermissionsGuard],
		data: {
			permissions: {
				only: 'superemployer',
				redirectTo: '/employer/401'
			}
		}
	},
	{
		path: 'adduser',
		component: AddUserComponent,
		canActivate: [AuthGuardService, NgxPermissionsGuard],
		data: {
			permissions: {
				only: 'superemployer',
				redirectTo: '/employer/401'
			}
		}
	},
	{
		path: 'edituser/:userId',
		component: EditUserComponent,
		canActivate: [AuthGuardService, NgxPermissionsGuard],
		data: {
			permissions: {
				only: 'superemployer',
				redirectTo: '/employer/401'
			}
		}
	},
	{
		path: 'listusers',
		component: ListUserComponent,
		canActivate: [AuthGuardService, NgxPermissionsGuard],
		data: {
			permissions: {
				only: 'superemployer',
				redirectTo: '/employer/401'
			}
		}
	},
	{
		path: 'profile',
		component: ProfileComponent,
		canActivate: [AuthGuardService, NgxPermissionsGuard],
		data: {
			permissions: {
				only: ['superemployer', 'verifier'],
				redirectTo: '/employer/401'
			}
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class SettingsRoutingModule { }
