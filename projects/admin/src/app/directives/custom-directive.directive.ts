import { Directive, forwardRef, Attribute, Input, OnInit, ElementRef } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS, ValidatorFn, FormControl, ValidationErrors } from '@angular/forms';

@Directive({
	selector: '[validateEqual][formControlName],[validateEqual][formControl],[validateEqual][ngModel]',
	providers: [
		{ provide: NG_VALIDATORS, useExisting: forwardRef(() => EqualValidator), multi: true }
	]
})
export class EqualValidator implements Validator {

	constructor(@Attribute('validateEqual') public validateEqual: string, @Attribute('reverse') public reverse: string) { }

	private get isReverse() {
		if (!this.reverse) { return false; }
		return this.reverse === 'true' ? true : false;
	}

	validate(c: AbstractControl): { [key: string]: any } {
		// self value
		const v = c.value;

		// control vlaue
		const e = c.root.get(this.validateEqual);

		// value not equal
		if (e && v !== e.value && !this.isReverse) {
			return {
				validateEqual: false
			}
		}

		// value equal and reverse
		if (e && v === e.value && this.isReverse) {
			delete e.errors['validateEqual'];
			if (!Object.keys(e.errors).length) { e.setErrors(null); }
		}

		// value not equal and reverse
		if (e && v !== e.value && this.isReverse) {
			e.setErrors({
				validateEqual: false
			})
		}
		return null;
	}
}

@Directive({
	selector: '[advs-compare]',
	providers: [{ provide: NG_VALIDATORS, useExisting: CompareDirective, multi: true }]
})
export class CompareDirective implements Validator {

	constructor(@Attribute('advs-compare') public comparer: string, @Attribute('parent') public parent: string) { }

	validate(c: AbstractControl): { [key: string]: any } {
		const e = c.root.get(this.comparer);

		// value not equal in verify control
		if (e && c.value !== e.value && !this.isParent) {
			return { 'compare': true };
		}

		// user typing in password and match
		if (e && c.value === e.value && this.isParent) {
			delete e.errors['compare'];
			if (!Object.keys(e.errors).length) { e.setErrors(null); }
		}

		// user typing in password and mis-match
		if (e && c.value !== e.value && this.isParent) {
			e.setErrors({ 'compare': true });
		}
	}

	private get isParent() {
		if (!this.parent) {
			return false;
		}

		return this.parent === 'true' ? true : false;
	}
}

/**
 * Alterates autocomplete="off" atribute on chrome because it's ignoring it in case of credentials, address or credit card data type.
 */
@Directive({
	selector: '[autocomplete]'
})
export class AutocompleteDirective implements OnInit {
	private _chrome = navigator.userAgent.indexOf('Chrome') > -1;
	constructor(private _el: ElementRef) { }
	ngOnInit() {
		if (this._chrome) {
			if (this._el.nativeElement.getAttribute('autocomplete') === 'off') {
				// setTimeout(() => {
				this._el.nativeElement.setAttribute('autocomplete', 'new-password');
				// });
			}
		}
	}
}
