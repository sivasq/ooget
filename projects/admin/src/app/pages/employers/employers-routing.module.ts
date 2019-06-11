import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployersListComponent } from './employers-list/employers-list.component';
import { AddEmployerComponent } from './add-employer/add-employer.component';
import { EmployerDetailsComponent } from './employer-details/employer-details.component';
import { AuthGuardService } from '../../services/auth-guard.service';
import { EditEmployerComponent } from './edit-employer/edit-employer.component';
import { ListUserComponent } from './list-user/list-user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';

const routes: Routes = [
	{
		path: 'list',
		component: EmployersListComponent,
		canActivate: [AuthGuardService]
	},
	{
		path: ':emp_id/view',
		component: EmployerDetailsComponent,
		canActivate: [AuthGuardService]
	},
	{
		path: ':emp_id/edit',
		component: EditEmployerComponent,
		canActivate: [AuthGuardService]
	},
	{
		path: 'add',
		component: AddEmployerComponent,
		canActivate: [AuthGuardService]
	},
	{
		path: ':emp_id/users',
		component: ListUserComponent,
		canActivate: [AuthGuardService]
	},
	{
		path: ':emp_id/user/add',
		component: AddUserComponent,
		canActivate: [AuthGuardService]
	},
	{
		path: ':emp_id/user/:userId',
		component: EditUserComponent,
		canActivate: [AuthGuardService]
	},
	{
		path: 'jobs',
		// loadChildren: () => import('../../pages/jobs/jobs.module').then(m => m.JobsModule),
		// canActivate: [AuthGuardService]
		loadChildren: '../../pages/jobs/jobs.module#JobsModule'
	},
	{
		path: ':emp_id/jobs',
		// loadChildren: () => import('../../pages/jobs/jobs.module').then(m => m.JobsModule),
		// canActivate: [AuthGuardService]
		loadChildren: '../../pages/jobs/jobs.module#JobsModule'
	},
	{
		path: '',
		redirectTo: 'list',
		pathMatch: 'full'
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class EmployersRoutingModule { }
