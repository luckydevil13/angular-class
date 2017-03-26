import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {LoginService} from '../../login/login.service';

@Component({
  selector: 'sg-header',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  constructor(private loginService: LoginService) {
  }

  public ngOnInit(): void {
    return;
  }
}
