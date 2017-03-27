import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class LoaderBlockService {
  public show: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public Show(): void {
    this.show.next(true);
  }

  public Hide(): void {
    this.show.next(false);
  }
}
