import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class LoaderBlockService {
  public display: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public show(): void {
    this.display.next(true);
  }

  public hide(): void {
    this.display.next(false);
  }
}
