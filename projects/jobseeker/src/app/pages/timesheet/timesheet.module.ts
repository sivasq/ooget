import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { TimesheetRoutingModule } from './timesheet-routing.module';
import { PunchInOutComponent } from './punch-in-out/punch-in-out.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TimesheetRoutingModule
  ],
  declarations: [PunchInOutComponent]
})
export class TimesheetModule { }
