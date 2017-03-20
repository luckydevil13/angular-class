import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginService} from './login.service';
import {LoginComponent} from './login.component';
import {AppCommonModule} from '../common/app-common.module';

@NgModule({
  imports: [
    CommonModule,
    AppCommonModule
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
