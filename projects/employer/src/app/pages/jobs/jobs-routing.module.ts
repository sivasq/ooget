import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddJobComponent } from './add-job/add-job.component';
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { AuthGuardService } from '../../services/auth-guard.service';
import { EditJobComponent } from './edit-job/edit-job.component';
import { MakeDuplicateJobComponent } from './make-duplicate-job/make-duplicate-job.component';
import { ContractDetailsComponent } from './contract-details/contract-details.component';
import { NgxPermissionsGuard } from 'ngx-permissions';

const routes: Routes = [
	{
		path: 'add',
		component: AddJobComponent,
		canActivate: [AuthGuardService, NgxPermissionsGuard],
		data: {
			permissions: {
				only: 'superemployer',
				redirectTo: '/employer/401'
			}
		}
	},
	{
		path: 'list',
		component: JobsListComponent,
		canActivate: [AuthGuardService, NgxPermissionsGuard],
		data: {
			permissions: {
				only: ['superemployer','verifier'],
				redirectTo: '/employer/401'
			}
		}
	},
	{
		path: ':job_id/edit',
		component: EditJobComponent,
		canActivate: [AuthGuardService, NgxPermissionsGuard],
		data: {
			permissions: {
				only: 'superemployer',
				redirectTo: '/employer/401'
			}
		}
	},
	{
		path: ':job_id/copyjob',
		component: MakeDuplicateJobComponent,
		canActivate: [AuthGuardService, NgxPermissionsGuard],
		data: {
			permissions: {
				only: 'superemployer',
				redirectTo: '/employer/401'
			}
		}
	},
	{
		path: ':job_id/view',
		component: JobDetailsComponent,
		canActivate: [AuthGuardService, NgxPermissionsGuard],
		data: {
			permissions: {
				only: ['superemployer', 'verifier'],
				redirectTo: '/employer/401'
			}
		}
	},
	{
		path: ':contract_id/contract_details',
		component: ContractDetailsComponent,
		canActivate: [AuthGuardService, NgxPermissionsGuard],
		data: {
			permissions: {
				only: ['superemployer', 'verifier'],
				redirectTo: '/employer/401'
			}
		}
	},
	{
		path: ':job_id/candidates',
		loadChildren: '../../pages/jobseeker/jobseeker.module#JobseekerModule',
		canActivate: [AuthGuardService]
	},
	{
		path: '',
		redirectTo: 'add',
		pathMatch: 'full'
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class JobsRoutingModule { }
