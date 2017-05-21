import {Course} from '../course/course.interface.Course';

export interface CourseReducer {
  readonly course: Course;
  readonly error: string;
}
