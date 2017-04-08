import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {CourseService} from '../../course/course.service';

@Component({
  selector: 'sg-course-toolbox',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './course-toolbox.component.html',
  styleUrls: ['./course-toolbox.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseToolboxComponent {
  public searchValue: string = 'search me';

  constructor(private courseService: CourseService) {
  }

  public searchCourse(value: string): void {
    console.log('Searching for ' + value);
    this.searchValue = value;
    this.courseService.curentSearchValue(value);
  }
}
