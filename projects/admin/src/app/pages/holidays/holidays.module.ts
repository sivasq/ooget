import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { HolidaysRoutingModule } from './holidays-routing.module';
import { ImportHolidayComponent } from './import-holiday/import-holiday.component';
import { HolidayListComponent } from './holiday-list/holiday-list.component';
import { AddComponent } from './dialogs/add/add.component';
import { EditComponent } from './dialogs/edit/edit.component';
import { DeleteComponent } from './dialogs/delete/delete.component';
// import { DataService } from './services/data.service';

@NgModule({
	imports: [
		CommonModule,
		HolidaysRoutingModule,
		SharedModule
	],
	declarations: [
		ImportHolidayComponent,
		HolidayListComponent,
		AddComponent,
		EditComponent,
		DeleteComponent
	],
	entryComponents: [
		AddComponent,
		EditComponent,
		DeleteComponent
	],
	providers: [
		// DataService
	],
})
export class HolidaysModule { }
