import {Injectable} from '@angular/core';
import {Course} from './course.interface.Course';
import {AuthorizedHttp} from '../common/services/authorized-http.service';
import {Observable} from 'rxjs/Observable';
import {Author} from './authors/author.interface';
import {Store} from '@ngrx/store';

import {
  COURSES_LOADED,
  INIT_COURSES,
} from '../reducers/courses';

import {
  COURSE_LOADED,
  COURSE_SAVED
} from '../reducers/course';

@Injectable()
export class CourseService {
  private urlEndPoint: string = ENV === 'development' ? 'http://localhost:3004' : 'http://server.com';
  private searchFilter: string;
  private courses: Observable<Course>;

  constructor(private http: AuthorizedHttp,
              private store: Store<any>) {
    this.store.dispatch({type: INIT_COURSES});
  }

  private mapResponseShape(item: any): Course {
    return {
      title: item.name,
      date: new Date(item.date),
      topRated: item.isTopRated,
      duration: item.length,
      description: item.description,
      authors: item.authors,
      id: item.id
    };
  }

  private mapMyModelToCourse(course: Course): any {
    return {
      name: course.title,
      date: new Date(course.date).toISOString(),
      isTopRated: course.topRated,
      length: course.duration,
      description: course.description,
      authors: course.authors,
      id: course.id
    };
  }

  public getList(start: number, count?: number): Observable<Course> {
    const reqURL: string = `${this.urlEndPoint}/courses`;
    const params: URLSearchParams = new URLSearchParams();
    if (start) {
      params.set('start', `${start}`);
    }
    if (count) {
      params.set('count', `${count}`);
    }
    if (this.searchFilter) {
      params.set('q', this.searchFilter);
    }

    return this.http.get(reqURL + '?' + params.toString())
      .map((res) => res.json())
      .map(
        (courses) => courses
          .map((item) => {
            return this.mapResponseShape(item);
          })
      ).map((data) => {
        this.store.dispatch({
          type: COURSES_LOADED,
          payload: data
        });
        return data;
      })
      .switch();
  }

  public createCourse(course: Course): Observable<any> {
    return this.http.post(this.urlEndPoint + `/courses/`, course);
  }

  public getItemByID(id: number): Observable<Course> {
    return this.http.get(this.urlEndPoint + `/courses/${id}`)
      .map((res) => res.json())
      .map((item) => {
        this.store.dispatch({ type: COURSE_LOADED, payload: this.mapResponseShape(item) });
        return this.mapResponseShape(item);
      });
  }

  public updateItem(course: Course): Observable<any> {
    return this.http.put(`${this.urlEndPoint}/courses/${course.id}`, JSON.stringify(this.mapMyModelToCourse(course)))
      .map((res) => {
        this.store.dispatch({ type: COURSE_SAVED, payload: course });
        console.log(res.json());
      });
  }

  public removeItem(course: Course): Observable<Response> {
    const reqURL: string = `${this.urlEndPoint}/courses/${course.id}`;
    return this.http.delete(reqURL);
  }

  public curentSearchFilter(value?: string): void {
    if (value !== undefined) {
      this.searchFilter = value;
    }
  }

  public getAuthors(): Observable<Author[]> {
    return this.http.get(this.urlEndPoint + '/authors')
      .map((res) => res.json());
  }
}
