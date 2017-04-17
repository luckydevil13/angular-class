import {Injectable} from '@angular/core';
import {Course} from './course.interface.Course';
import {AuthorizedHttp} from '../common/services/authorized-http.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class CourseService {
  private urlEndPoint: string = ENV === 'development' ? 'http://localhost:3004/courses' : 'http://server.com/courses';
  private searchFilter: string;

  constructor(private http: AuthorizedHttp) {}

  private mapResponseShape(item: any): Course {
    return {
      title: item.name,
      date: new Date(item.date),
      topRated: item.isTopRated,
      duration: item.length,
      description: item.description,
      authors: item.authors
    };
  }

  public getList(start: number, count?: number): Observable<Course> {
    const reqURL: string = `${this.urlEndPoint}`;
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
      .map((courses) => courses
        .map((item) => {
          return this.mapResponseShape(item);
        }))
      .switch();
  }

  public createCourse(course: Course): void {
    return;
  }

  public getItemByID(id: number): void {
    return;
  }

  public updateItem(course: Course): void {
    return;
  }

  public removeItem(course: Course): Observable<Response> {
    const reqURL: string = `${this.urlEndPoint}/${course.id}`;
    return this.http.delete(reqURL);
  }

  public curentSearchFilter(value?: string): void {
    if (value !== undefined) {
      this.searchFilter = value;
    }
  }
}
