import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { MatchedJobsComponent } from './matched-jobs/matched-jobs.component';
import { AppliedJobsComponent } from './applied-jobs/applied-jobs.component';
import { JobOffersComponent } from './job-offers/job-offers.component';
import { SavedJobsComponent } from './saved-jobs/saved-jobs.component';

const routes: Routes = [
	{
		path: 'list',
		component: JobsListComponent
	},
	{
		path: 'matchedjobs',
		component: MatchedJobsComponent
	},
	{
		path: 'savedjobs',
		component: SavedJobsComponent
	},
	{
		path: 'appliedjobs',
		component: AppliedJobsComponent
	},
	{
		path: 'joboffers',
		component: JobOffersComponent
	},
	{
		path: ':job_id/view',
		component: JobDetailsComponent
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
