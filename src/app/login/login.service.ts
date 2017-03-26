import {Injectable} from '@angular/core';
import {User} from './login.component';
import {Observable} from "rxjs";


const userKeyName: string = 'currentUser';
const guest: User = {login: 'guest'};

@Injectable()
export class LoginService {
  private user: any;

  constructor() {
    const user: string = JSON.parse(localStorage.getItem('currentUser')) || guest;
    this.user = Observable.from([user]);

  }

  public doLogin(user: User): void {
    console.log('Do Login');

    // TODO check credentials
    this.user = Observable.from([user]);
    localStorage.setItem(userKeyName, JSON.stringify(
        {
          login: user.login,
          token: this.generateToken()
        }
      )
    );
  }

  public doLogout(): void {
    console.log('Do Logout');
    this.user = Observable.from([guest]);
    localStorage.removeItem(userKeyName);
  }

  public IsAuthenticated(): boolean {
    let isAuthenticated: boolean;
    this.user.subscribe((user) =>  isAuthenticated = user.login !== 'guest' );
    return isAuthenticated;
  }

  public GetUserInfo(): Observable<any> {
    return this.user;
  }

  private generateToken(): string {
    return Math.random().toString().substr(2);
  }

}

