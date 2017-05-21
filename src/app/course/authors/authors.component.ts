import {Component,
  ViewEncapsulation, Input, forwardRef, EventEmitter, Output, ChangeDetectorRef
} from '@angular/core';
import {CourseService} from '../course.service';
import {Author} from './author.interface';
import {
  ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors,
  Validator
} from '@angular/forms';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CourseAuthorsComponent),
  multi: true
};

const AUTHORS_INPUT_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => CourseAuthorsComponent),
  multi: true,
};

@Component({
  selector: 'sg-course-authors',
  styleUrls: ['authors.component.css'],
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'authors.component.html',
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR, AUTHORS_INPUT_VALIDATOR]
})
export class CourseAuthorsComponent implements ControlValueAccessor, Validator {
  private _value: Author[] = [];
  private _validationErrors: ValidationErrors;
  private _onChange: any;
  private _onTouched: any;
  private _onValidatorChange: any;
  @Input() public control: FormControl;
  @Input() public authors: Author[];

  private _isValueChanged(oldValue: Author[]): boolean {
    return JSON.stringify(oldValue) !== JSON.stringify(this._value);
  }

  private _emitChange(): void {
    if (this._onChange) {
      this._onChange(this._value);
    }
  }

  private _emitValidatorChange(): void {
    if (this._onValidatorChange) {
      this._onValidatorChange(this._validationErrors);
    }
  }

  public get value(): Author[] {
    return this._value;
  }

  public set value(newValue: Author[]) {
    const oldValue: Author[] = [ ...this._value ];
    this._value = newValue || [];

    if (this._isValueChanged(oldValue)) {
      this._emitChange();
    }
  }

  public registerOnValidatorChange(fn: () => void): void {
    this._onValidatorChange = fn;
  }

  public validate(c: FormControl): ValidationErrors {
    return this._validationErrors;
  }

  public writeValue(value: Author[]): void {
    if (value) {
      this._value = value;
    }
  }

  public registerOnChange(fn: () => void): void {
    this._onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  public getAuthorId(_index: number, author: Author): number {
    return author.id;
  }

  public isAuthorSelected(authorId: number): boolean {
    return this._value.some((author) => author.id === authorId);
  }

  public updateSelected(authorId: number, isChecked: boolean): void {
    if (isChecked) {
      const newAuthor: Author = this.authors.filter((author) => author.id === authorId)[0];
      this.value = [ ...this._value, newAuthor ];
    } else {
      this.value = this._value.filter((author) => author.id !== authorId);
    }
  }
}
