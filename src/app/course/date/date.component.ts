import {Component, forwardRef, Input, ViewEncapsulation} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CourseDateComponent),
  multi: true
};

@Component({
  selector: 'sg-course-date-input',
  encapsulation: ViewEncapsulation.None,
  template: `<input size="10" validateDate ngModel #date="ngModel" [(ngModel)]="value">
  <span class="error" *ngIf="date.invalid && date.dirty">{{date.errors | json}}</span>
  `,
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class CourseDateComponent implements ControlValueAccessor {
  @Input() public innerValue: string;
  public isDisabled: boolean;

  public onTouched = () => undefined;
  public onChange = (_: string) => undefined;

  get value(): string {
    return this.innerValue;
  }

  set value(v: string) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChange(v);
    }
  }

  public writeValue(value: string): void {
    console.log(value);
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
