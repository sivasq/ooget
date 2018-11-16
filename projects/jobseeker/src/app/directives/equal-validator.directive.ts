import { Directive, forwardRef, Attribute, Input, HostBinding } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[validateEqual][formControlName],[validateEqual][formControl],[validateEqual][ngModel]',
  providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => EqualValidatorDirective), multi: true }
    ]
})
export class EqualValidatorDirective implements Validator {
   
  constructor( @Attribute('validateEqual') public validateEqual: string,
        @Attribute('reverse') public reverse: string) { }

  private get isReverse() {
        if (!this.reverse) return false;
        return this.reverse === 'true' ? true: false;
    }

    validate(c: AbstractControl): { [key: string]: any } {
        // self value
        let v = c.value;

        // control vlaue
        let e = c.root.get(this.validateEqual);

        // value not equal
        if (e && v !== e.value && !this.isReverse) {
			console.log(0);
          return {
            validateEqual: false
          }
        }

        // value equal and reverse
        if (e && v === e.value && this.isReverse) {
            delete e.errors['validateEqual'];
			if (!Object.keys(e.errors).length) e.setErrors(null);
			console.log(1);
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
        let e = c.root.get(this.comparer);

        // value not equal in verify control
        if (e && c.value !== e.value && !this.isParent) {
            return { "compare": true };
        }

        // user typing in password and match
        if (e && c.value === e.value && this.isParent) {
            delete e.errors['compare'];
            if (!Object.keys(e.errors).length) e.setErrors(null);
        }

        // user typing in password and mis-match
        if (e && c.value !== e.value && this.isParent) {
            e.setErrors({ "compare": true });
        }
    }

    private get isParent() {
        if (!this.parent)
            return false;

        return this.parent === 'true' ? true : false;
    }
}

@Directive({ selector: '[collapse]' })
export class Collapse {
    // style
    @HostBinding('style.height')
    private height: string;

    // shown
    @HostBinding('class.in')
    @HostBinding('attr.aria-expanded')
    private isExpanded: boolean = true;

    // hidden
    @HostBinding('attr.aria-hidden')
    private isCollapsed: boolean = false;

    // stale state
    @HostBinding('class.collapse')
    private isCollapse: boolean = true;

    // animation state
    @HostBinding('class.collapsing')
    private isCollapsing: boolean = false;

    @Input()
    private set collapse(value: boolean) {
        this.isExpanded = value;
        this.toggle();
        console.log('c1'+value);
    }

    private get collapse(): boolean {
        //return this.isExpanded;
        console.log('c2');
        return true;
    }

    constructor() {
    }

    toggle() {
        if (this.isExpanded) {
            this.hide();
        } else {
            this.show();
        }
    }

    hide() {
        this.isCollapse = false;
        this.isCollapsing = true;

        this.isExpanded = false;
        this.isCollapsed = true;
        setTimeout(() => {
            this.height = '0';
            this.isCollapse = true;
            this.isCollapsing = false;
        }, 4);
    }

    show() {
        this.isCollapse = false;
        this.isCollapsing = true;

        this.isExpanded = true;
        this.isCollapsed = false;
        setTimeout(() => {
            this.height = 'auto';
            this.isCollapse = true;
            this.isCollapsing = false;
        }, 4);
    }
}