import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthloginComponent } from './authlogin/authlogin.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthGuardService } from './services/auth-guard.service';
import { InvoiceTemp1Component } from './reusable-components/invoice-temp1/invoice-temp1.component';
import { InvoiceTemp2Component } from './reusable-components/invoice-temp2/invoice-temp2.component';

const routes: Routes = [
	{
		path: 'inv1',
		component: InvoiceTemp1Component,
	},
	{
		path: 'inv2',
		component: InvoiceTemp2Component,
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
			}
		]
	},
	{
		path: 'admin',
		component: AdminLayoutComponent,
		canActivate: [AuthGuardService],
		children: [
			{
				path: 'dashboard',
				// loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
				loadChildren : './pages/dashboard/dashboard.module#DashboardModule'
			},
			{
				path: 'employers',
				// loadChildren: () => import('./pages/employers/employers.module').then(m => m.EmployersModule),
				loadChildren: './pages/employers/employers.module#EmployersModule'
			},
			{
				path: 'jobseekers',
				// loadChildren: () => import('./pages/jobseeker/jobseeker.module').then(m => m.JobseekerModule),
				loadChildren: './pages/jobseeker/jobseeker.module#JobseekerModule'
			},
			{
				path: 'settings',
				// loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsModule),
				loadChildren: './pages/settings/settings.module#SettingsModule'
			},
			{
				path: 'holidays',
				// loadChildren: () => import('./pages/holidays/holidays.module').then(m => m.HolidaysModule),
				loadChildren: './pages/holidays/holidays.module#HolidaysModule'
			},
			{
				path: 'faq',
				// loadChildren: () => import('./pages/faq/faq.module').then(m => m.FaqModule)
				loadChildren: './pages/faq/faq.module#FaqModule'
			},
			{
				path: 'reports',
				// loadChildren: () => import('./pages/reports/reports.module').then(m => m.ReportsModule)
				loadChildren: './pages/reports/reports.module#ReportsModule'
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

// RouterModule.forRoot([ routes, { enableTracing: true } ])
