import {fakeAsync, inject, TestBed, tick} from '@angular/core/testing';
import {MockBackend} from '@angular/http/testing';
import {
  Response,
  ResponseOptions,
  HttpModule,
  ConnectionBackend,
  BaseRequestOptions, Http,
} from '@angular/http';

import {CourseService} from './course.service';
import {AuthorizedHttp} from '../common/services/authorized-http.service';
import {StoreModule} from '@ngrx/store';
import {authReducer} from '../reducers/auth';
import {coursesReducer} from '../reducers/courses';
import {courseReducer} from '../reducers/course';
import {Observable} from 'rxjs/Observable';
import {Course} from './course.interface.Course';

describe(`CourseService`, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule,
        StoreModule.provideStore({
          auth: authReducer,
          courses: coursesReducer,
          course: courseReducer
        }),
      ],
      providers: [CourseService,
        {
          provide: AuthorizedHttp,
          useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
        {provide: MockBackend, useClass: MockBackend},
        {provide: BaseRequestOptions, useClass: BaseRequestOptions}
      ]
    });
  });

  it('should service be created', inject([CourseService], (service: CourseService) => {
    expect(service).toBeTruthy();
  }));

  describe('getList', () => {
    it('should retrieve all search results', inject([CourseService, MockBackend], fakeAsync((courseService: CourseService, mockBackend: MockBackend) => {
        mockBackend.connections.subscribe((c) => {
          expect(c.request.url).toBe('http://localhost:3004/courses?');
          const response: ResponseOptions = new ResponseOptions({body: '[{"name": "John Elway"}, {"name": "Gary Kubiak"}]'});
          c.mockRespond(new Response(response));
        });

        const res: any = {};
        courseService.getList(0).subscribe((course) => {
          console.log(course);
          /* tslint:disable no-debugger */
          debugger;
          // res = course;
        });
        tick();
        expect(res[0].name).toBe('John Elway');
      }))
    );
  });
});
