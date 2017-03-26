import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'sg-course-toolbox',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'courseToolbox.component.html',
  styleUrls: ['courseToolbox.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CourseToolboxComponent {
  public searchValue: string = 'search me';
  public searchCourse(value: string): void {
    console.log('Searching for ' + value);
  }
}
