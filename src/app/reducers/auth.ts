import {Action} from '@ngrx/store';
import {User} from '../login/login.interface.User';

export const USER_UNAUTHENTICATED: string = 'USER_NOT_AUTHENTICATED';
export const USER_AUTHENTICATED: string = 'USER_AUTHENTICATED';
export const USER_INFO: string = 'USER_INFO';

const initialState: User = {
  login: '',
  fakeToken: '',
  password: '',
  name: {},
};

export function authReducer(state: User = initialState, action: Action = {type: USER_UNAUTHENTICATED}): User {

  switch (action.type) {
    case USER_UNAUTHENTICATED:
      return Object.assign({}, initialState);
    case USER_AUTHENTICATED:
      return Object.assign({}, state, {fakeToken: action.payload.token});
    case USER_INFO:
      return Object.assign({}, state, action.payload.user);
    default:
      return state;
  }
}
