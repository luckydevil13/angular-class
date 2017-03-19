import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {LoginService} from '../login/login.service';

@Component({
  selector: 'sg-home',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {

  constructor(private loginService: LoginService) {
  }

  public ngOnInit(): void {
    return;
  }
}
