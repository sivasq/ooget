import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarReportComponent } from './calendar-report/calendar-report.component';
import { JobseekerTimesheetReportComponent } from './jobseeker-timesheet-report/jobseeker-timesheet-report.component';
import { ChargesToEmployerReportComponent } from './charges-to-employer-report/charges-to-employer-report.component';
import { AdminPaymentReportComponent } from './admin-payment-report/admin-payment-report.component';
import { WorkOffdaysCalendarViewComponent } from './work-offdays-calendar-view/work-offdays-calendar-view.component';
import { WorkOffdaysMatrixViewComponent } from './work-offdays-matrix-view/work-offdays-matrix-view.component';

const routes: Routes = [
	{
		path: '',
		component: CalendarReportComponent,
	},
	{
		path: 'jstr',
		component: JobseekerTimesheetReportComponent,
	},
	{
		path: 'cter',
		component: ChargesToEmployerReportComponent,
	},
	{
		path: 'apr',
		component: AdminPaymentReportComponent,
	},
	{
		path: 'wocvr',
		component: CalendarReportComponent,
	},
	{
		path: 'womvr',
		component: WorkOffdaysMatrixViewComponent,
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ReportsRoutingModule { }
