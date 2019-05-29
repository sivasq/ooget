import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthloginComponent } from './authlogin/authlogin.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RegisterComponent } from './register/register.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { AuthGuardService } from './services/auth-guard.service';
import { HomepageComponent } from './homepage/homepage.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
	{
		path: '',
		component: AuthLayoutComponent,
		children: [
			{
				path: '',
				component: HomepageComponent
			},
		]
	},
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
				path: 'change_pass/:userId',
				component: ResetPasswordComponent
			},
			{
				path: 'reg',
				component: RegisterComponent
			},
			{
				path: '**',
				redirectTo: 'login',
				pathMatch: 'full'
			}
		]
	},
	{
		path: 'main',
		component: UserLayoutComponent,
		canActivate: [AuthGuardService],
		children: [
			{
				path: 'dashboard',
				redirectTo: 'profile',
				pathMatch: 'full'
			},
			{
				path: 'dashboard',
				loadChildren: './pages/dashboard/dashboard.module#DashboardModule'
			},
			{
				path: 'jobs',
				loadChildren: './pages/jobs/jobs.module#JobsModule'
			},
			{
				path: 'profile',
				loadChildren: './pages/profile/profile.module#ProfileModule'
			},
			{
				path: 'timesheet',
				loadChildren: './pages/timesheet/timesheet.module#TimesheetModule'
			},
			{
				path: 'faq',
				loadChildren: './pages/faq/faq.module#FaqModule'
			},
			{
				path: '**',
				redirectTo: 'profile',
				pathMatch: 'full'
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
		redirectTo: '',
		pathMatch: 'full'
	},
	{
		path: '**',
		redirectTo: '',
		pathMatch: 'full'
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: true })],
	exports: [RouterModule]
})
export class AppRoutingModule { }
