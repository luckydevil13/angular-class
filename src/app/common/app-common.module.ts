import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FooterComponent} from './footer/footer.component';
import {LogoComponent} from './header/logo/logo.component';
import {HeaderLoginComponent} from './header/login/login.component';
import {HeaderComponent} from './header/header.component';
import {BreadcrumbComponent} from './header/breadcrumb/breadcrumb.component';
import {DialogService} from './dialog.service';
import {FormsModule} from '@angular/forms';
import { ROUTES } from '../app.routes';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
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
