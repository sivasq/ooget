import { Component, OnInit } from '@angular/core';
import { NgxPermissionsService, NgxRolesService } from 'ngx-permissions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private permissionsService: NgxPermissionsService, private rolesService: NgxRolesService) {
    						this.permissionsService.permissions$.subscribe((permissions) => {
    console.log(permissions)
})

console.log(this.permissionsService.getPermissions());
   }

  ngOnInit() { }

}