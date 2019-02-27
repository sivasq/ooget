import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PunchInOutComponent } from './punch-in-out/punch-in-out.component';

const routes: Routes = [
  {
    path: '',
    component: PunchInOutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimesheetRoutingModule { }
