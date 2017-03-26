import {Component, OnInit, DoCheck, ViewEncapsulation, ChangeDetectionStrategy} from '@angular/core';
import {Course} from '../course';
import {CourseService} from '../course/course.service';

export interface CoursesNotofyEvent {
  readonly action: string;
  readonly course: Course;
}

@Component({
  selector: 'sg-courses',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'courses.component.html',
  styleUrls: ['courses.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CoursesComponent implements OnInit, DoCheck {
  public courses: any;

  constructor(private courseService: CourseService) {
  }

  public ngOnInit(): void {
    this.courses = [];
    this.courseService.getList().subscribe((course) => this.courses.push(course));
  }

  public ngDoCheck(): void {
    this.courses = [];
    this.courseService.getList().subscribe((course) => this.courses.push(course));
  }

  public getNotification(evt: CoursesNotofyEvent): void {
    console.log('Event action: ' + evt.action + '; course.id: ' + evt.course.id);
    if (evt.action === 'delete') {
      this.courseService.removeItem(evt.course);
    }
  }

}
