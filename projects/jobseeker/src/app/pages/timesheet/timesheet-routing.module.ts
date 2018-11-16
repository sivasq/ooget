import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PunchInOutComponent } from './punch-in-out/punch-in-out.component';

const routes: Routes = [
  {
    path: 'punch',
    component: PunchInOutComponent
  },
  {
    path: '',
    redirectTo: 'punch',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimesheetRoutingModule { }
