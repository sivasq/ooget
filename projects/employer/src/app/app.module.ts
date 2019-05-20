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
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
// import { TopProfiledialogComponent } from './top-profiledialog/top-profiledialog.component';
// import { TopShortcutdialogComponent } from './top-shortcutdialog/top-shortcutdialog.component';

@NgModule({
	declarations: [
		AppComponent,
		AuthloginComponent,
		ForgotPasswordComponent,
		RegisterComponent,
		AuthLayoutComponent,
		AdminLayoutComponent,
		NotAuthorizedComponent,
		ResetPasswordComponent,
	],
	imports: [
		BrowserModule,
		CommonModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		SharedModule,
		NgxPermissionsModule.forRoot(),
		RecaptchaModule,
		RecaptchaFormsModule,
	],
	providers: [
		{
			provide: RECAPTCHA_SETTINGS,
			useValue: {
				siteKey: '6Lc2L6IUAAAAAG0I8PuARFQibZcDRuU9vM8NPrG1',
			} as RecaptchaSettings,
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
