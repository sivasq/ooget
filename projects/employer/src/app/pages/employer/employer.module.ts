import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { EmployerRoutingModule } from './employer-routing.module';
import { EmployerDetailsComponent } from './employer-details/employer-details.component';

@NgModule({
  declarations: [EmployerDetailsComponent],
  imports: [
    CommonModule,
    EmployerRoutingModule,
    SharedModule
  ]
})
export class EmployerModule { }
