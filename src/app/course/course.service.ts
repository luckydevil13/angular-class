import {Injectable} from '@angular/core';
import {Course} from './course.component';

let coursesData: Course[] = [
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
    id: 0
  },

  {
    title: 'Course 2',
    description: 'a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but' +
    'also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s ' +
    'with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing' +
    'software like Aldus PageMaker including versions of Lorem Ipsum.' +
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ' +
    'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took',
    date: new Date(2015, 11, 7),
    duration: 25,
    authors: ['Bob Shafer'],
    id: 1
  },

  {
    title: 'Course 3',
    description: 'a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but' +
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ' +
    'also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s ' +
    'with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing' +
    'software like Aldus PageMaker including versions of Lorem Ipsum.' +
    'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took',
    date: new Date(2016, 11, 17),
    duration: 104,
    authors: ['Noel Young'],
    id: 2
  }
];

@Injectable()
export class CourseService {
  private courses: Course[] = coursesData;

  public getList(): Course[] {
    return this.courses;
  }

  public createCourse(course: Course): void {
    course.id = this.courses.length;
    this.courses.push(course);
  }

  public getItemByID(id: number): Course {
    return this.courses.find((course) => course.id === id);
  }

  public updateItem(course: Course): void {
    this.courses[course.id] = course;
  }

  public removeItem(course: Course): void {
    this.courses = this.courses.filter((currentCourse) => currentCourse.id !== course.id);
  }

}
