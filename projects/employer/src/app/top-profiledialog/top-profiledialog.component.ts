import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-profiledialog',
  templateUrl: './top-profiledialog.component.html',
  styleUrls: ['./top-profiledialog.component.scss']
})
export class TopProfiledialogComponent implements OnInit{

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public router: Router, private dialogRef: MatDialogRef<TopProfiledialogComponent>) {}

  onLogout() {
    this.dialogRef.close();
    this.router.navigate(['auth/logout']);
    // console.log("Logout Success");
  }

  close() {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
