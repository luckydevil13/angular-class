import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FooterComponent} from './footer/footer.component';
import {LogoComponent} from './header/logo/logo.component';
import {HeaderLoginComponent} from './header/login/login.component';
import {HeaderComponent} from './header/header.component';
import {BreadcrumbComponent} from './header/breadcrumb/breadcrumb.component';
import {DialogService} from './dialog.service';
import {LoaderBlockComponent} from './loaderBlock/loader.component';
import {LoaderBlockService} from './loaderBlock/loader.service';




@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    LoaderBlockComponent
  ],
  declarations: [
    HeaderComponent,
    LogoComponent,
    BreadcrumbComponent,
    HeaderLoginComponent,
    FooterComponent,
    LoaderBlockComponent
  ],
  providers: [DialogService, LoaderBlockService]
})
export class AppCommonModule {
}
