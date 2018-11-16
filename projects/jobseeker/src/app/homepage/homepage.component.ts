import { Component, OnInit } from '@angular/core';
import { NguCarousel } from '@ngu/carousel';
import { Subscription } from 'rxjs';
import { ApiCallService } from '../services/api-call.service';
import { ConfigService } from '../services/config.service';

@Component({
	selector: 'app-homepage',
	templateUrl: './homepage.component.html',
	styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
	busy: Subscription; //busy Config
	public imgBaseUrl;
	// public carouselTile: NguCarousel;

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
		this.imgBaseUrl = urlconfig.img_base_url1;
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
					// console.log(response);
					if (response.success) {
						this.featuredEmployers = response.message;
						if (this.featuredEmployers.length > 0) {
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
		// this.carouselTile = {
		// 	grid: { xs: 2, sm: 3, md: 5, lg: 5, all: 0 },
		// 	slide: 1,
		// 	speed: 400,
		// 	interval: 3000,
		// 	animation: 'lazy',
		// 	point: {
		// 		visible: false
		// 	},
		// 	load: 2,
		// 	touch: true,
		// 	easing: 'ease',
		// 	loop: true,
		// };
	}
}
