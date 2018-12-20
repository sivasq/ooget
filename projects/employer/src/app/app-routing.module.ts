import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthloginComponent } from './authlogin/authlogin.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RegisterComponent } from './register/register.component';
import { Layout1Component } from './layouts/layout1/layout1.component';
import { Layout2Component } from './layouts/layout2/layout2.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
	{
		path: 'auth',
		component: Layout1Component,
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
		]
	},
	{
		path: 'employer',
		component: Layout2Component,
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
