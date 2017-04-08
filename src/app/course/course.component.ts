import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {Course} from './course.interface.Course';

@Component({
  selector: `sg-course`,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './course.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseComponent implements Course {

  constructor(
    public title: string,
    public description: string,
    public date: Date,
    public duration: number,
    public authors: string[],
    public topRated: boolean,
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
