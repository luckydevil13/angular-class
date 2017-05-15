import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, OnDestroy, OnInit,
  ViewEncapsulation
} from '@angular/core';
import {LoginService} from '../../../login/login.service';
import {Subscription} from 'rxjs';
import {User} from '../../../login/login.interface.User';
import {Router} from '@angular/router';

@Component({
  selector: 'sg-header-login',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderLoginComponent implements OnDestroy, OnInit {
  private user: User = <User>{};
  private isOnLoginPage: boolean;
  private loginServiceSubscription: Subscription;

  constructor(public loginService: LoginService,
              private cd: ChangeDetectorRef,
              private router: Router) {
  }

  public ngOnInit(): void {
    this.isOnLoginPage = RegExp('login').test(window.location.toString());
    this.loginServiceSubscription = this.loginService.getUserInfo().subscribe(
      (user) => {
        this.user = user;
        this.cd.markForCheck();
      }
    );
  }

  public logout(): void {
    this.user = <User>{};
    this.loginService.doLogout();
    this.router.navigate(['/login']);
    this.cd.markForCheck();
  }

  public ngOnDestroy(): void {
    if (this.loginServiceSubscription) {
      this.loginServiceSubscription.unsubscribe();
    }
  }
}
