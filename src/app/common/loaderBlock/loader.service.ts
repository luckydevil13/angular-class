import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {LoaderBlockComponent} from './loader.component';

@Injectable()
export class LoaderBlockService {

  public Show(): void {
    LoaderBlockComponent.show = true;
 }

 public Hide(): void {
   LoaderBlockComponent.show = false;
 }
}
