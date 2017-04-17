import {
  Component, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, Input, OnDestroy, OnInit
} from '@angular/core';
import {CourseService} from '../course/course.service';
import {CoursesNotifyEvent} from './courses.interface.CourseNotifyEvent';
import {Course} from '../course/course.interface.Course';
import {Subscription} from 'rxjs';
import {LoaderBlockService} from '../common/loader/loader.service';

@Component({
  selector: 'sg-courses',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesComponent implements OnDestroy, OnInit {
  private courseServiceSubscription: Subscription;
  private courseServiceSubscription2: Subscription;
  private courseListPopulated: boolean;
  @Input() public courses: Course[];
  public defaultCoursesOnPageCount: number = 4;
  public page: number = 1;
  public coursesCount: number = 0;

  constructor(private courseService: CourseService,
              private loaderBlockService: LoaderBlockService,
              private cd: ChangeDetectorRef) {
  }
  private showCourseList(page: number, count?: number): void {
    this.courseListPopulated = false;
    this.loaderBlockService.show();
    count = count || this.defaultCoursesOnPageCount;
    const start: number = (page * count) || 0;
    this.courses = [];
    this.courseServiceSubscription = this.courseService.getList(start, count)
      .subscribe(
        (course) => {
          course.date = new Date(course.date);
          this.courses.push(course);
        },
        (err) => console.log('err: get course list:' + err),
        () => {
          this.page = start / count;
          this.getCoursesCount();
          this.courseListPopulated = true;
        }
      );
  }

  private getCoursesCount(): void {
    this.coursesCount = 0;
    this.courseServiceSubscription2 = this.courseService.getList(0)
      .subscribe(
        () => this.coursesCount++,
        () => undefined,
        () => {
          this.coursesCount = this.coursesCount - this.defaultCoursesOnPageCount;
          this.loaderBlockService.hide();
          this.cd.markForCheck(); }
      );
  }

  public ngOnInit(): void {
    this.showCourseList(0);
  }

  public getPage(page: number): void {
    this.showCourseList(page);
  }

  public getNotification(evt: CoursesNotifyEvent): void {
    console.log('Event action: ' + evt.action);
    console.log(evt);
    if (evt.action === 'delete') {
      this.courseService.removeItem(evt.value).subscribe(
        undefined, undefined, () => {
          this.showCourseList(this.page);
        }
      );
    } else if (evt.action === 'search') {
      this.courseService.curentSearchFilter(evt.value);
      this.showCourseList(0);
    }
  }

  public ngOnDestroy(): void {
    this.courseServiceSubscription.unsubscribe();
    this.courseServiceSubscription2.unsubscribe();
  }
}
