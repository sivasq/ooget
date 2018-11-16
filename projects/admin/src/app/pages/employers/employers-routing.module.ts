import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployersListComponent } from './employers-list/employers-list.component';
import { AddEmployerComponent } from './add-employer/add-employer.component';
import { EmployerDetailsComponent } from './employer-details/employer-details.component';
import { AuthGuardService } from '../../services/auth-guard.service';
import { EditEmployerComponent } from './edit-employer/edit-employer.component';

const routes: Routes = [
  {
    path: 'list',
    component: EmployersListComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: ':emp_id/view',
    component: EmployerDetailsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: ':emp_id/edit',
    component: EditEmployerComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'add',
    component: AddEmployerComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'jobs',
    loadChildren: '../../pages/jobs/jobs.module#JobsModule',
    canActivate: [AuthGuardService]
  },
  {
    path: ':emp_id/jobs',
    loadChildren: '../../pages/jobs/jobs.module#JobsModule',
    canActivate: [AuthGuardService]
  },
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployersRoutingModule { }
