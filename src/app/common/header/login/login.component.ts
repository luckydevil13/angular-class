import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation} from '@angular/core';
import {LoginService} from '../../../login/login.service';

@Component({
  selector: 'sg-header-login',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HeaderLoginComponent {
  private isUserAuthenticated: boolean;
  private userLogin: string;
  private isOnLoginPage: boolean;

  constructor(private loginService: LoginService,
              private cd: ChangeDetectorRef) {
    this.isOnLoginPage = RegExp('login').test(window.location.toString());
    this.userLogin = 'guest';
    loginService.GetUserInfo().subscribe(
      (user) => {
        this.isUserAuthenticated = loginService.IsAuthenticated();
        this.userLogin = user.login;
      },
      undefined,
      () => this.cd.markForCheck()
    );
  }

  public logout(): void {
    this.loginService.doLogout();
  }
}
