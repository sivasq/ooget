import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddJobComponent } from './add-job/add-job.component';
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { EditJobComponent } from './edit-job/edit-job.component';
import { PendingJobsComponent } from './pending-jobs/pending-jobs.component';
import { AuthGuardService } from '../../services/auth-guard.service';
import { ContractDetailsComponent } from './contract-details/contract-details.component';
import { MakeDuplicateJobComponent } from './make-duplicate-job/make-duplicate-job.component';
import { LivejobsComponent } from './livejobs/livejobs.component';

const routes: Routes = [
	{
		path: 'add',
		component: AddJobComponent,
		canActivate: [AuthGuardService],
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
		path: 'list',
		component: JobsListComponent,
		canActivate: [AuthGuardService]
	},
	{
		path: 'pending',
		component: PendingJobsComponent,
		canActivate: [AuthGuardService]
	},
	{
		path: 'live',
		component: LivejobsComponent,
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
