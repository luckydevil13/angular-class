import {Injectable} from '@angular/core';
import {Course} from './course.interface.Course';
import {Http} from '@angular/http';
import {AuthorizedHttp} from '../common/services/authorized-http.service';

@Injectable()
export class CourseService {
  public urlEndPoint: string = ENV === 'development' ? 'http://localhost:3004/courses' : 'http://server.com/courses';
  private searchFilter: string;

  constructor(private http: Http) {
  }

  public getList(start: number, count?: number): any {
    let reqURL: string;
    if (!count) {
      reqURL = `${this.urlEndPoint}`;
      if (this.searchFilter) {
        reqURL = reqURL + `?q=${this.searchFilter}`;
      }

    } else {
      reqURL = `${this.urlEndPoint}?start=${start}&count=${count}`;
      if (this.searchFilter) {
        reqURL = reqURL + `&q=${this.searchFilter}`;
      }
    }
    return this.http.get(reqURL)
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

  public removeItem(course: Course): any {
    const reqURL: string = `${this.urlEndPoint}/${course.id}`;
    return this.http.delete(reqURL);
  }

  public curentSearchFilter(value?: string): void {
    if (value !== undefined) {
      this.searchFilter = value;
    }
  }

  private mapResponseShape(item: any): Course {
    item.date = new Date(item.date);
    item.title = item.name;
    delete item.name;
    item.topRated = item.isTopRated;
    delete item.isTopRated;
    item.duration = item.length;
    delete item.length;
    return item;
  }
}
