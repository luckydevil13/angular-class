import {Injectable} from '@angular/core';
import {default as swal} from 'sweetalert2';

@Injectable()
export class DialogService {
  public confirm(title: string, message: string): Promise<string> {
    return swal({
      title,
      text: message,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'blue',
      cancelButtonColor: 'red',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    });
  };
}
