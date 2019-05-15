import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

	// Testing Server Config
	// public homePageUrl = "http://www.passafaila.com/ooget/";
	public base_url = 'http://192.168.1.14/ooget/';
	// public img_base_url = "http://localhost:3051/ooget/media";


	// Cloud Testing Server Config
	public homePageUrl = 'http://www.passafaila.com/ooget/';
	// public base_url = 'http://104.197.80.225:3010/ooget/admin';
	public img_base_url = 'http://104.197.80.225:3010/ooget/media';

	// Main Server Config
	// public homePageUrl = "https://ooget.com.sg";
	// public base_url = "https://api.ooget.com.sg/ooget/admin";
	// public img_base_url = "https://api.ooget.com.sg/ooget/media";
}
