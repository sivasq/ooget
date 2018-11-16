import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';

@Component({
  selector: 'app-latereason',
  templateUrl: './latereason.component.html',
  styleUrls: ['./latereason.component.scss']
})
export class LatereasonComponent implements OnInit {

  constructor(private bottomSheetRef: MatBottomSheetRef<LatereasonComponent>, @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) { }

  ngOnInit() {
  }

}
