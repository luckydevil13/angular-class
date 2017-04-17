import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, ViewEncapsulation} from '@angular/core';
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
export class LoginComponent implements OnDestroy {
  private loginServiceSubscription: Subscription;
  private loginError: string;

  constructor(private loginService: LoginService,
              private loaderBlockService: LoaderBlockService,
              private cd: ChangeDetectorRef) {
  }

  public doLogin(user: User): void {
    this.loginError = undefined;
    if (user.login && user.password) {
      this.loaderBlockService.show();
      this.loginServiceSubscription = this.loginService.doLogin(user).subscribe(
        undefined,
        (err) => {
          this.loginError = err.statusText;
          this.loaderBlockService.hide();
          this.cd.markForCheck();
          },
        () => {
          this.loaderBlockService.hide();
          location.href = '/#/courses';
        }
      );
    }
  }

  public ngOnDestroy(): void {
    if (this.loginServiceSubscription) {
      this.loginServiceSubscription.unsubscribe();
    }
  }
}
