import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { ProfileRoutingModule } from './profile-routing.module';
import { AddProfileComponent } from './add-profile/add-profile.component';

@NgModule({
	imports: [
		CommonModule,
		ProfileRoutingModule,
		SharedModule
	],
	declarations: [AddProfileComponent]
})
export class ProfileModule { }
