import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { NguCarouselConfig } from '@ngu/carousel';
import { Subscription, Observable, interval } from 'rxjs';
import { ApiCallService } from '../services/api-call.service';
import { ConfigService } from '../services/config.service';

@Component({
	selector: 'app-homepage',
	templateUrl: './homepage.component.html',
	styleUrls: ['./homepage.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomepageComponent implements OnInit, OnDestroy {
	busy: Subscription; //busy Config
	public baseUrl;
	public carouselTile: NguCarouselConfig;

	public homePageContent: any = {
		title: '',
		subtitle: '',
		list1: '',
		list2: '',
		list3: '',
		list4: ''
	}

	public featuredEmployersAvailable: boolean = false;
	public featuredEmployers: any[] = [];

	constructor(private _httpService: ApiCallService, private urlconfig: ConfigService, ) {
		this.baseUrl = urlconfig.base_url;
		this.getHomePageContents();
		this.getFeaturedEmployers();
	}

	// Get Home Page Contents
	getHomePageContents() {
		this.busy = this._httpService.getHomePageContents()
			.subscribe(
				response => {
					// console.log(response);
					if (response.success) {
						// Profile Tab
						this.homePageContent.title = response.message.title ? response.message.title : '';
						this.homePageContent.subtitle = response.message.subtitle ? response.message.subtitle : '';
						this.homePageContent.list1 = response.message.list1 ? response.message.list1 : '';
						this.homePageContent.list2 = response.message.list2 ? response.message.list2 : '';
						this.homePageContent.list3 = response.message.list3 ? response.message.list3 : '';
						this.homePageContent.list4 = response.message.list4 ? response.message.list4 : '';

					} else if (!response.success) {
						// console.log(response);
					}
				},
				error => {
					// console.log(error);
				}
			);
	}

	// Get Featured Employers
	getFeaturedEmployers() {
		this.busy = this._httpService.getFeaturedEmployers()
			.subscribe(
				response => {
					if (response.success) {
						if (response.message.length > 0) {
							this.featuredEmployers = response.message;
							this.featuredEmployersAvailable = true;
						} else {
							this.featuredEmployersAvailable = false;
						}
					} else if (!response.success) {
						// console.log(response);
					}
				},
				error => {
					// console.log(error);
				}
			);
	}

	ngOnInit() {
		this.carouselTile = {
			grid: { xs: 2, sm: 3, md: 5, lg: 5, all: 0 },
			slide: 1,
			speed: 400,
			interval: { timing: 3000 },
			animation: 'lazy',
			point: {
				visible: false
			},
			load: 2,
			touch: true,
			easing: 'ease',
			loop: true,
		};
	}

	ngOnDestroy() {
		if (this.busy) {
			this.busy.unsubscribe();
		}
	}
}
