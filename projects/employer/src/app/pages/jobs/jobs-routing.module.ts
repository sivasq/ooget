import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddJobComponent } from './add-job/add-job.component';
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { AuthGuardService } from '../../services/auth-guard.service';
import { EditJobComponent } from './edit-job/edit-job.component';
import { MakeDuplicateJobComponent } from './make-duplicate-job/make-duplicate-job.component';
import { ContractDetailsComponent } from './contract-details/contract-details.component';

const routes: Routes = [
	{
		path: 'add',
		component: AddJobComponent,
		canActivate: [AuthGuardService]
	},
	{
		path: 'list',
		component: JobsListComponent,
		canActivate: [AuthGuardService]
	},
	{
		path: ':job_id/edit',
		component: EditJobComponent,
		canActivate: [AuthGuardService]
	},
	{
		path: ':job_id/copyjob',
		component: MakeDuplicateJobComponent,
		canActivate: [AuthGuardService]
	},
	{
		path: ':job_id/view',
		component: JobDetailsComponent,
		canActivate: [AuthGuardService]
  },
  {
    path: ':contract_id/contract_details',
    component: ContractDetailsComponent,
    canActivate: [AuthGuardService]
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
