import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {Course} from './course.interface.Course';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'sg-course',
  encapsulation: ViewEncapsulation.Native,
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseComponent {

  private doSubmit(form: FormControl): void {
    console.log(form.value);
  }

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

  public doSave(): void {
    return;
  }

  public doCancel(): void {
    return;
  }

}
