import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobseekerTimesheetReportComponent } from './jobseeker-timesheet-report/jobseeker-timesheet-report.component';

const routes: Routes = [
	{
		path: '',
		component: JobseekerTimesheetReportComponent,
	},
	{
		path: 'jstr',
		component: JobseekerTimesheetReportComponent,
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ReportsRoutingModule { }
