import {Injectable} from '@angular/core';
import {RequestOptionsArgs, RequestOptions, ConnectionBackend, Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {currentTokenName, LoginService} from '../../login/login.service';

@Injectable()
export class AuthorizedHttp extends Http {
  private header: Headers;
  private myReqOptions: RequestOptions;

  constructor(backend: ConnectionBackend,
              defaultOptions: RequestOptions,
              ) {
    super(backend, defaultOptions);
  }

  private setupHeaderToken(): void {
    const token: string = localStorage.getItem(currentTokenName);
    this.header = new Headers({Authorization: token});
    this.myReqOptions = new RequestOptions({headers: this.header});
  }

  public get(url: string, options?: RequestOptionsArgs): Observable<any> {
    this.setupHeaderToken();
    return super.get(url, this.myReqOptions);
  }

  public delete(url: string, options?: RequestOptionsArgs): Observable<any> {
    this.setupHeaderToken();
    return super.delete(url, this.myReqOptions);
  }

  public post(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
    this.setupHeaderToken();
    return super.post(url, body, this.myReqOptions);
  }

}
