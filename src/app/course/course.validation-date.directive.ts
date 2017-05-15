import { Directive, forwardRef } from '@angular/core';
import {NG_VALIDATORS, FormControl, Validator} from '@angular/forms';

@Directive({
  selector: '[validateDate][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => ValidationDateDirective), multi: true }
  ]
})

export class ValidationDateDirective implements Validator {
  public validate(c: FormControl): {[key: string]: boolean} {
    return /^(\d{2})\/(\d{2})\/(\d{4})$/.test(c.value) ?  undefined : {'invalidDateFormat dd/MM/yyyy': false };
  }
}
