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
				// loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
				loadChildren: './pages/dashboard/dashboard.module#DashboardModule'
			},
			{
				path: 'jobs',
				// loadChildren: () => import('./pages/jobs/jobs.module').then(m => m.JobsModule),
				loadChildren: './pages/jobs/jobs.module#JobsModule'
			},
			{
				path: 'settings',
				// loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsModule),
				loadChildren: './pages/settings/settings.module#SettingsModule'
			},
			{
				path: 'reports',
				// loadChildren: () => import('./pages/reports/reports.module').then(m => m.ReportsModule)
				loadChildren: './pages/reports/reports.module#ReportsModule'
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
	imports: [RouterModule.forRoot(routes, { useHash: true })],
	exports: [RouterModule]
})
export class AppRoutingModule { }
