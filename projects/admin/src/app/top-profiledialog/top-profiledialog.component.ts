import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-profiledialog',
  templateUrl: './top-profiledialog.component.html',
  styleUrls: ['./top-profiledialog.component.scss']
})
export class TopProfiledialogComponent implements OnInit{

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public router: Router) {}

  onLogout() {
    this.router.navigate(['logout']);
    // console.log("Logout Success");
  }

  ngOnInit() {
  }

}
