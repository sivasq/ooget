import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AuthloginComponent } from './authlogin/authlogin.component';

import { SharedModule } from './shared/shared.module';

import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { EmployersModule } from './pages/employers/employers.module';

@NgModule({
	declarations: [
		AppComponent,
		AuthloginComponent,
		ForgotPasswordComponent,
		AuthLayoutComponent,
		AdminLayoutComponent,
	],
	imports: [
		CommonModule,
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		SharedModule,
		EmployersModule,
		NgxPermissionsModule.forRoot()
	],
	providers: [
		// { provide: APP_BASE_HREF, useValue: window['_app_base'] || '/' },
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
