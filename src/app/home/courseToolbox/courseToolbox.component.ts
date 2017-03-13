import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sg-course-toolbox',
  templateUrl: 'courseToolbox.component.html',
  styleUrls: ['courseToolbox.component.css']
})

export class CourseToolboxComponent implements OnInit {
  public searchValue: string = 'search me';

  constructor() {
    return this;
  }

  public ngOnInit(): void {
    return;
  }

  public searchCourse(value: string): void {
    console.log('Searching for ' + value);
  }
}
