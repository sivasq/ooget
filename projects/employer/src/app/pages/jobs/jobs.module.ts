import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { JobsRoutingModule } from './jobs-routing.module';
import { AddJobComponent } from './add-job/add-job.component';
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { EditJobComponent } from './edit-job/edit-job.component';
import { MakeDuplicateJobComponent } from './make-duplicate-job/make-duplicate-job.component';

@NgModule({
  imports: [
    CommonModule,
    JobsRoutingModule,
    SharedModule
  ],
  declarations: [AddJobComponent, JobsListComponent, JobDetailsComponent, EditJobComponent, MakeDuplicateJobComponent]
})
export class JobsModule { }
