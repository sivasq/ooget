import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthloginComponent } from './authlogin/authlogin.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RegisterComponent } from './register/register.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthGuardService } from './services/auth-guard.service';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
	{
		path: 'auth',
		component: AuthLayoutComponent,
		children: [
			{
				path: 'login',
				component: AuthloginComponent
			},
			{
				path: 'reset_pass',
				component: ForgotPasswordComponent
			},
			{
				path: 'reg',
				component: RegisterComponent
			},
			{
				path: 'change_pass/:userId',
				component: ResetPasswordComponent
			},
		]
	},
	{
		path: 'employer',
		component: AdminLayoutComponent,
		canActivate: [AuthGuardService],
		children: [
			{
				path: 'dashboard',
				loadChildren: './pages/dashboard/dashboard.module#DashboardModule',
			},
			{
				path: 'jobs',
				loadChildren: './pages/jobs/jobs.module#JobsModule',
			},
			{
				path: 'settings',
				loadChildren: './pages/settings/settings.module#SettingsModule',
			},
			{
				path: '401',
				component: NotAuthorizedComponent,
				// canActivate: [AuthGuardService],
			}
		]
	},
	{
		path: 'logout',
		redirectTo: 'auth/login',
		pathMatch: 'full'
	},
	{
		path: '',
		redirectTo: 'auth/login',
		pathMatch: 'full'
	},
	{
		path: '**',
		redirectTo: 'auth/login',
		pathMatch: 'full'
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
