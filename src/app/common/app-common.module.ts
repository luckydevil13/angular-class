import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FooterComponent} from './footer/footer.component';
import {LogoComponent} from './header/logo/logo.component';
import {HeaderLoginComponent} from './header/login/login.component';
import {HeaderComponent} from './header/header.component';
import {BreadcrumbComponent} from './header/breadcrumb/breadcrumb.component';
import {DialogService} from './dialog.service';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ],
  declarations: [
    HeaderComponent,
    LogoComponent,
    BreadcrumbComponent,
    HeaderLoginComponent,
    FooterComponent
  ],
  providers: [DialogService]
})
export class AppCommonModule {
}
