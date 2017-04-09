import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {User} from './login.interface.User';

const userKeyName: string = 'currentUser';
const guest: User = {login: 'guest'};

@Injectable()
export class LoginService {
  private user: Observable<User>;
  private userServiceSubscription: any;
  public lastTenLogins: ReplaySubject<string>;

  constructor() {
    const user: User = JSON.parse(localStorage.getItem('currentUser')) || guest;
    this.user = Observable.from([user]);
    this.lastTenLogins = new ReplaySubject<string>(10, 10);
  }

  public doLogin(user: User): Observable<User> {
    this.user = Observable.from([user]);
    localStorage.setItem(userKeyName, JSON.stringify(
        {
          login: user.login,
          token: this.generateToken()
        }
      )
    );
    this.lastTenLogins.next(user.login + 'do login');
    return this.user;
  }

  public doLogout(): void {
    this.user = Observable.from([guest]);
    localStorage.removeItem(userKeyName);
    this.lastTenLogins.next('logout');
  }

  public IsAuthenticated(): boolean {
    let isAuthenticated: boolean;
    this.userServiceSubscription = this.user.subscribe((user) => isAuthenticated = user.login !== 'guest');
    return isAuthenticated;
  }

  public GetUserInfo(): Observable<User> {
    return this.user;
  }

  private generateToken(): string {
    return Math.random().toString().substr(2);
  }

  public ngOnDestroy(): void {
    this.userServiceSubscription.unsubscribe();
  }

}
