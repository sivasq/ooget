import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class ConfigService {

	// Cloud Testing Server Config
	public homePageUrl = "http://www.passafaila.com/ooget/";
	public base_url = "http://104.197.80.225:3010/ooget/admin";
	public img_base_url = "http://104.197.80.225:3010/ooget/media";

	// Main Server Config
	// public homePageUrl = "https://ooget.com.sg";
	// public base_url = "https://api.ooget.com.sg/ooget/admin";
	// public img_base_url = "https://api.ooget.com.sg/ooget/media";

	appearance = new Observable((observer) => {
		observer.next("outline")
		observer.complete()
	})
}

@Injectable({
	providedIn: 'root'
})
export class Subscriber<T>
{
	protected authUser = new Subject<T>();

	public setAuthUserNext(user: T) {
		this.authUser.next(user);
	}

	public getAuthUserSubscribe(callback: (user: T) => void) {
		this.authUser.subscribe(callback);
	}
}
