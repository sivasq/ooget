import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { ProfileRoutingModule } from './profile-routing.module';
import { AddProfileComponent } from './add-profile/add-profile.component';
import { AddProfileNewComponent } from './add-profile-new/add-profile-new.component';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule
  ],
  declarations: [AddProfileComponent, AddProfileNewComponent]
})
export class ProfileModule { }
