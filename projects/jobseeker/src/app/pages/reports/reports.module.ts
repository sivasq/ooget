import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ReportsRoutingModule } from './reports-routing.module';
import { JobseekerTimesheetReportComponent } from './jobseeker-timesheet-report/jobseeker-timesheet-report.component';

@NgModule({
  imports: [
    CommonModule,
    ReportsRoutingModule,
    SharedModule,
  ],
  declarations: [
    JobseekerTimesheetReportComponent
  ]
})
export class ReportsModule { }
