import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { SettingsRoutingModule } from './settings-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { FeaturedEmployersComponent } from './featured-employers/featured-employers.component';

@NgModule({
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule
  ],
  declarations: [ProfileComponent, FeaturedEmployersComponent]
})
export class SettingsModule { }
