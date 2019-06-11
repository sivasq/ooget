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

import { NgxMaskModule } from 'ngx-mask';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { ConfigService } from '../services/config.service';
import { ApiCallService } from '../services/api-call.service';
import { HttpClientModule } from '@angular/common/http';
import { UniqueMainLocation, SubLocationFilter, DatexPipe, SearchPipe, SafeHtml, AgePipe } from '../pipes/custompipes.pipe';

import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE, OWL_DATE_TIME_FORMATS } from 'ng-pick-datetime';
import { NgBusyModule } from 'ng-busy';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { AuthGuardService } from '../services/auth-guard.service';
import { EqualValidator, CompareDirective, AutocompleteDirective } from '../directives/custom-directive.directive';
import { NgxPrintModule } from 'ngx-print';
// import { AsyncLocalStorageModule } from 'angular-async-local-storage';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher, MAT_DATE_LOCALE } from '@angular/material/core';

import { NgPipesModule } from 'ngx-pipes';
import { HolidayDataService } from '../services/holiday-data.service';
import { MultipleDatePickerModule } from '../multiple-date-picker';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
import { NgProgressRouterModule } from '@ngx-progressbar/router';
import { JsonToCsvService } from '../services/json-to-csv.service';
import { JsonToTextService } from '../services/json-to-text.service';
import { DynamicTableModule } from 'material-dynamic-table';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
// Calendar
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { SidemenuComponent } from '../sidemenu/sidemenu.component';
import { ChargesToEmpTimesheetComponent } from '../reusable-components/charges-to-emp-timesheet/charges-to-emp-timesheet.component';
import { PayslipComponent } from '../reusable-components/payslip/payslip.component';
import { InvoiceTemp1Component } from '../reusable-components/invoice-temp1/invoice-temp1.component';
import { InvoiceTemp2Component } from '../reusable-components/invoice-temp2/invoice-temp2.component';
import { JobseekerTimesheetComponent } from '../reusable-components/jobseeker-timesheet/jobseeker-timesheet.component';
import { AdminPaymentComponent } from '../reusable-components/admin-payment/admin-payment.component';
import { OffdayMatrixTableComponent } from '../reusable-components/offday-matrix-table/offday-matrix-table.component';
import { JobsGridViewComponent } from '../reusable-components/jobs-grid-view/jobs-grid-view.component';
import { JobseekersGridViewComponent } from '../reusable-components/jobseekers-grid-view/jobseekers-grid-view.component';

import { AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective } from '../directives/menu-accordion';

import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';
import { RosterOffDaysManageComponent } from '../reusable-components/roster-off-days-manage/roster-off-days-manage.component';
import { TimesheetListDetailsComponent } from '../reusable-components/timesheet-list-details/timesheet-list-details.component';
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
		MultipleDatePickerModule,
		DynamicTableModule,
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
		NgxPrintModule,
		FroalaEditorModule.forRoot(),
		FroalaViewModule.forRoot(),
		SatDatepickerModule, SatNativeDateModule
	],
	declarations: [
		OogetsidenavComponent,
		OogettopbarComponent,
		SidemenuComponent,
		TopProfiledialogComponent,
		TopShortcutdialogComponent,
		ChargesToEmpTimesheetComponent,
		JobseekerTimesheetComponent,
		OffdayMatrixTableComponent,
		AdminPaymentComponent,
		PayslipComponent,
		UniqueMainLocation, SubLocationFilter, DatexPipe, SearchPipe, SafeHtml, AgePipe,
		ConfirmDialogComponent,
		EqualValidator, CompareDirective, InvoiceTemp1Component, InvoiceTemp2Component, JobsGridViewComponent, JobseekersGridViewComponent,
		AccordionAnchorDirective,
		AccordionLinkDirective,
		AccordionDirective,
		RosterOffDaysManageComponent,
		TimesheetListDetailsComponent, AutocompleteDirective
	],
	entryComponents: [
		TopProfiledialogComponent,
		TopShortcutdialogComponent,
		ConfirmDialogComponent
	],
	exports: [
		CommonModule,
		HttpClientModule,
		MaterialModule,
		RouterModule,
		OogetsidenavComponent,
		OogettopbarComponent,
		SidemenuComponent,
		FlexLayoutModule,
		PerfectScrollbarModule,
		FormsModule,
		ReactiveFormsModule,
		TopProfiledialogComponent,
		TopShortcutdialogComponent,
		ChargesToEmpTimesheetComponent,
		JobseekerTimesheetComponent,
		OffdayMatrixTableComponent,
		AdminPaymentComponent,
		PayslipComponent,
		JobsGridViewComponent,
		JobseekersGridViewComponent,
		RosterOffDaysManageComponent,
		TimesheetListDetailsComponent,
		Ng2SearchPipeModule,
		NgxPaginationModule,
		OwlDateTimeModule,
		OwlNativeDateTimeModule,
		NgBusyModule,
		NgProgressModule,
		CalendarModule,
		NgProgressHttpModule,
		NgProgressRouterModule,
		MultipleDatePickerModule,
		NgxMaskModule,
		DynamicTableModule,
		NgxPrintModule,
		FroalaEditorModule,
		FroalaViewModule,
		SatDatepickerModule, SatNativeDateModule,
		EqualValidator, CompareDirective, NgPipesModule, InvoiceTemp1Component, InvoiceTemp2Component,
		UniqueMainLocation, SubLocationFilter, DatexPipe, SearchPipe, SafeHtml, AgePipe,
		AccordionAnchorDirective,
		AccordionLinkDirective,
		AccordionDirective, AutocompleteDirective
	],
	providers: [
		ConfigService,
		ApiCallService,
		HolidayDataService,
		JsonToCsvService,
		JsonToTextService,
		DatePipe,
		UpperCasePipe,
		AgePipe,
		{ provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
		{ provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
		{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
		{ provide: OWL_DATE_TIME_LOCALE, useValue: 'en-GB' },
		{ provide: OWL_DATE_TIME_FORMATS, useValue: MY_NATIVE_FORMATS },
		AuthGuardService,
	],
})
export class SharedModule { }
