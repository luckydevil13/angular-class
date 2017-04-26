import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit,
  ViewEncapsulation, Input, forwardRef
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'authors.component.html',
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class CourseAuthorsComponent implements ControlValueAccessor, OnInit, OnDestroy {
  private courseServiceSubscription: Subscription;
  private authors: Author;
  @Input() public innerValue: string;
  public isDisabled: boolean;

  constructor(private courseService: CourseService,
              private cd: ChangeDetectorRef) {}

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

  public ngOnInit(): void {
    this.courseServiceSubscription = this.courseService.getAuthors().subscribe(
      (authors) => {
        this.authors = authors;
        this.cd.markForCheck();
      }
    );
  }

  public ngOnDestroy(): void {
    this.courseServiceSubscription.unsubscribe();
  }
}
