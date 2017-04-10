import {Component, DoCheck, ViewEncapsulation, ChangeDetectionStrategy} from '@angular/core';
import {CourseService} from '../course/course.service';
import {CoursesNotifyEvent} from './courses.interface.CourseNotifyEvent';
import {Course} from '../course/course.interface.Course';
import {Subscription} from 'rxjs';

const filterOutdatedCourses: number = -14;

@Component({
  selector: 'sg-courses',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesComponent implements DoCheck {
  public courses: Course[];
  private courseServiceSubscription: Subscription;

  constructor(private courseService: CourseService) {
  }

  public ngDoCheck(): void {
    this.courses = [];
    this.courseServiceSubscription = this.courseService.getList()
      .filter((course) => {
          let dateDiff: number = this.dateDiffInDays(course.date);
          return dateDiff > filterOutdatedCourses;
        }
      )
      .map((course) => { return course; })
      .subscribe((course) => this.courses.push(course));
  }

  public getNotification(evt: CoursesNotifyEvent): void {
    console.log('Event action: ' + evt.action + '; course.id: ' + evt.course.id);
    if (evt.action === 'delete') {
      this.courseService.removeItem(evt.course);
    }
  }

  public ngOnDestroy(): void {
    this.courseServiceSubscription.unsubscribe();
  }

  private dateDiffInDays(dt: Date): number {
    let now: Date = new Date();
    return Math.floor((Date.UTC(dt.getFullYear(), dt.getMonth(), dt.getDate())
      - Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) ) / (1000 * 60 * 60 * 24));
  }

}
