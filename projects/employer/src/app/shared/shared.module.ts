import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, UpperCasePipe } from '@angular/common';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';

import { OogettopbarComponent } from '../oogettopbar/oogettopbar.component';
import { OogetsidenavComponent } from '../oogetsidenav/oogetsidenav.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TopProfiledialogComponent } from '../top-profiledialog/top-profiledialog.component';
import { TopShortcutdialogComponent } from '../top-shortcutdialog/top-shortcutdialog.component';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { TermsConditionsDialogComponent } from '../terms-conditions-dialog/terms-conditions-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ConfigService } from '../services/config.service';
import { ApiCallService } from '../services/api-call.service';
import { HttpClientModule } from '@angular/common/http';

import { UniqueMainLocation, SubLocationFilter, DatexPipe, SearchPipe, AgePipe } from '../pipes/custompipes.pipe';

import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE, OWL_DATE_TIME_FORMATS } from 'ng-pick-datetime';
import { NgBusyModule } from 'ng-busy';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { AuthGuardService } from '../services/auth-guard.service';
import { EqualValidator, CompareDirective } from '../directives/custom-directive.directive';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher, MAT_DATE_LOCALE } from '@angular/material/core';

import { NgPipesModule, CamelizePipe, UcFirstPipe } from 'ngx-pipes';

import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
import { NgProgressRouterModule } from '@ngx-progressbar/router';
import { NgxMaskModule } from 'ngx-mask';

// Calendar
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { DataService } from '../services/data.service';
import { JsonToCsvService } from '../services/json-to-csv.service';
import { JsonToTextService } from '../services/json-to-text.service';
import { SidemenuComponent } from '../sidemenu/sidemenu.component';

import { NgxPermissionsModule } from 'ngx-permissions';
import { AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective } from '../directives/menu-accordion';
import { RosterOffDaysManageComponent } from '../reusable-components/roster-off-days-manage/roster-off-days-manage.component';
import { TimesheetListDetailsComponent } from '../reusable-components/timesheet-list-details/timesheet-list-details.component';
import { JobseekersGridViewComponent } from '../reusable-components/jobseekers-grid-view/jobseekers-grid-view.component';
import { PayslipComponent } from '../reusable-components/payslip/payslip.component';
import { ChargesToEmpTimesheetComponent } from '../reusable-components/charges-to-emp-timesheet/charges-to-emp-timesheet.component';
import { InvoiceTemp1Component } from '../reusable-components/invoice-temp1/invoice-temp1.component';
import { InvoiceTemp2Component } from '../reusable-components/invoice-temp2/invoice-temp2.component';
import { JobseekerTimesheetComponent } from '../reusable-components/jobseeker-timesheet/jobseeker-timesheet.component';
import { OffdayMatrixTableComponent } from '../reusable-components/offday-matrix-table/offday-matrix-table.component';
import { JobsGridViewComponent } from '../reusable-components/jobs-grid-view/jobs-grid-view.component';
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
	suppressScrollX: true,
	wheelPropagation: true,
};

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
export const MY_NATIVE_FORMATS = {
	fullPickerInput: { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' },
	datePickerInput: { year: 'numeric', month: 'numeric', day: 'numeric' },
	timePickerInput: { hour: 'numeric', minute: 'numeric' },
	monthYearLabel: { year: 'numeric', month: 'short' },
	dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
	monthYearA11yLabel: { year: 'numeric', month: 'long' },
};

@NgModule({
	imports: [
		CommonModule,
		HttpClientModule,
		RouterModule,
		MaterialModule,
		PerfectScrollbarModule,
		FlexLayoutModule,
		FormsModule,
		ReactiveFormsModule,
		Ng2SearchPipeModule,
		NgxPaginationModule,
		OwlDateTimeModule,
		OwlNativeDateTimeModule,
		NgBusyModule,
		NgPipesModule,
		NgProgressModule.withConfig({
			thick: true,
			spinner: false,
			color: '#1abc9c'
		}),
		NgProgressHttpModule,
		NgProgressRouterModule,
		NgxMaskModule.forRoot(),
		CalendarModule.forRoot({
			provide: DateAdapter,
			useFactory: adapterFactory
		}),
		NgxPermissionsModule,
	],
	declarations: [
		OogetsidenavComponent,
		SidemenuComponent,
		OogettopbarComponent,
		TopProfiledialogComponent,
		TopShortcutdialogComponent,
		TermsConditionsDialogComponent,
		RosterOffDaysManageComponent,
		TimesheetListDetailsComponent,
		ConfirmDialogComponent,
		UniqueMainLocation,
		SubLocationFilter,
		DatexPipe,
		SearchPipe,
		AgePipe,
		EqualValidator,
		CompareDirective,
		AccordionAnchorDirective,
		AccordionLinkDirective,
		AccordionDirective,
		ChargesToEmpTimesheetComponent, PayslipComponent, InvoiceTemp1Component, InvoiceTemp2Component, JobseekerTimesheetComponent, OffdayMatrixTableComponent, JobsGridViewComponent, JobseekersGridViewComponent
	],
	entryComponents: [
		TopProfiledialogComponent,
		TopShortcutdialogComponent,
		TermsConditionsDialogComponent,
		ConfirmDialogComponent
	],
	exports: [
		MaterialModule,
		HttpClientModule,
		RouterModule,
		OogetsidenavComponent,
		SidemenuComponent,
		OogettopbarComponent,
		FlexLayoutModule,
		PerfectScrollbarModule,
		FormsModule,
		ReactiveFormsModule,
		TopProfiledialogComponent,
		TopShortcutdialogComponent,
		RosterOffDaysManageComponent,
		TimesheetListDetailsComponent,
		Ng2SearchPipeModule,
		NgxPaginationModule,
		TermsConditionsDialogComponent,
		OwlDateTimeModule,
		OwlNativeDateTimeModule,
		NgBusyModule,
		NgProgressModule,
		CalendarModule,
		NgProgressHttpModule,
		NgProgressRouterModule,
		NgPipesModule,
		NgxMaskModule,
		SatDatepickerModule, SatNativeDateModule,
		EqualValidator, CompareDirective,
		UniqueMainLocation, SubLocationFilter, DatexPipe, SearchPipe, AgePipe, NgxPermissionsModule,
		AccordionAnchorDirective,
		AccordionLinkDirective,
		AccordionDirective,
		ChargesToEmpTimesheetComponent, PayslipComponent, InvoiceTemp1Component, InvoiceTemp2Component, JobseekerTimesheetComponent, OffdayMatrixTableComponent, JobsGridViewComponent, JobseekersGridViewComponent
	],
	providers: [
		ConfigService,
		ApiCallService,
		DataService, JsonToCsvService, JsonToTextService,
		DatePipe, UpperCasePipe, AgePipe, CamelizePipe, UcFirstPipe,
		{ provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
		{ provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
		{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
		{ provide: OWL_DATE_TIME_LOCALE, useValue: 'en-GB' },
		{ provide: OWL_DATE_TIME_FORMATS, useValue: MY_NATIVE_FORMATS },
		AuthGuardService
	],
})
export class SharedModule { }
