import { Injectable } from '@angular/core';
import {ReplaySubject} from 'rxjs';

@Injectable()
export class LoaderBlockService {
  public state: boolean;
  public display: ReplaySubject<boolean> = new ReplaySubject<boolean>(1, 1);

  public show(): void {
    this.state = true;
    this.display.next(true);
  }

  public hide(): void {
    this.state = false;
    this.display.next(false);
  }
}
