import {Injectable} from '@angular/core';
import {default as swal} from 'sweetalert2';
import {Observable} from "rxjs";

@Injectable()
export class DialogService {

  public confirm(title: string, message: string): Observable<any> {
    return Observable.fromPromise(swal({
      title,
      text: message,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'blue',
      cancelButtonColor: 'red',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }))

  }
}
