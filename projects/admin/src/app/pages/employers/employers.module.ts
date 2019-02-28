import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { EmployersRoutingModule } from './employers-routing.module';

import { EmployersListComponent } from './employers-list/employers-list.component';
import { AddEmployerComponent } from './add-employer/add-employer.component';
import { EmployerDetailsComponent } from './employer-details/employer-details.component';
import { EditEmployerComponent } from './edit-employer/edit-employer.component';
import { ListUserComponent } from './list-user/list-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AddUserComponent } from './add-user/add-user.component';

@NgModule({
	imports: [
		CommonModule,
		EmployersRoutingModule,
		SharedModule
	],
	declarations: [EmployersListComponent, AddEmployerComponent, EmployerDetailsComponent, EditEmployerComponent, ListUserComponent, EditUserComponent, AddUserComponent]
})
export class EmployersModule { }
