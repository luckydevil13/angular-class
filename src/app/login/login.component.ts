import { Component } from '@angular/core';

export interface IUser {
  login: string;
  password: string;
}

@Component({
  selector: 'sg-login',
  templateUrl: 'login.component.html'
})

export class LoginComponent implements IUser {

  constructor(
    public login: string,
    public password: string
  ) {
    return this;
  }

  public LogIn(user: IUser): IUser {
    return;
  }

  public isAuthenficated(): boolean {
    return true;
  }

  public LogOut(): boolean {
    return;
  }
}
