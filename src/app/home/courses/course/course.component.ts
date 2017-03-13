import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICourse } from '../../../course';

@Component({
  selector: 'sg-simple-course',
  templateUrl: 'course.component.html',
  styleUrls: ['course.component.css']
})
export class CourseSimpleComponent implements OnInit {
  @Input() public course: ICourse;
  @Output() private notifyParent: EventEmitter<any> = new EventEmitter();

  constructor() {
    return this;
  }

  public ngOnInit(): void {
    return;
  }

  public deleteCourse(course: ICourse): void {
    this.notifyParent.emit(
      {
        action: 'delete',
        course
     }
    );

  }
}
