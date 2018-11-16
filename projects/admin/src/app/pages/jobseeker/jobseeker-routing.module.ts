import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobseekerDetailsComponent } from './jobseeker-details/jobseeker-details.component';
import { AppliedJobseekerListComponent } from './applied-jobseeker-list/applied-jobseeker-list.component';
import { AuthGuardService } from '../../services/auth-guard.service';
import { JobseekerListComponent } from './jobseeker-list/jobseeker-list.component';
import { JobseekerFullDetailsComponent } from './jobseeker-full-details/jobseeker-full-details.component';
import { PendingJobseekersComponent } from './pending-jobseekers/pending-jobseekers.component';

const routes: Routes = [
  {
    path: 'list',
    component: JobseekerListComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'pending',
    component: PendingJobseekersComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'applied',
    component: AppliedJobseekerListComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: ':js_id/view',
    component: JobseekerDetailsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: ':js_id/details',
    component: JobseekerFullDetailsComponent,
    canActivate: [AuthGuardService]
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
