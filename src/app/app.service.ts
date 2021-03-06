import { Injectable } from '@angular/core';

export type InternalStateType = {
  [key: string]: any
};

@Injectable()
export class AppState {
  public _state: InternalStateType = { };

  private _clone(object: InternalStateType): any {
    // simple object clone
    return JSON.parse(JSON.stringify( object ));
  }

  // already return a clone of the current state
  /* tslint:disable:typedef */
  public get state() {
    return this._state = this._clone(this._state);
  }
  // never allow mutation
  /* tslint:disable:typedef */
  public set state(value: any) {
    throw new Error('do not mutate the `.state` directly');
  }

  public get(prop?: any): any {
    // use our state getter for the clone
    const state: any = this.state;
    return state.hasOwnProperty(prop) ? state[prop] : state;
  }

  public set(prop: string, value: any) {
    // internally mutate our state
    return this._state[prop] = value;
  }
}
