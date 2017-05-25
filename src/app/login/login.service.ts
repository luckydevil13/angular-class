import {Injectable, OnDestroy} from '@angular/core';
import {Observable, ReplaySubject, Subscription} from 'rxjs';
import {User} from './login.interface.User';
import {AuthorizedHttp} from '../common/services/authorized-http.service';
import {Store} from '@ngrx/store';

import {
  USER_UNAUTHENTICATED,
  USER_AUTHENTICATED,
  USER_INFO
} from '../reducers/auth';

export const currentTokenName: string = 'currentToken';

@Injectable()
export class LoginService implements OnDestroy {
  private urlEndPoint: string = 'http://localhost:3004/auth';
  private userServiceSubscription: Subscription;
  private user: Observable<User>;
  public lastTenLogins: ReplaySubject<string>;

  constructor(private http: AuthorizedHttp,
              private store: Store<any>) {
    this.user = this.store.select('auth');
    this.lastTenLogins = new ReplaySubject<string>(10, 10);
  }

  public doLogin(user: User): Observable<Response> {
    return this.http.post(this.urlEndPoint + '/login', user)
      .map((res) => res.json()).do(
        (res) => {
          localStorage.setItem(currentTokenName, JSON.stringify(res.token).replace(/(^"|"$)/g, ''));
          this.store.dispatch({
            type: USER_AUTHENTICATED,
            payload: res
          });
        }
      );
  }

  public doLogout(): void {
    localStorage.removeItem(currentTokenName);
    this.lastTenLogins.next('logout');
    this.store.dispatch({type: USER_UNAUTHENTICATED});
  }

  public getUserInfo(): Observable<User> {
    return this.http.post(this.urlEndPoint + '/userinfo', '')
      .map((res) => {
        this.store.dispatch({
          type: USER_INFO,
          payload: {
            user: res.json()
          }
        });
        return res.json();
      });
  }

  public ngOnDestroy(): void {
    this.userServiceSubscription.unsubscribe();
  }
}
