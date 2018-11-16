import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../../services/auth-guard.service';
import { ImportHolidayComponent } from './import-holiday/import-holiday.component';
import { HolidayListComponent } from './holiday-list/holiday-list.component';

const routes: Routes = [
  {
    path: '',
    component: HolidayListComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'import',
    component: ImportHolidayComponent,
    canActivate: [AuthGuardService]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HolidaysRoutingModule { }
