import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation} from '@angular/core';
import {LoginService} from '../../../login/login.service';

@Component({
  selector: 'sg-breadcrumb',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './breadcrumb.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbComponent {
  private isUserAuthenticated: boolean;

  constructor(private loginService: LoginService,
              private cd: ChangeDetectorRef) {
    loginService.GetUserInfo().subscribe(
      (user) => {
        this.isUserAuthenticated = loginService.IsAuthenticated();
      },
      undefined,
      () => this.cd.markForCheck()
    );
  }

}
