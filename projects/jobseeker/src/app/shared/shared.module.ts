import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, UpperCasePipe } from '@angular/common';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';

import { PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

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
import { ApiCallService, HttpCancelService, InternetInterceptor, HttpCancelInterceptor } from '../services/api-call.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EqualValidatorDirective, Collapse, CompareDirective } from '../directives/equal-validator.directive';
import { UniqueMainLocation, SubLocationFilter, DatexPipe, SearchPipe, MultipleSubLocationFilter, SafeHtml } from '../pipes/custompipes.pipe';

import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { NgBusyModule } from 'ng-busy';

import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher, MAT_DATE_LOCALE } from '@angular/material';
import { AuthGuardService } from '../services/auth-guard.service';
import { NguCarouselModule } from '@ngu/carousel';

import { NgPipesModule } from 'ngx-pipes';

import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
import { NgProgressRouterModule } from '@ngx-progressbar/router';
import { Ng5SliderModule } from 'ng5-slider';
import { SidemenuComponent } from '../sidemenu/sidemenu.component';
import { AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective } from '../directives/menu-accordion';
import { JobseekerTimesheetComponent } from '../reusable-components/jobseeker-timesheet/jobseeker-timesheet.component';
import { CalendarModule } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
	suppressScrollX: true,
	wheelPropagation: true,
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
		NguCarouselModule,
		NgPipesModule,
		NgProgressModule.withConfig({
			thick: true,
			spinner: false,
			color: '#1abc9c'
		}),
		NgProgressHttpModule,
		NgProgressRouterModule,
		Ng5SliderModule,		
		SatDatepickerModule, SatNativeDateModule
	],
	declarations: [
		OogetsidenavComponent,
		OogettopbarComponent,
		TopProfiledialogComponent,
		TopShortcutdialogComponent,
		TermsConditionsDialogComponent,
		ConfirmDialogComponent,
		EqualValidatorDirective, Collapse, CompareDirective,
		UniqueMainLocation, SubLocationFilter, DatexPipe, SearchPipe, MultipleSubLocationFilter, SafeHtml,
		SidemenuComponent,
		AccordionAnchorDirective,
		AccordionLinkDirective,
		AccordionDirective,
		JobseekerTimesheetComponent
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
		OogettopbarComponent,
		FlexLayoutModule,
		PerfectScrollbarModule,
		FormsModule,
		ReactiveFormsModule,
		TopProfiledialogComponent,
		TopShortcutdialogComponent,
		Ng2SearchPipeModule,
		NgxPaginationModule,
		TermsConditionsDialogComponent,
		EqualValidatorDirective, Collapse, CompareDirective,
		OwlDateTimeModule,
		OwlNativeDateTimeModule,
		NgBusyModule,
		NgProgressModule,
		NgProgressHttpModule,
		NgProgressRouterModule,
		NguCarouselModule,
		NgPipesModule,
		Ng5SliderModule,
		UniqueMainLocation, SubLocationFilter, DatexPipe, SearchPipe, MultipleSubLocationFilter, SafeHtml,
		SidemenuComponent,
		AccordionAnchorDirective,
		AccordionLinkDirective,
		AccordionDirective,
		JobseekerTimesheetComponent,
		SatDatepickerModule, SatNativeDateModule
	],
	providers: [
		ConfigService,
		ApiCallService,
		HttpCancelService,
		DatePipe, UpperCasePipe, MultipleSubLocationFilter,
		{ provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
		{ provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
		{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
		AuthGuardService,
		{ provide: HTTP_INTERCEPTORS, useClass: InternetInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: HttpCancelInterceptor, multi: true }
	],
})
export class SharedModule { }
