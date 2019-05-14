import { Component, ElementRef, NgZone, OnInit, OnDestroy, ViewChild, HostListener, ErrorHandler } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import 'rxjs/add/operator/filter';

const SMALL_WIDTH_BREAKPOINT = 960;

@Component({
	selector: 'app-layout',
	templateUrl: './admin-layout.component.html',
	styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit, OnDestroy {
	//   navMode: string = '';
	//   navOpen: boolean;

	//   constructor() { }

	//   ngOnInit() {
	//     if (window.innerWidth < 768) {
	//       this.navMode = 'over';
	//       this.navOpen = false;
	//     } else if (window.innerWidth > 768) {
	//       this.navMode = 'side';
	//       this.navOpen = true;
	//     }
	//   }

	//   @HostListener('window:resize', ['$event'])
	//   onResize(event) {
	//     if (event.target.innerWidth < 768) {
	//       this.navMode = 'over';
	//       this.navOpen = false;
	//     }
	//     if (event.target.innerWidth > 768) {
	//       this.navMode = 'side';
	//       this.navOpen = true;
	//     }
	//   }

	private _router: Subscription;

	mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);
	sidePanelOpened;

	@ViewChild('mainNav') mainNav;
	// @ViewChild(PerfectScrollbarDirective) directiveScroll: PerfectScrollbarDirective;
	// public config: PerfectScrollbarConfigInterface = {};

	constructor(private _element: ElementRef, private router: Router, zone: NgZone) {
		// this.mediaMatcher.addListener(mql => zone.run(() => {
		// 	this.mediaMatcher = mql;
		// }));
		// console.log(this.mediaMatcher);
		// this.mediaMatcher.addEventListener('change', mql => zone.run(() => {
		// 	this.mediaMatcher = mql;
		// }), true);
	}

	ngOnInit(): void {
		this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
			this.runOnRouteChange();
		});
	}

	ngOnDestroy(): void {
		this._router.unsubscribe();
	}

	runOnRouteChange(): void {
		if (this.isOver()) {
			this.mainNav.close();
		}

		// this.updatePS();
	}

	isOver(): boolean {
		return this.mediaMatcher.matches;
	}

	menuMouseOver(): void {
		if (this.mediaMatcher.matches) {
			this.mainNav.mode = 'over';
		}
	}

	menuMouseOut(): void {
		if (this.mediaMatcher.matches) {
			this.mainNav.mode = 'side';
		}
	}

	updatePS(): void {
		if (!this.mediaMatcher.matches) {
			setTimeout(() => {
				// this.directiveScroll.update();
			}, 350);
		}
	}
}
