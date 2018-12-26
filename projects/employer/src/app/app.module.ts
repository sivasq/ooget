import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AuthloginComponent } from './authlogin/authlogin.component';

import { SharedModule } from './shared/shared.module';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RegisterComponent } from './register/register.component';
import { Layout1Component } from './layouts/layout1/layout1.component';
import { Layout2Component } from './layouts/layout2/layout2.component';
import { NgxPermissionsModule } from 'ngx-permissions';
// import { TopProfiledialogComponent } from './top-profiledialog/top-profiledialog.component';
// import { TopShortcutdialogComponent } from './top-shortcutdialog/top-shortcutdialog.component';

@NgModule({
	declarations: [
		AppComponent,
		AuthloginComponent,
		ForgotPasswordComponent,
		RegisterComponent,
		Layout1Component,
		Layout2Component,
	],
	imports: [
		BrowserModule,
		CommonModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		SharedModule,
		NgxPermissionsModule.forRoot()
	],
	providers: [
		// { provide: APP_BASE_HREF, useValue: window['_app_base'] || '/' },
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
