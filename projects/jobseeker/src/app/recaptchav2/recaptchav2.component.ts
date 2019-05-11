import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ReCaptcha2Component } from 'ngx-captcha';

declare var hljs: any;

@Component({
	selector: 'app-recaptchav2',
	templateUrl: './recaptchav2.component.html',
	styleUrls: ['./recaptchav2.component.scss']
})
export class Recaptchav2Component implements OnInit {

	public readonly siteKey = '6Lc2L6IUAAAAAG0I8PuARFQibZcDRuU9vM8NPrG1';

	constructor(
		) { }

	ngOnInit() {

	}
}
