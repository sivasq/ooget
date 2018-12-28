import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { ReportsRoutingModule } from './reports-routing.module';
import { CalendarReportComponent } from './calendar-report/calendar-report.component';
import { ChargesToEmployerReportComponent } from './charges-to-employer-report/charges-to-employer-report.component';
import { JobseekerTimesheetReportComponent } from './jobseeker-timesheet-report/jobseeker-timesheet-report.component';
import { AdminPaymentReportComponent } from './admin-payment-report/admin-payment-report.component';
import { WorkOffdaysCalendarViewComponent } from './work-offdays-calendar-view/work-offdays-calendar-view.component';
import { WorkOffdaysMatrixViewComponent } from './work-offdays-matrix-view/work-offdays-matrix-view.component';

@NgModule({
  imports: [
    CommonModule,
    ReportsRoutingModule,
    SharedModule,
  ],
  declarations: [
    CalendarReportComponent,
    ChargesToEmployerReportComponent,
    JobseekerTimesheetReportComponent,
    AdminPaymentReportComponent,
    WorkOffdaysCalendarViewComponent,
    WorkOffdaysMatrixViewComponent
  ]
})
export class ReportsModule { }
