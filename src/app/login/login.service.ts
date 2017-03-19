import { Injectable } from '@angular/core';
import { User } from './login.component';

const userKeyName: string = 'currentUser';
const guest: User = { login: 'guest' };

@Injectable()
export class LoginService {
  private user: User;

  constructor(){
    this.user = JSON.parse(localStorage.getItem('currentUser')) || guest;
  }

  public doLogin(user: User): void {
    console.log('Do Login');

    // TODO check credentials
    delete user.password;

    this.user = user;
    this.user.token = this.geterateToken();
    localStorage.setItem(userKeyName, JSON.stringify( this.user ));
  }

  public doLogout(): void {
    console.log('Do Logout');
    this.user = guest;
    localStorage.removeItem(userKeyName);
  }

  public IsAuthenticated(): boolean {
    return this.user.login !== 'guest';
  }

  public GetUserInfo(): string {
    return this.user.login;
  }

  private geterateToken(): string {
    return Math.random().toString().substr(2);
  }

}
