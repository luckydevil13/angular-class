import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Course } from '../../course';

@Component({
  selector: 'sg-simple-course',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'courseSimple.component.html',
  styleUrls: ['courseSimple.component.css']
})
export class CourseSimpleComponent implements OnInit {
  @Input() public course: Course;
  @Output() public notifyParent: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  public ngOnInit(): void {
    return;
  }

  public deleteCourse(course: Course): void {
      this.notifyParent.emit( { action: 'delete', course } );
  }



}
