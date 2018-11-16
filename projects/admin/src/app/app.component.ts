import { Component, AfterViewInit, OnInit } from '@angular/core';
import { NgProgress } from '@ngx-progressbar/core';
import { NgxPermissionsService, NgxRolesService } from 'ngx-permissions';
// import { Router, NavigationStart, NavigationCancel, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit {

  //public loadingRoutes;

  constructor(private permissionsService: NgxPermissionsService, private rolesService: NgxRolesService, private ngProgress: NgProgress) { }

  // constructor(private router: Router) {
  // 	this.loadingRoutes = true;
  // }

  ngOnInit() {
    this.permissionsService.loadPermissions(['ADMIN']);
    this.rolesService.addRole('GUEST', ['ADMIN']);
  }

  ngAfterViewInit() {
    // 	//Custom loading Function for Routing
    // 	this.router.events
    // 		.subscribe((event) => {
    // 			if (event instanceof NavigationStart) {
    // 				this.loadingRoutes = true;
    // 			}
    // 			else if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
    // 				this.loadingRoutes = false;
    // 			}
    // 		});
  }
}
