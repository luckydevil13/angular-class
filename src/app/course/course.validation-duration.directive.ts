import { Directive, forwardRef } from '@angular/core';
import {NG_VALIDATORS, FormControl, Validator} from '@angular/forms';

@Directive({
  selector: '[validateDuration][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => ValidationDurationDirective), multi: true }
  ]
})

export class ValidationDurationDirective implements Validator {

  public validate(c: FormControl): {[key: string]: boolean} {
    if (c.value) {
      const match: boolean = c.value.match(/^\d+$/);
      return match ? undefined : {'invalidDuration, only number allowed': false };
    }
  }
}
