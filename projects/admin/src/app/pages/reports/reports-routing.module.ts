import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarReportComponent } from './calendar-report/calendar-report.component';

const routes: Routes = [
  {
    path: '',
    component: CalendarReportComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
