import {Injectable} from '@angular/core';
import {RequestOptionsArgs, RequestOptions, ConnectionBackend, Http, Headers} from '@angular/http';

@Injectable()
export class AuthorizedHttp extends Http {
  private header: Headers;
  private options: RequestOptions;

  constructor(backend: ConnectionBackend,
              defaultOptions: RequestOptions) {
    super(backend, defaultOptions);
    this.header = new Headers({authorization: 'Something'});
    this.options = new RequestOptions({headers: this.header});
  }

  public get(url: string, options?: RequestOptionsArgs) {
    return super.get(url, this.options);
  }

  public delete(url: string, options?: RequestOptionsArgs) {
    return super.get(url, this.options);
  }

}

