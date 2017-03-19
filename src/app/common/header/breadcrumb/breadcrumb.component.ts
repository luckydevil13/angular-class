import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {LoginService} from '../../../login/login.service';

@Component({
  selector: 'sg-breadcrumb',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'breadcrumb.component.html'
})
export class BreadcrumbComponent implements OnInit {

  constructor() {
    return this;
  }

  public ngOnInit(): void {
    return;
  }
}
