import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {Http, HttpModule, RequestOptions, XHRBackend} from '@angular/http';
import {NgxPaginationModule} from 'ngx-pagination';

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
import { LoaderBlockComponent } from './common/loader/loader.component';
import { CoursesComponent } from './courses';
import { CourseToolboxComponent } from './courses/course-toolbox';
import { CourseSimpleComponent } from './courses/course-simple';
import { NoContentComponent } from './no-content';
import { CourseComponent } from './course';
import { CourseDateComponent } from './course/date/date.component';
import { CourseAuthorsComponent } from './course/authors/authors.component';
import { CourseDurationComponent } from './course/duration/duration.component';

import '../styles/styles.scss';
import '../styles/headings.css';

// Services
import { CourseService } from './course/course.service';
import {LoaderBlockService} from './common/loader/loader.service';
import {AuthorizedHttp} from './common/services/authorized-http.service';
import {AuthGuard} from './app.auth.guard';

// Directives
import {СourseBorderDirective} from './courses/courses.directive';
import {ValidationDateDirective} from './course/course.validation-date.directive';
import {ValidationDurationDirective} from './course/course.validation-duration.directive';
import {ValidationAuthorsDirective} from './course/course.validation-author.directive';

// Pipes
import {CourseDurationPipe} from './course/course.pipe.duration';

// Store
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { authReducer } from './reducers/auth';
import { coursesReducer } from './reducers/courses';
import { courseReducer } from './reducers/course';

// Application wide providers
const APP_PROVIDERS: any = [
  ...APP_RESOLVER_PROVIDERS,
  AppState,
  ChangeDetectorRef,
  CourseService,
  LoaderBlockService,
  { provide: AuthorizedHttp,
    useFactory: (
      backend: XHRBackend,
      defaultOptions: RequestOptions) =>
      new AuthorizedHttp(backend, defaultOptions),
    deps: [XHRBackend, RequestOptions]
  },
  AuthGuard
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
    CourseComponent,
    CourseDateComponent,
    CourseAuthorsComponent,
    CourseDurationComponent,
    ValidationDateDirective,
    ValidationDurationDirective,
    ValidationAuthorsDirective
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    AppCommonModule,
    LoginModule,
    NgxPaginationModule,
    StoreModule.provideStore({
      auth: authReducer,
      courses: coursesReducer,
      course: courseReducer
    }),
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 5
    }),
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
      const restoreInputValues: any = store.restoreInputValues;
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
