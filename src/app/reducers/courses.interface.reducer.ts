import {Course} from '../course/course.interface.Course';

export interface CoursesReducer {
  readonly list: Course[];
  readonly error: string;
}
