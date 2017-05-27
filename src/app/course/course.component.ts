import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Course} from './course.interface.Course';
import {FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CourseService} from './course.service';
import {Author} from './authors/author.interface';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import {INIT_COURSE} from '../reducers/course';

@Component({
  selector: 'sg-course',
  encapsulation: ViewEncapsulation.Native,
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  public currentCourse: number;
  public course: Course = <Course>{};
  public allAuthors: Observable<Author[]>;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private courseService: CourseService,
              private store: Store<any>) {
    this.store.dispatch({type: INIT_COURSE});
  }

  public doSubmit(form: FormControl): void {
    console.log(form.value.course);
    if (this.currentCourse) {
      form.value.course.id = this.currentCourse;
      this.updateCourse(form.value.course);
    } else {
      this.addCourse(form.value.course);
    }
    this.router.navigate(['/courses']);
  }

  public addCourse(course: Course): Observable<any> {
    return this.courseService.createCourse(course);
  }

  public updateCourse(course: Course): Observable<any> {
    return this.courseService.updateItem(course);
  }

  public ngOnInit(): void {
    this.allAuthors = this.courseService.getAuthors();
    this.activatedRoute.params.subscribe((data) => {
      this.currentCourse = data['id,'] || data.id;
      console.log('current course: ' + this.currentCourse);
      this.courseService.getItemByID(this.currentCourse).subscribe( (course) => {
        this.course = course;
      });
    });
  }
}
