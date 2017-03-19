import { Component, ViewEncapsulation } from '@angular/core';

export interface Course {
  title: string;
  description: string;
  date: Date;
  duration: number;
  authors: string[];
  id?: number;
}

@Component({
  selector: `sg-course`,
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'course.component.html'
})

export class CourseComponent implements Course {

  constructor(
    public title: string,
    public description: string,
    public date: Date,
    public duration: number,
    public authors: string[],
    public id?: number
  ) { }

  public getCourse(id: number): Course {
    return;
  }

  public addCourse(course: Course): Course {
    return;
  }

  public updateCourse(course: Course): Course {
    return;
  }

  public deleteCourse(id: number): boolean {
    return;
  }

}
