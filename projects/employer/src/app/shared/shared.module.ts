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

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgBusyModule } from 'ng-busy';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { AuthGuardService } from '../services/auth-guard.service';
import { EqualValidator, CompareDirective } from '../directives/custom-directive.directive';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material';

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
		AccordionDirective
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
		NgProgressHttpModule,
		NgProgressRouterModule,
		NgPipesModule,
		NgxMaskModule,
		EqualValidator, CompareDirective,
		UniqueMainLocation, SubLocationFilter, DatexPipe, SearchPipe, AgePipe, NgxPermissionsModule,
		AccordionAnchorDirective,
		AccordionLinkDirective,
		AccordionDirective
	],
	providers: [
		ConfigService,
		ApiCallService,
		DataService, JsonToCsvService, JsonToTextService,
		DatePipe, UpperCasePipe, AgePipe, CamelizePipe, UcFirstPipe,
		{ provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
		{ provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
		AuthGuardService
	],
})
export class SharedModule { }
