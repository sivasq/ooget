import {Component, Input, Output, OnInit, ViewChild, EventEmitter} from '@angular/core';
import { MatDialog } from '@angular/material';
import { TopProfiledialogComponent } from '../top-profiledialog/top-profiledialog.component';
import { TopShortcutdialogComponent } from '../top-shortcutdialog/top-shortcutdialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-oogettopbar',
  templateUrl: './oogettopbar.component.html',
  styleUrls: ['./oogettopbar.component.scss']
})
export class OogettopbarComponent implements OnInit {

  // @Input('mainNav') mainNav;

  @Output() navToggle = new EventEmitter<boolean>();
  @Output() navOpen = new EventEmitter<boolean>();

  @Output() toggleProfile = new EventEmitter<boolean>();
  @Output() showProfile = new EventEmitter<boolean>();

  constructor(public dialog: MatDialog, public router: Router) { }

  togglemainNav() {
    this.navToggle.emit(true);
  }
  
  toggleuserprofile() {
    // console.log('first');
    this.toggleProfile.emit(true);
    this.navOpen.emit(true);
    // this.showProfile.emit(true);
  }

  onLogout() {
    localStorage.clear();
    this.router.navigate(['logout']);
    console.log("Logout Success");
  }
  
  openTopProfileDialog() {
    this.dialog.open(TopProfiledialogComponent, {
      panelClass: 'top-profile-dialog',      
    });
  }

  openTopApplicationDialog() {
    this.dialog.open(TopShortcutdialogComponent, {
      panelClass: 'top-shortcut-dialog',
    });
  }

  ngOnInit() {
  }

}
