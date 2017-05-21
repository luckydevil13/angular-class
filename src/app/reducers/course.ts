import {Action} from '@ngrx/store';
import {CourseReducer} from './course.interface.reducer';

export const COURSE_LOADED: string = 'COURSE_LOADED';
export const COURSE_SAVED: string = 'COURSE_SAVED';
export const INIT_COURSE: string = 'INIT_COURSE';

const initialState: CourseReducer = {
    course: {
      title: '',
      description: '',
      duration: 0,
      authors: [],
      topRated: false,
      date: undefined
    },
    error: undefined,
  };

export function courseReducer(state: CourseReducer = initialState, action: Action = {type: INIT_COURSE}): CourseReducer {
  switch (action.type) {
    case COURSE_LOADED:
      return Object.assign({}, action.payload);
    case COURSE_SAVED:
      return Object.assign({}, action.payload);
    default:
      return Object.assign({}, initialState);
  }
}
