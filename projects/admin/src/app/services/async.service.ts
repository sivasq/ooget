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

	profileDetails = new Subject<any>();
	getProfileDetails = this.profileDetails.asObservable();

	public setAppearance() {
		this.appearance.next('standard');
	}

	public setProfileDetails(profileData) {
		this.profileDetails.next(profileData);
	}
}
