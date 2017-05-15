import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, ViewEncapsulation} from '@angular/core';
import {LoginService} from './login.service';
import {LoaderBlockService} from '../common/loader/loader.service';
import {Subscription} from 'rxjs';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

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
              private cd: ChangeDetectorRef,
              private router: Router) {
  }

  public doLogin(form: NgForm): void {
    this.loginError = undefined;
    this.loaderBlockService.show();
    this.loginServiceSubscription = this.loginService.doLogin(form.value).subscribe(
      undefined,
      (err) => {
        this.loginError = err.statusText;
        this.loaderBlockService.hide();
        this.cd.markForCheck();
      },
      () => {
        this.loaderBlockService.hide();
        this.router.navigate(['/courses']);
      }
    );
  }

  public ngOnDestroy(): void {
    if (this.loginServiceSubscription) {
      this.loginServiceSubscription.unsubscribe();
    }
  }
}
