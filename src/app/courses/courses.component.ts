import { Component, OnInit } from '@angular/core';
import { ICourse } from '../course';

export interface ICoursesNotofyEvent {
  action: string;
  course: ICourse;
};

let coursesData: ICourse[] = [
  {
    title: 'Course 1',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ' +
    'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took' +
    'a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but' +
    'also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s ' +
    'with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing' +
    'software like Aldus PageMaker including versions of Lorem Ipsum.',
    date: new Date(),
    duration: 154,
    authors: ['Bob Shafer', 'Neel Yound'],
    id: 1
  },

  {
    title: 'Course 2',
    description:
    'a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but' +
    'also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s ' +
    'with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing' +
    'software like Aldus PageMaker including versions of Lorem Ipsum.' +
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ' +
    'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took',
    date: new Date(2015, 11, 7),
    duration: 25,
    authors: ['Bob Shafer'],
    id: 2
  },

  {
    title: 'Course 3',
    description:
    'a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but' +
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ' +
    'also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s ' +
    'with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing' +
    'software like Aldus PageMaker including versions of Lorem Ipsum.' +
    'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took',
    date: new Date(2016, 11, 17),
    duration: 104,
    authors: ['Noel Young'],
    id: 3
  }
];

@Component({
  selector: 'sg-courses',
  templateUrl: 'courses.component.html',
  styleUrls: ['courses.component.css']
})

export class CoursesComponent implements OnInit {
  public courses: ICourse[] = coursesData;

  constructor() {
    return this;
  }

  public ngOnInit(): void {
    return;
  }

  public getNotification(evt: ICoursesNotofyEvent): void {
    console.log('Event action: ' + evt.action + '; course.id: ' + evt.course.id);
    if (evt.action === 'delete') {
      this.removeCourseByID(evt.course.id);
    }
  }

  public removeCourseByID(id: number): void {
    this.courses = this.courses.filter(
        (obj: ICourse): boolean => { return obj.id !== id; }
    );
  }
}
