import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
  ApplicationRef, ChangeDetectorRef,
  NgModule
} from '@angular/core';
import {
  createNewHosts,
  createInputTransfer,
  removeNgStyles
} from '@angularclass/hmr';
import {
  RouterModule,
  PreloadAllModules
} from '@angular/router';

import {AppCommonModule} from './common/app-common.module';
import { LoginModule } from './login/login.module';
/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';

// Components
import { HomeComponent } from './home';
import { LoaderBlockComponent } from './common/loaderBlock/loader.component';
import { CoursesComponent } from './courses';
import { CourseToolboxComponent } from './courses/courseToolbox';
import { CourseSimpleComponent } from './courses/courseSimple';
import { NoContentComponent } from './no-content';

import '../styles/styles.scss';
import '../styles/headings.css';

// Servers
import { CourseService } from './course/course.service';
import {LoaderBlockService} from './common/loaderBlock/loader.service';

// Directives
import {СourseBorderDirective} from './courses/courses.directive';

// Pipes
import {CourseDurationPipe} from './course/course.duration.pipe';
import {CourseOrderByPipe} from './course/course.orderBy.pipe';
import {CourseSearchFilterPipe} from './course/course.searchFilter.pipe';

// Application wide providers
const APP_PROVIDERS: any = [
  ...APP_RESOLVER_PROVIDERS,
  AppState,
  ChangeDetectorRef,
  CourseService,
  LoaderBlockService
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    HomeComponent,
    CoursesComponent,
    CourseSimpleComponent,
    NoContentComponent,
    CourseToolboxComponent,
    LoaderBlockComponent,
    СourseBorderDirective,
    CourseDurationPipe,
    CourseOrderByPipe,
    CourseSearchFilterPipe

  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules }),
    AppCommonModule,
    LoginModule
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AppModule {

  constructor(
    public appRef: ApplicationRef,
    public appState: AppState
  ) {}

  public hmrOnInit(store: StoreType): void {
    if (!store || !store.state) {
      return;
    }
    console.log('HMR store', JSON.stringify(store, undefined, 2));
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues: any = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  public hmrOnDestroy(store: StoreType): void {
    const cmpLocation: any = this.appRef.components.map((cmp) => cmp.location.nativeElement);
    // save state
    const state: any = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues  = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  public hmrAfterDestroy(store: StoreType): void {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}
