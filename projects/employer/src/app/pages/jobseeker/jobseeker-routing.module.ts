import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppliedJobseekerListComponent } from './applied-jobseeker-list/applied-jobseeker-list.component';
import { AuthGuardService } from '../../services/auth-guard.service';
import { JobseekerDetailsComponent } from './jobseeker-details/jobseeker-details.component';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { AllAppliedJobseekersListComponent } from './all-applied-jobseekers-list/all-applied-jobseekers-list.component';

const routes: Routes = [
	{
		path: 'applied',
		component: AppliedJobseekerListComponent,
		canActivate: [AuthGuardService, NgxPermissionsGuard],
		data: {
			permissions: {
				only: 'superemployer',
				redirectTo: '/employer/401'
			}
		}
	},
	{
		path: ':js_id/view',
		component: JobseekerDetailsComponent,
		canActivate: [AuthGuardService, NgxPermissionsGuard],
		data: {
			permissions: {
				only: 'superemployer',
				redirectTo: '/employer/401'
			}
		}
	},
	{
		path: 'pendingapplication',
		component: AllAppliedJobseekersListComponent,
		canActivate: [AuthGuardService, NgxPermissionsGuard],
		data: {
			permissions: {
				only: 'superemployer',
				redirectTo: '/employer/401'
			}
		}
	},
	{
		path: '',
		redirectTo: 'applied',
		pathMatch: 'full'
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class JobseekerRoutingModule { }
