import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICourse } from '../../course';

@Component({
  selector: 'sg-simple-course',
  templateUrl: 'courseSimple.component.html',
  styleUrls: ['courseSimple.component.css']
})
export class CourseSimpleComponent implements OnInit {
  @Input() public course: ICourse;
  @Output() public notifyParent: EventEmitter<any> = new EventEmitter();

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
