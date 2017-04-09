import { Injectable } from '@angular/core';
import {ReplaySubject} from 'rxjs';

@Injectable()
export class LoaderBlockService {
  public display: ReplaySubject<boolean> = new ReplaySubject<boolean>(1, 1);

  public show(): void {
    this.display.next(true);
  }

  public hide(): void {
    this.display.next(false);
  }
}
