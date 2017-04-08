import {Pipe, PipeTransform} from '@angular/core';
import {CourseService} from './course.service';
import {Course} from './course.interface.Course';

@Pipe({name: 'searchFilter'})
export class CourseSearchFilterPipe implements PipeTransform {

  constructor(private courseService: CourseService) {
  }

  public transform(courses: Course[]): Course[] {
    let filter: string = this.courseService.curentSearchValue();
    if (!filter) {
      return courses;
    }

    return courses.filter((course) => {
      let re: RegExp = new RegExp(filter, 'g');
      return course.title.match(re);
    });
  }
}
