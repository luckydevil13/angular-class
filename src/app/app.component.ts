/*
 * Angular 2 decorators and services
 */
import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { AppState } from './app.service';

/*
 * App Component
 * Top Level Component
 */

@Component({
  selector: 'sg-app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  public appState: AppState;

  constructor(
    appState: AppState
  ) {
    this.appState = appState;
  }

  public ngOnInit(): void {
    console.log('Initial App State', this.appState.state);
  }

}
