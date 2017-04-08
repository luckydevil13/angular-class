import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {LoginService} from './login.service';
import {LoaderBlockService} from '../common/loader/loader.service';
import {User} from './login.interface.User';

@Component({
  selector: 'sg-login',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

  constructor(private loginService: LoginService,
              private loaderBlockService: LoaderBlockService) {
  }

  public doLogin(user: User): void {
    if (user.login && user.password) {

      this.loaderBlockService.show();

      this.loginService.doLogin(user).subscribe(
        () => undefined,
        () => undefined,
        () => {
          setTimeout(
            () => {
              this.loaderBlockService.hide();
              location.href = '/#/courses';
            },
            500);
        }
      );
    }
  }
}
