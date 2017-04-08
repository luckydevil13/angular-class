import {Course} from '../course/course.interface.Course';

export interface CoursesNotifyEvent {
  readonly action: string;
  readonly course: Course;
}
