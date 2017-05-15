import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginService} from './login.service';
import {LoginComponent} from './login.component';
import {AppCommonModule} from '../common/app-common.module';
import {FormsModule} from '@angular/forms';
import { ROUTES } from '../app.routes';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    AppCommonModule,
    FormsModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
  ],
  exports: [
    LoginComponent
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    LoginService
  ]
})
export class LoginModule {
}
