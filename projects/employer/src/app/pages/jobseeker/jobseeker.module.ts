import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { JobseekerRoutingModule } from './jobseeker-routing.module';
import { AppliedJobseekerListComponent } from './applied-jobseeker-list/applied-jobseeker-list.component';
import { JobseekerDetailsComponent } from './jobseeker-details/jobseeker-details.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    JobseekerRoutingModule
  ],
  declarations: [AppliedJobseekerListComponent, JobseekerDetailsComponent]
})
export class JobseekerModule { }
