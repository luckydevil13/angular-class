import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation} from '@angular/core';
import {LoginService} from '../../../login/login.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'sg-breadcrumb',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './breadcrumb.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbComponent {
  private isUserAuthenticated: boolean;
  private userInfoSubscription: Subscription;

  constructor(private loginService: LoginService,
              private cd: ChangeDetectorRef) {
    this.userInfoSubscription = loginService.GetUserInfo().subscribe(
      (user) => {
        this.isUserAuthenticated = loginService.IsAuthenticated();
      },
      undefined,
      () => this.cd.markForCheck()
    );
  }

  public ngOnDestroy(): void {
    this.userInfoSubscription.unsubscribe();
  }

}
