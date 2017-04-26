import { Directive, forwardRef } from '@angular/core';
import {NG_VALIDATORS, FormControl, Validator} from '@angular/forms';

@Directive({
  selector: '[validateAuthorSelected][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => ValidationAuthorsDirective), multi: true }
  ]
})

export class ValidationAuthorsDirective implements Validator {

  public validate(c: FormControl): {[key: string]: boolean} {
    return undefined;
  }
}
