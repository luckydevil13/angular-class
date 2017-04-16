import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {CourseService} from '../../course/course.service';

@Component({
  selector: 'sg-course-toolbox',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './course-toolbox.component.html',
  styleUrls: ['./course-toolbox.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseToolboxComponent {
  @Input() public searchValue: string = '';
  @Output() public notifyParent: EventEmitter<Object> = new EventEmitter();

  constructor(private courseService: CourseService) {
  }

  protected searchCourse(value: string): void {
    console.log('Searching for ' + value);
    this.searchValue = value;
    this.notifyParent.emit({action: 'search', value});
  }

  protected addCourse(): void {
    location.href = '/#/course';
  }
}
