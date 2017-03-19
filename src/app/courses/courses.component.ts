import { Component, OnInit, DoCheck, ViewEncapsulation } from '@angular/core';
import { Course } from '../course';
import { CourseService } from '../course/course.service';

export interface CoursesNotofyEvent {
  action: string;
  course: Course;
};

@Component({
  selector: 'sg-courses',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'courses.component.html',
  styleUrls: ['courses.component.css']
})

export class CoursesComponent implements OnInit, DoCheck {
  public courses: Course[];

  constructor( private courseService: CourseService ) {
  }

  public ngOnInit(): void{
   this.courses = this.courseService.getList();
  }

  public ngDoCheck(): void {
    this.courses = this.courseService.getList();
  }

  public getNotification(evt: CoursesNotofyEvent): void {
    console.log('Event action: ' + evt.action + '; course.id: ' + evt.course.id);
    if (evt.action === 'delete') {
      this.courseService.removeItem(evt.course);
    }
  }

}
