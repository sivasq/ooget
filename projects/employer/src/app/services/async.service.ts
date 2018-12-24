import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Event, NavigationEnd, Router } from '@angular/router';

/* // Not used
@Injectable({
	providedIn: 'root'
})
export class AsyncService {

	constructor() { }
	getAppearance = new Observable((observer) => {
		observer.next("outline")
		observer.complete()
	})
} */

/* // Not used
@Injectable({
	providedIn: 'root'
})
export class Subscriber<T>
{
	protected authUser = new Subject<T>();

	public setAppearance(user: T) {
		this.authUser.next(user);
	}

	public getAppearance(callback: (user: T) => void) {
		this.authUser.subscribe(callback);
	}
} */

@Injectable({
	providedIn: 'root'
})
export class AsyncSubscriber {

	// Behavior subjects need a first value
	appearance = new BehaviorSubject<string>('outline');
	getAppearance = this.appearance.asObservable();

	public setAppearance() {
		this.appearance.next("standard");
	}

	//
	profileDetails = new Subject<any>();
	getProfileDetails = this.profileDetails.asObservable();

	public setProfileDetails(profileData) {
		this.profileDetails.next(profileData);
	}
}

@Injectable({
	providedIn: 'root'
})
export class NavService {
	// public  : any;
	public currentUrl = new BehaviorSubject<string>(undefined);

	constructor(private router: Router) {
		this.router.events.subscribe((event: Event) => {
			if (event instanceof NavigationEnd) {
				this.currentUrl.next(event.urlAfterRedirects);
			}
		});
	}

	public closeNav() {
		// this.appDrawer.close();
	}

	public openNav() {
		// this.appDrawer.open();
	}
}
