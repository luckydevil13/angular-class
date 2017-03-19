import { Component, ViewEncapsulation } from '@angular/core';
import { LoginService } from './login.service';

export interface User {
  login: string;
  password?: string;
  token?: string;
};

@Component({
  selector: 'sg-login',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})

export class LoginComponent {
  //private user: User;

  constructor(private loginService: LoginService) {
    return this;
  }

  public doLogin(user: User): void {
    if (user.login && user.password) {
      this.loginService.doLogin(user);
      location.href = "/#/courses";
    }
  }
}
