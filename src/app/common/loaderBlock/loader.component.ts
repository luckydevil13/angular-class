import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
// import {LoginService} from "../../login/login.service";

@Component({
  selector: 'sg-loadblock',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'loader.component.html',
  styleUrls: ['loader.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderBlockComponent {
  public show: boolean;

  constructor() {
    this.show = false;
  }

  // constructor(private loginService: LoginService,
  //             private cd: ChangeDetectorRef) {
  //
  //   loginService.GetUserInfo().subscribe(
  //     (user) => {
  //       this.isUserAuthenticated = loginService.IsAuthenticated();
  //     },
  //     undefined,
  //     () => this.cd.markForCheck()
  //   );
  // }

}
