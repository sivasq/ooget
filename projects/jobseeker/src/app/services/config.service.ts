import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
	// Cloud Testing Server Config
	// public base_url = "http://104.197.80.225:3010/ooget/jobseeker";
	// public img_base_url = "http://104.197.80.225:3010/ooget/media/jobseeker";
	// public img_base_url1 = "http://104.197.80.225:3010/ooget/media";

	// Main Server Config
	public base_url = "https://api.ooget.com.sg/ooget/jobseeker";
	public img_base_url = "https://api.ooget.com.sg/ooget/media/jobseeker";
	public img_base_url1 = "https://api.ooget.com.sg/ooget/media";

	constructor() { }

}
