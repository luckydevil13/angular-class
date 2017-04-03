import {Pipe, PipeTransform} from '@angular/core';
import {Course} from './course.component';

@Pipe({name: 'orderBy'})
export class CourseOrderByPipe implements PipeTransform {
  public transform(courses: Course[]): Course[] {
    return courses.sort((a, b) => +b.date - +a.date);
  }
}
