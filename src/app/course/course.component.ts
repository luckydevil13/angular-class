import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

export interface Course {
  readonly title: string;
  readonly description: string;
  readonly date: Date;
  readonly duration: number;
  readonly authors: string[];
  /* tslint:disable:readonly-interface */
  id?: number;
}

@Component({
  selector: `sg-course`,
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'course.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
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
