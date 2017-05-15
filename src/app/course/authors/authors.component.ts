import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit,
  ViewEncapsulation, Input, forwardRef, EventEmitter, Output
} from '@angular/core';
import {CourseService} from '../course.service';
import {Author} from './author.interface';
import {Subscription} from 'rxjs/Subscription';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CourseAuthorsComponent),
  multi: true
};

@Component({
  selector: 'sg-course-authors',
  styleUrls: ['authors.component.css'],
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'authors.component.html',
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class CourseAuthorsComponent implements ControlValueAccessor, OnInit, OnDestroy {

  private changed: any = new Array<(value: Author) => void>();
  private touched: any = new Array<() => void>();
  private courseServiceSubscription: Subscription;
  private authors: Author[];
  private innerValue: Author[];

  constructor(private courseService: CourseService) {
  }

  public touch(): void {
    console.log('tochedd');
    this.touched.forEach((f) => f());
  }

  public writeValue(value: Author[]): void {
    if ((value || this.innerValue) && value !== this.innerValue) {
      console.log('writeValue');
      if (value) {
        console.log('total selected in authors comp:' + value.length);
      }
      this.innerValue = value;
    }
  }

  public registerOnChange(fn: (value: Author) => void): void {
    console.log('registerOnChange');
    this.changed.push(fn);
  }

  public registerOnTouched(fn: () => void): void {
    console.log('registerOnTouched');
    this.touched.push(fn);
  }

  public ngOnInit(): void {
    this.courseServiceSubscription = this.courseService.getAuthors().subscribe(
      (authors) => {
        this.authors = authors;
      }
    );
  }

  public onSelectionChange(author: Author): void {
    this.innerValue = this.innerValue || [];
    let clone: Author[] = this.innerValue.slice(0);
    if (this.innerValue.find((a) => a.id === author.id)) {
      // deselect
      clone = this.innerValue.filter((a) => {
        return a.id !== author.id;
      });
    } else {
      // select
      clone.push(author);
    }
    this.writeValue(clone);
  }

  public isChecked(id: number): boolean {
    if (this.innerValue) {
      return !!this.innerValue.find((a) => a.id === id);
    }
  }

  public ngOnDestroy(): void {
    this.courseServiceSubscription.unsubscribe();
  }
}
