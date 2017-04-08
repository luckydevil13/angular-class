import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from './login.interface.User';

const userKeyName: string = 'currentUser';
const guest: User = {login: 'guest'};

@Injectable()
export class LoginService {
  private user: Observable<User>;

  constructor() {
    const user: User = JSON.parse(localStorage.getItem('currentUser')) || guest;
    this.user = Observable.from([user]);
  }

  public doLogin(user: User): Observable<User> {
    console.log('Do Login');
    this.user = Observable.from([user]);
    localStorage.setItem(userKeyName, JSON.stringify(
        {
          login: user.login,
          token: this.generateToken()
        }
      )
    );
    return this.user;
  }

  public doLogout(): void {
    console.log('Do Logout');
    this.user = Observable.from([guest]);
    localStorage.removeItem(userKeyName);
  }

  public IsAuthenticated(): boolean {
    let isAuthenticated: boolean;
    this.user.subscribe((user) => isAuthenticated = user.login !== 'guest');
    return isAuthenticated;
  }

  public GetUserInfo(): Observable<User> {
    return this.user;
  }

  private generateToken(): string {
    return Math.random().toString().substr(2);
  }
}
