import { Component } from '@angular/core';

export interface ICourse {
  title: string;
  description: string;
  date: Date;
  duration: number;
  authors: string[];
  id?: number;
}

@Component({
  selector: 'sg-course',
  templateUrl: 'course.component.html'
})

export class CourseComponent implements ICourse {

  constructor(
    public title: string,
    public description: string,
    public date: Date,
    public duration: number,
    public authors: string[],
    public id?: number
  ) { }

  public getCourse(id: number): ICourse {
    return;
  }

  public addCourse(course: ICourse): ICourse {
    return;
  }

  public updateCourse(course: ICourse): ICourse {
    return;
  }

  public deleteCourse(id: number): boolean {
    return;
  }

}
