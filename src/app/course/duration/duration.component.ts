import {Component, forwardRef, Input, ViewEncapsulation} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CourseDurationComponent),
  multi: true
};

@Component({
  selector: 'sg-course-duration-input',
  encapsulation: ViewEncapsulation.None,
  template: `<input [(ngModel)]="value" type="text" size="10" #duration="ngModel" validateDuration>
  <span> {{value | courseDuration: duration}}</span>
  <span class="error" *ngIf="duration.invalid && duration.dirty">{{duration.errors | json}}</span>
  `,
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class CourseDurationComponent implements ControlValueAccessor {
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
