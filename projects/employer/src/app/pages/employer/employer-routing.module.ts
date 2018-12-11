import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployerDetailsComponent } from './employer-details/employer-details.component';
import { AuthGuardService } from '../../services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: EmployerDetailsComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployerRoutingModule { }
