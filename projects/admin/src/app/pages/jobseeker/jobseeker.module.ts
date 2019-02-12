import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { JobseekerRoutingModule } from './jobseeker-routing.module';

import { AppliedJobseekerListComponent } from './applied-jobseeker-list/applied-jobseeker-list.component';
import { JobseekerDetailsComponent } from './jobseeker-details/jobseeker-details.component';
import { JobseekerListComponent } from './jobseeker-list/jobseeker-list.component';
import { JobseekerFullDetailsComponent } from './jobseeker-full-details/jobseeker-full-details.component';
import { PendingJobseekersComponent } from './pending-jobseekers/pending-jobseekers.component';
import { JsTermsAndConditionsComponent } from './js-terms-and-conditions/js-terms-and-conditions.component';

@NgModule({
  imports: [
    CommonModule,
    JobseekerRoutingModule,
    SharedModule
  ],
  declarations: [AppliedJobseekerListComponent, JobseekerDetailsComponent, JobseekerListComponent, JobseekerFullDetailsComponent, PendingJobseekersComponent, JsTermsAndConditionsComponent]
})
export class JobseekerModule { }
