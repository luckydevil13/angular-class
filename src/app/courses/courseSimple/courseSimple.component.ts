import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Course } from '../../course';
import { DialogService } from '../../common/dialog.service';

@Component({
  selector: 'sg-simple-course',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'courseSimple.component.html',
  styleUrls: [
    'courseSimple.component.css',
     '../../common/dialog.service.css'
   ]
})
export class CourseSimpleComponent implements OnInit {
  @Input() public course: Course;
  @Output() public notifyParent: EventEmitter<any> = new EventEmitter();

  constructor(private dialogService: DialogService) {
  }

  public ngOnInit(): void {
    return;
  }

  public deleteCourse(course: Course): void {
     this.dialogService.confirm('Delete '+ course.title,'Do you really want to delete this course?').then(
           () => { this.notifyParent.emit( { action: 'delete', course } ) },
           () => null
      );
  }
}