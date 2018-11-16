import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppliedJobseekerListComponent } from './applied-jobseeker-list/applied-jobseeker-list.component';
import { AuthGuardService } from '../../services/auth-guard.service';
import { JobseekerDetailsComponent } from './jobseeker-details/jobseeker-details.component';

const routes: Routes = [
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
