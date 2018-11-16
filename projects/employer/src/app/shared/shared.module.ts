import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
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

import { UniqueMainLocation, SubLocationFilter, DatexPipe, SearchPipe } from '../pipes/custompipes.pipe';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgBusyModule } from 'ng-busy';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { AuthGuardService } from '../services/auth-guard.service';
import { EqualValidator, CompareDirective } from '../directives/custom-directive.directive';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material';

import { NgPipesModule } from 'ngx-pipes';

import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
import { NgProgressRouterModule } from '@ngx-progressbar/router';

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
    NgProgressModule.forRoot(),
    NgProgressHttpModule,
    NgProgressRouterModule
  ],
  declarations: [
    OogetsidenavComponent,
    OogettopbarComponent,
    TopProfiledialogComponent,
    TopShortcutdialogComponent,
    TermsConditionsDialogComponent,
    ConfirmDialogComponent,
    UniqueMainLocation, SubLocationFilter, DatexPipe, SearchPipe, EqualValidator, CompareDirective
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
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgBusyModule,
    NgProgressModule,
    NgProgressHttpModule,
    NgProgressRouterModule,
    NgPipesModule,
    EqualValidator, CompareDirective,
    UniqueMainLocation, SubLocationFilter, DatexPipe, SearchPipe
  ],
  providers: [
    ConfigService,
    ApiCallService,
    DatePipe,
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
    AuthGuardService
  ],
})
export class SharedModule { }
