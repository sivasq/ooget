import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProfileComponent } from './add-profile/add-profile.component';
import { AuthGuardService } from '../../services/auth-guard.service';
import { AddProfileNewComponent } from './add-profile-new/add-profile-new.component';

const routes: Routes = [
  {
    path: 'add',
    component: AddProfileNewComponent,
    canActivate: [AuthGuardService]
  },
  // {
  //   path: 'addnew',
  //   component: AddProfileComponent,
  //   canActivate: [AuthGuardService]
  // },
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
export class ProfileRoutingModule { }
