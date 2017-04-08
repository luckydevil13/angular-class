import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {LoginService} from '../login/login.service';

@Component({
  selector: 'sg-home',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

  constructor(private loginService: LoginService) {
  }

}
