import {Injectable} from '@angular/core';
import {Course} from './course.interface.Course';
import {AuthorizedHttp} from '../common/services/authorized-http.service';
import {Observable} from 'rxjs/Observable';
import {Author} from './authors/author.interface';

@Injectable()
export class CourseService {
  private urlEndPoint: string = ENV === 'development' ? 'http://localhost:3004' : 'http://server.com';
  private searchFilter: string;

  constructor(private http: AuthorizedHttp) {}

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
    const reqURL: string = `${this.urlEndPoint}/courses/${course.id}`;
    return this.http.delete(reqURL);
  }

  public curentSearchFilter(value?: string): void {
    if (value !== undefined) {
      this.searchFilter = value;
    }
  }

  public getAuthors(): Observable<Author> {
    return this.http.get(this.urlEndPoint + '/authors', '')
      .map((res) => res.json());
  }
}
