import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { JobsRoutingModule } from './jobs-routing.module';
import { AddJobComponent } from './add-job/add-job.component';
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { EditJobComponent } from './edit-job/edit-job.component';
import { PendingJobsComponent } from './pending-jobs/pending-jobs.component';
import { ContractDetailsComponent } from './contract-details/contract-details.component';
import { EditClockInOutComponent } from './dialogs/edit-clock-in-out/edit-clock-in-out.component';
import { MakeDuplicateJobComponent } from './make-duplicate-job/make-duplicate-job.component';
import { DublicateJobConfirmComponent } from './dialogs/dublicate-job-confirm/dublicate-job-confirm.component';
import { TimesheetNotesComponent } from './dialogs/timesheet-notes/timesheet-notes.component';
import { LatereasonComponent } from './dialogs/latereason/latereason.component';
import { JobActivationComponent } from './dialogs/job-activation/job-activation.component';
import { LivejobsComponent } from './livejobs/livejobs.component';
import { SingleTextareaComponent } from './dialogs/single-textarea/single-textarea.component';

@NgModule({
	imports: [
		CommonModule,
		JobsRoutingModule,
		SharedModule
	],
	declarations: [
		AddJobComponent,
		JobsListComponent,
		JobDetailsComponent,
		EditJobComponent,
		PendingJobsComponent,
		ContractDetailsComponent,
		MakeDuplicateJobComponent,
		EditClockInOutComponent,
		DublicateJobConfirmComponent,
		TimesheetNotesComponent,
		LatereasonComponent,
		JobActivationComponent,
		LivejobsComponent,
		SingleTextareaComponent
	],
	entryComponents: [
		EditClockInOutComponent,
		DublicateJobConfirmComponent,
		JobActivationComponent,
		SingleTextareaComponent,
		TimesheetNotesComponent,
		LatereasonComponent
	]
})
export class JobsModule { }
