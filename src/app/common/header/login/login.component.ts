import {Component, ViewEncapsulation} from '@angular/core';
import {LoginService} from '../../../login/login.service';

@Component({
  selector: 'sg-header-login',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})

export class HeaderLoginComponent {

  constructor(private loginService: LoginService) {
  }

  public logout(): void {
    this.loginService.doLogout();
  }
}
