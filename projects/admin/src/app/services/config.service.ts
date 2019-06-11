import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

	public homePageUrl = 'http://www.passafaila.com/ooget/';
	// Testing Server Config
	// public base_url = 'http://192.168.1.14/ooget/';

	// Cloud Testing Server Config
	public base_url = 'http://104.197.80.225/ooget/';

	// Main Server Config
	// public homePageUrl = "https://ooget.com.sg";
	// public base_url = "https://api.ooget.com.sg/ooget/admin";
}
