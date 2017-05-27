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
import {Author} from './authors/author.interface';

describe(`CourseService`, () => {
  const courseListMock: string = `
      [
        {
          "id": 5688,
          "name": "ex laborum est cupidatat",
          "description": "fugiat sint eu Lorem culpa tempor nisi nostrud nisi.",
          "isTopRated": false,
          "date": "2017-11-18T09:06:11.000Z",
          "authors": [
            {
              "id": 9364,
              "firstName": "Berger",
              "lastName": "Powell"
            },
            {
              "id": 3477,
              "firstName": "Daugherty",
              "lastName": "Guy"
            },
            {
              "id": 2005,
              "firstName": "Dotson",
              "lastName": "Hernandez"
            }
          ],
          "length": 171
        },
        {
          "id": 5110,
          "name": "voluptate tempor tempor sit",
          "description": "Est veniam cupidatat culpa quis in. Nulla dolor duis culpa eiusmod duis ea irure laboris molli.",
          "isTopRated": true,
          "date": "2017-11-05T23:17:58.000Z",
          "authors": [
            {
              "id": 8781,
              "firstName": "Carson",
              "lastName": "Suarez"
            },
            {
              "id": 3399,
              "firstName": "Schmidt",
              "lastName": "Cooke"
            }
          ],
          "length": 59
        }]`;

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

  describe('getList()', () => {
    it('should retrieve all courses', inject([CourseService, MockBackend], fakeAsync((courseService: CourseService, mockBackend: MockBackend) => {
        mockBackend.connections.subscribe((c) => {
          expect(c.request.url).toBe('http://localhost:3004/courses?');
          const response: ResponseOptions = new ResponseOptions(
            {
              body: courseListMock,
            });
          c.mockRespond(new Response(response));
        });

        const res: Course[] = [];
        courseService.getList(0).subscribe((course) => {
          res.push(course);
        });
        tick();
        expect(res[0].title).toBe('ex laborum est cupidatat');
        expect(res[0].topRated).toBe(false);
        expect(res[1].date instanceof Date).toBe(true);
        expect(res[1].topRated).toBe(true);
      }))
    );

    it('should make request with param start=2', inject([CourseService, MockBackend], fakeAsync((courseService: CourseService, mockBackend: MockBackend) => {
        mockBackend.connections.subscribe((c) => {
          expect(c.request.url).toBe('http://localhost:3004/courses?start=2');
          const response: ResponseOptions = new ResponseOptions(
            {body: courseListMock}
          );
          c.mockRespond(new Response(response));
        });
        courseService.getList(2).subscribe((course) => {
          return;
        });
      }))
    );

    it('should make request with param count=5', inject([CourseService, MockBackend], fakeAsync((courseService: CourseService, mockBackend: MockBackend) => {
        mockBackend.connections.subscribe((c) => {
          expect(c.request.url).toBe('http://localhost:3004/courses?count=5');
          const response: ResponseOptions = new ResponseOptions(
            {body: courseListMock }
          );
          c.mockRespond(new Response(response));
        });
        courseService.getList(0, 5).subscribe((course) => {
          return;
        });
      }))
    );
  });

  describe('createCourse()', () => {
    it('should course object from backend after post request', inject([CourseService, MockBackend], fakeAsync((courseService: CourseService, mockBackend: MockBackend) => {
        mockBackend.connections.subscribe((c) => {
          expect(c.request.url).toBe('http://localhost:3004/courses/');
          const response: ResponseOptions = new ResponseOptions(
            {
              body: `
  {
    "id": 5688,
    "name": "ex laborum est cupidatat",
    "description": "fugiat sint eu Lorem culpa tempor nisi nostrud nisi.",
    "isTopRated": false,
    "date": "2017-11-18T09:06:11.000Z",
    "authors": [
      {
        "id": 9364,
        "firstName": "Berger",
        "lastName": "Powell"
      },
      {
        "id": 3477,
        "firstName": "Daugherty",
        "lastName": "Guy"
      },
      {
        "id": 2005,
        "firstName": "Dotson",
        "lastName": "Hernandez"
      }
    ],
    "length": 171
  }
  `
            });
          c.mockRespond(new Response(response));
        });

        let res: Response;
        const newCourse: Course = {
          title: 'ex laborum est cupidatat',
          date: new Date('2017-11-18T09:06:11.000Z'),
          topRated: false,
          duration: 171,
          description: 'fugiat sint eu Lorem culpa tempor nisi nostrud nisi.',
          authors: [
            {
              id: 9364,
              firstName: 'Berger',
              lastName: 'Powell'
            },
            {
              id: 3477,
              firstName: 'Daugherty',
              lastName: 'Guy'
            },
            {
              id: 2005,
              firstName: 'Dotson',
              lastName: 'Hernandez'
            }
          ]
        };
        courseService.createCourse(newCourse).subscribe((course) => {
          res = course;
        });
        tick();
        const courseObj: any = JSON.parse(res.text());
        expect(courseObj.name).toBe('ex laborum est cupidatat');
        expect(courseObj.isTopRated).toBe(false);
        expect(courseObj.length).toBe(171);
        expect(courseObj.id > 0).toBe(true);
      }))
    );
  });

  describe('getItemByID()', () => {
    it('should return course if exists', inject([CourseService, MockBackend], fakeAsync((courseService: CourseService, mockBackend: MockBackend) => {
        mockBackend.connections.subscribe((c) => {
          expect(c.request.url).toBe('http://localhost:3004/courses/123');
          const response: ResponseOptions = new ResponseOptions(
            {
              body: `
  {
    "id": 123,
    "name": "ex laborum est cupidatat",
    "description": "fugiat sint eu Lorem culpa tempor nisi nostrud nisi.",
    "isTopRated": false,
    "date": "2017-11-18T09:06:11.000Z",
    "authors": [],
    "length": 171
  }
  `
            });
          c.mockRespond(new Response(response));
        });

        let res: Course;
        courseService.getItemByID(123).subscribe((course) => {
          res = course;
        });
        tick();
        expect(res.title).toBe('ex laborum est cupidatat');
        expect(res.topRated).toBe(false);
        expect(res.id).toBe(123);
        expect(res.date instanceof Date).toBe(true);
      }))
    );
  });

  describe('updateItem()', () => {
    it('should update course', inject([CourseService, MockBackend], fakeAsync((courseService: CourseService, mockBackend: MockBackend) => {
        mockBackend.connections.subscribe((c) => {
          expect(c.request.url).toBe('http://localhost:3004/courses/123');
          const response: ResponseOptions = new ResponseOptions(
            {
              body: `
  {
    "id": 123,
    "name": "TEST",
    "description": "fugiat sint eu Lorem culpa tempor nisi nostrud nisi.",
    "isTopRated": false,
    "date": "2017-11-18T09:06:11.000Z",
    "authors": [],
    "length": 171
  }
  `
            });
          c.mockRespond(new Response(response));
        });

        let res: Course;
        const updatedCourse: Course = {
          id: 123,
          title: 'TEST',
          date: new Date('2017-11-18T09:06:11.000Z'),
          topRated: false,
          duration: 171,
          description: 'fugiat sint eu Lorem culpa tempor nisi nostrud nisi.',
          authors: []
        };
        courseService.updateItem(updatedCourse).subscribe((course) => {
          res = course;
        });
        tick();
        expect(res.title).toBe('TEST');
        expect(res.topRated).toBe(false);
        expect(res.id).toBe(123);
        expect(res.date instanceof Date).toBe(true);
      }))
    );
  });

  describe('removeItem()', () => {
    it('should remove course', inject([CourseService, MockBackend], fakeAsync((courseService: CourseService, mockBackend: MockBackend) => {
        mockBackend.connections.subscribe((c) => {
          expect(c.request.url).toBe('http://localhost:3004/courses/123');
          const response: ResponseOptions = new ResponseOptions(
            {
              body: '{}'
            });
          c.mockRespond(new Response(response));
        });

        let res: any;
        const removedCourse: Course = {
          id: 123,
          title: 'TEST',
          date: new Date(),
          topRated: false,
          duration: 171,
          description: 'fugiat sint eu Lorem culpa tempor nisi nostrud nisi.',
          authors: []
        };
        courseService.removeItem(removedCourse).subscribe((answer) => {
          res = answer;
        });
        tick();
        expect(res.text()).toBe('{}');
      }))
    );
  });

  describe('getAuthors()', () => {
    it('should return array of authors', inject([CourseService, MockBackend], fakeAsync((courseService: CourseService, mockBackend: MockBackend) => {
        mockBackend.connections.subscribe((c) => {
          expect(c.request.url).toBe('http://localhost:3004/authors');
          const response: ResponseOptions = new ResponseOptions(
            {
              body: `
              [
                  {
                    "firstName": "Maddox",
                    "lastName": "Diaz",
                    "id": 21
                  },
                  {
                    "firstName": "Lola",
                    "lastName": "Glass",
                    "id": 57
                  }
                ]
  `
            });
          c.mockRespond(new Response(response));
        });

        let authors: any;
        courseService.getAuthors().subscribe((res) => {
          authors = res;
        });
        tick();
        expect(authors.length).toBe(2);
        expect(authors[0].firstName).toBe('Maddox');
      }))
    );
  });

  describe('curentSearchFilter()', () => {
    it('should make request filter', inject([CourseService, MockBackend], fakeAsync((courseService: CourseService, mockBackend: MockBackend) => {
        courseService.curentSearchFilter('new filter');
        mockBackend.connections.subscribe((c) => {
          expect(c.request.url).toBe('http://localhost:3004/courses?q=new+filter');
          const response: ResponseOptions = new ResponseOptions(
            {body: courseListMock}
          );
          c.mockRespond(new Response(response));
        });
        courseService.getList(0).subscribe((course) => {
          return;
        });
      }))
    );
  });
});
