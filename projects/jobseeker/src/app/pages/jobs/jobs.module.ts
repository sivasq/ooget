import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { JobsRoutingModule } from './jobs-routing.module';
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { MatchedJobsComponent } from './matched-jobs/matched-jobs.component';
import { AppliedJobsComponent } from './applied-jobs/applied-jobs.component';
import { JobOffersComponent } from './job-offers/job-offers.component';
import { SavedJobsComponent } from './saved-jobs/saved-jobs.component';

@NgModule({
  imports: [
    CommonModule,
    JobsRoutingModule,
    SharedModule
  ],
  declarations: [JobsListComponent, JobDetailsComponent, MatchedJobsComponent, AppliedJobsComponent, JobOffersComponent, SavedJobsComponent]
})
export class JobsModule { }
