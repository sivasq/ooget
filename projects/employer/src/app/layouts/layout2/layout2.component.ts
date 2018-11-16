import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-layout2',
  templateUrl: './layout2.component.html',
  styleUrls: ['./layout2.component.scss']
})
export class Layout2Component implements OnInit {
  navMode: string = '';
  navOpen: boolean;

  constructor() { }

  ngOnInit() {
    if (window.innerWidth < 768) {
      this.navMode = 'over';
      this.navOpen = false;
    } else if (window.innerWidth > 768) {
      this.navMode = 'side';
      this.navOpen = true;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth < 768) {
      this.navMode = 'over';
      this.navOpen = false;
    }
    if (event.target.innerWidth > 768) {
      this.navMode = 'side';
      this.navOpen = true;
    }
  }

}
