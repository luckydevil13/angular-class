import { Component, OnInit, DoCheck, ViewEncapsulation } from '@angular/core';
import {User} from '../../../login/login.component';
import {LoginService} from '../../../login/login.service';


@Component({
  selector: 'sg-header-login',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})

export class HeaderLoginComponent implements DoCheck {

  constructor(private loginService: LoginService) {
  }

  public ngDoCheck(): void {
  }

  public logout(): void {
    this.loginService.doLogout();
  }
}
