import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AuthloginComponent } from './authlogin/authlogin.component';

import { SharedModule } from './shared/shared.module';
import { CommonModule } from '@angular/common';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RegisterComponent } from './register/register.component';
import { Layout1Component } from './layouts/layout1/layout1.component';
import { Layout2Component } from './layouts/layout2/layout2.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { HAMMER_GESTURE_CONFIG, HammerGestureConfig } from '@angular/platform-browser';
import { ProfileModule } from './pages/profile/profile.module';

// This is fixing verical scroll not working while using swipe
// Method 1
@NgModule()
export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any>{
    'pinch': { enable: false },
    'rotate': { enable: false }
  }
}

// Method 2
// declare var Hammer: any;
// export class MyHammerConfig extends HammerGestureConfig {
// 	buildHammer(element: HTMLElement) {
// 		let mc = new Hammer(element, {
// 			touchAction: "pan-y",
// 		});
// 		return mc;
// 	}
// }

@NgModule({
	declarations: [
		AppComponent,
		AuthloginComponent,
		ForgotPasswordComponent,
		RegisterComponent,
		Layout1Component,
		Layout2Component,
		HomepageComponent,
		ResetPasswordComponent,
	],
	imports: [
		BrowserModule,
		CommonModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		SharedModule,
		ProfileModule
	],
	providers: [{ provide: HAMMER_GESTURE_CONFIG, useClass: MyHammerConfig }],
	bootstrap: [AppComponent]
})
export class AppModule { }
