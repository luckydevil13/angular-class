import {Injectable} from '@angular/core';
import {RequestOptionsArgs, RequestOptions, ConnectionBackend, Http, Headers, RequestMethod} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {currentTokenName, LoginService} from '../../login/login.service';

@Injectable()
export class AuthorizedHttp extends Http {
  private header: Headers;

  constructor(backend: ConnectionBackend,
              defaultOptions: RequestOptions,
              ) {
    super(backend, defaultOptions);
  }

  private setupHeaderToken(options: RequestOptionsArgs): RequestOptionsArgs {
    const token: string = localStorage.getItem(currentTokenName);
    if (!options || !options.headers) {
      options.headers = new Headers();
    }
    options.headers.set('Authorization', token );
    return options;
  }

  public get(url: string, options: RequestOptionsArgs = {}): Observable<any> {
    options = this.setupHeaderToken(options);
    return super.get(url, options);
  }

  public delete(url: string, options: RequestOptionsArgs = {}): Observable<any> {
    options = this.setupHeaderToken(options);
    return super.delete(url, options);
  }

  public post(url: string, body: any, options: RequestOptionsArgs = {}): Observable<any> {
    options = this.setupHeaderToken(options);
    return super.post(url, body, options);
  }

  public put(url: string, body: any, options: RequestOptionsArgs = {}): Observable<any> {
    options = this.setupHeaderToken(options);
    return super.put(url, body, options);
  }
}
