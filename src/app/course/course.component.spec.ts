import {
  DebugElement,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormControl, FormsModule} from '@angular/forms';
import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Rx';

import {CourseService} from './course.service';
import {CourseComponent} from './course.component';
import {Course} from './course.interface.Course';
import {INIT_COURSE} from '../reducers/course';

describe('CourseComponent', () => {
  let fixture: ComponentFixture<CourseComponent>;
  let component: CourseComponent;
  let course: Course;
  let element: DebugElement;
  let mockRouter: any;
  let mockRoute: any;
  let mockCourseService: any;
  let mockStore: any;

  beforeEach(() => {
    mockRouter = jasmine.createSpyObj('mockRouter', ['navigate']);
    mockRoute = {
      params: Observable.of({}),
    };
    mockCourseService = {
      getAuthors: jasmine.createSpy('mockCourseService.getAuthors').and.returnValue(Observable.of([])),
      getItemByID: jasmine.createSpy('mockCourseService.getItemByID').and.returnValue(Observable.of([])),
      authors: Observable.of([]),
      createCourse: jasmine.createSpy('mockCourseService.createCourse'),
      updateItem: jasmine.createSpy('mockCourseService.updateItem'),
    };
    course = <Course>{};
    mockStore = {
      dispatch: jasmine.createSpy('mockStore.dispatch'),
      select: jasmine.createSpy('mockStore.select').and.returnValue(Observable.of(course)),
    };
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [CourseComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {provide: Router, useValue: mockRouter},
        {provide: ActivatedRoute, useValue: mockRoute},
        {provide: Store, useValue: mockStore},
        {provide: CourseService, useValue: mockCourseService},
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement;
  });

  describe('ngOnInit()', () => {
    it('should ngOnInit populate allAuthors property', () => {
      component.ngOnInit();
      expect(component.allAuthors).toBeTruthy();
    });

    it('should calls getAuthors on ngOnInit', () => {
      component.ngOnInit();
      expect(mockCourseService.getAuthors).toHaveBeenCalled();
    });

    it('should dispatches INIT_COURSES action on ngOnInit', fakeAsync(() => {
      component.ngOnInit();
      tick();
      expect(mockStore.dispatch).toHaveBeenCalledWith({type: INIT_COURSE});
    }));
  });

  describe('Router', () => {
    it('should store courseId as currentCourse base url on router', fakeAsync(() => {
      const courseId: number = 11;
      const injectedRoute: any = fixture.debugElement.injector.get(ActivatedRoute);
      injectedRoute.params = Observable.of({id: courseId});
      component.ngOnInit();
      tick();
      expect(component.currentCourse).toEqual(courseId);
    }));
    it('should store course/ as currentCourse base on router', fakeAsync(() => {
      const courseId: any = undefined;
      const injectedRoute: any = fixture.debugElement.injector.get(ActivatedRoute);
      injectedRoute.params = Observable.of({id: courseId});
      component.ngOnInit();
      tick();
      expect(component.currentCourse).toEqual(undefined);
    }));
  });

  describe('addCourse()', () => {
    it('should  call appropriate courseService - createCourse', fakeAsync(() => {
      course = {
        ...course,
        id: 123,
      };
      component.addCourse(course);
      expect(mockCourseService.createCourse).toHaveBeenCalledWith(course);
    }));
  });

  describe('updateCourse()', () => {
    it('should  call appropriate courseService - updateItem', fakeAsync(() => {
      course = {
        ...course,
        id: 123,
      };
      component.updateCourse(course);
      expect(mockCourseService.updateItem).toHaveBeenCalledWith(course);
    }));
  });

  describe('doSubmit()', () => {
    it('should get form data and call createCourse() courseService call', fakeAsync(() => {
      const formCourse: FormControl = new FormControl({});
      formCourse.value.course = {
        ...course
      };
      component.doSubmit(formCourse);
      expect(mockCourseService.createCourse).toHaveBeenCalledWith(formCourse.value.course);
    }));

    it('should get form data and call createCourse() courseService call', fakeAsync(() => {
      component.currentCourse = 123;
      const formCourse: FormControl = new FormControl({});
      formCourse.value.course = {
        ...course,
        id: 123,
      };
      component.doSubmit(formCourse);
      expect(mockCourseService.updateItem).toHaveBeenCalledWith(formCourse.value.course);
    }));
  });
});
