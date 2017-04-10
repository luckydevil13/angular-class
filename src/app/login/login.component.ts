import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {LoginService} from './login.service';
import {LoaderBlockService} from '../common/loader/loader.service';
import {User} from './login.interface.User';
import {Subscription} from 'rxjs';

@Component({
  selector: 'sg-login',
  encapsulation: ViewEncapsulation.Native,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  private loginServiceSubscription: Subscription;

  constructor(private loginService: LoginService,
              private loaderBlockService: LoaderBlockService) {
  }

  public doLogin(user: User): void {
    if (user.login && user.password) {
      this.loaderBlockService.show();
      this.loginServiceSubscription = this.loginService.doLogin(user).subscribe(
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

  public ngOnDestroy(): void {
    this.loginServiceSubscription.unsubscribe();
  }

}
