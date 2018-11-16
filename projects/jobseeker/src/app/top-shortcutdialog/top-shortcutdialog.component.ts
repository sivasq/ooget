import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-top-shortcutdialog',
  templateUrl: './top-shortcutdialog.component.html',
  styleUrls: ['./top-shortcutdialog.component.scss']
})
export class TopShortcutdialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}


  ngOnInit() {
  }

}
