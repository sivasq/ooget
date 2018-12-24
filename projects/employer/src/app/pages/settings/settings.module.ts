import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { SettingsRoutingModule } from './settings-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { ViewCompanyDetailsComponent } from './view-company-details/view-company-details.component';
import { EditCompanyDetailsComponent } from './edit-company-details/edit-company-details.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';

@NgModule({
  declarations: [ProfileComponent, ViewCompanyDetailsComponent, EditCompanyDetailsComponent, AddUserComponent, EditUserComponent],
  imports: [
    CommonModule,
	  SettingsRoutingModule,
	  SharedModule
  ]
})
export class SettingsModule { }
