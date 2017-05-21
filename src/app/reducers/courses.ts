import {Action} from '@ngrx/store';
import {CoursesReducer} from './courses.interface.reducer';
import {Course} from '../course/course.interface.Course';

export const INIT_COURSES: string = 'INIT_COURSES';
export const COURSES_LOADED: string = 'COURSES_LOADED';

const initialState: CoursesReducer = {
  list: [],
  error: undefined,
};

export function coursesReducer(state: CoursesReducer = initialState, action: Action = {type: INIT_COURSES}): CoursesReducer {

  switch (action.type) {
    case COURSES_LOADED:
      const list: Course[] = state.list.concat(action.payload);
      return Object.assign({}, state, {
          list,
          error: undefined,
        });
    case INIT_COURSES:
      return Object.assign({}, initialState);
    default:
      return state;
  }
}
