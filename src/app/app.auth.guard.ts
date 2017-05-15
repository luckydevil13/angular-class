import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {currentTokenName} from './login/login.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }
  public canActivate(): boolean {
    if (localStorage.getItem(currentTokenName)) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
