import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {LoginService} from './login.service';
import {LoaderBlockService} from '../common/loaderBlock/loader.service';

export interface User {
  readonly login: string;
  readonly password?: string;
  readonly token?: string;
}

@Component({
  selector: 'sg-login',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoginComponent {

  constructor(private loginService: LoginService,
              private loaderBlockService: LoaderBlockService) {
  }

  public doLogin(user: User): void {
    if (user.login && user.password) {

      this.loginService.doLogin(user).subscribe(
        () => undefined,
        (e) => console.log('error to login: ' + e),
        () => {
          this.loaderBlockService.Hide();
          location.href = '/#/courses'
        }
      )
    );
    }
}
}
