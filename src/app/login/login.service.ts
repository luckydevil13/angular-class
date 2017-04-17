import {Injectable, OnDestroy} from '@angular/core';
import {Observable, ReplaySubject, Subscription} from 'rxjs';
import {User} from './login.interface.User';
import {AuthorizedHttp} from '../common/services/authorized-http.service';
export const currentTokenName: string = 'currentToken';

@Injectable()
export class LoginService implements OnDestroy {
  private urlEndPoint: string = ENV === 'development' ? 'http://localhost:3004/auth' : 'http://server.com/auth';
  private userServiceSubscription: Subscription;
  private user: User;
  public lastTenLogins: ReplaySubject<string>;

  constructor(private http: AuthorizedHttp) {
    this.lastTenLogins = new ReplaySubject<string>(10, 10);
  }

  public doLogin(user: User): Observable<Response> {
    return this.http.post(this.urlEndPoint + '/login', user)
      .map((res) => res.json()).do(
        (res) => {
          localStorage.setItem(currentTokenName, JSON.stringify(res.token).replace(/(^"|"$)/g, ''));
        }
      );
  }

  public doLogout(): void {
    localStorage.removeItem(currentTokenName);
    this.lastTenLogins.next('logout');
    this.user = <User>{};
  }

  public isAuthenticated(): boolean {
    return !!this.user;
  }

  public getUserInfo(): Observable<User> {
    return this.http.post(this.urlEndPoint + '/userinfo', '')
      .map((res) => this.user = res.json());
  }

  public ngOnDestroy(): void {
    this.userServiceSubscription.unsubscribe();
  }
}
