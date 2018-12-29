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
import { EqualValidator, CompareDirective } from '../directives/custom-directive.directive';

// import { AsyncLocalStorageModule } from 'angular-async-local-storage';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher, MAT_DATE_LOCALE } from '@angular/material';

import { NgPipesModule } from 'ngx-pipes';
import { DataService } from '../services/data.service';
import { MultipleDatePickerModule } from '../multiple-date-picker';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
import { NgProgressRouterModule } from '@ngx-progressbar/router';
import { JsonToCsvService } from '../services/json-to-csv.service';
import { JsonToTextService } from '../services/json-to-text.service';
import { DynamicTableModule } from 'material-dynamic-table';

// Calendar
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { SidemenuComponent } from '../sidemenu/sidemenu.component';
import { ChargesToEmpTimesheetComponent } from '../reusable-components/charges-to-emp-timesheet/charges-to-emp-timesheet.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
	suppressScrollX: true,
	wheelPropagation: true,
};

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
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
		NgProgressModule.forRoot({
			thick: true,
			spinner: false,
			color: '#1abc9c'
		}),
		NgProgressHttpModule.forRoot(),
		NgProgressRouterModule.forRoot(),
		NgxMaskModule.forRoot(),
		CalendarModule.forRoot({
			provide: DateAdapter,
			useFactory: adapterFactory
		}),
	],
	declarations: [
		OogetsidenavComponent,
		OogettopbarComponent,
		SidemenuComponent,
		TopProfiledialogComponent,
		TopShortcutdialogComponent,
		ChargesToEmpTimesheetComponent,
		UniqueMainLocation, SubLocationFilter, DatexPipe, SearchPipe, SafeHtml, AgePipe,
		ConfirmDialogComponent,
		EqualValidator, CompareDirective,
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
		EqualValidator, CompareDirective, NgPipesModule,
		UniqueMainLocation, SubLocationFilter, DatexPipe, SearchPipe, SafeHtml, AgePipe,
	],
	providers: [
		ConfigService,
		ApiCallService,
		DataService, JsonToCsvService, JsonToTextService,
		DatePipe, UpperCasePipe,
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
