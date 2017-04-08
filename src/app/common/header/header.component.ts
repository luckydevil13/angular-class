import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {LoginService} from '../../login/login.service';

@Component({
  selector: 'sg-header',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  constructor(private loginService: LoginService) {
  }

}
