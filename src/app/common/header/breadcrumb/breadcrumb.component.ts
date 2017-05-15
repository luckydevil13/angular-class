import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {LoginService} from '../../../login/login.service';
import {ActivatedRoute} from '@angular/router';
import {CourseService} from '../../../course/course.service';

@Component({
  selector: 'sg-breadcrumb',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './breadcrumb.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbComponent implements OnInit {
  private isOnLoginPage: boolean;
  private currentCourseName: string;

  constructor(public loginService: LoginService,
              private cd: ChangeDetectorRef,
              private route: ActivatedRoute,
              private courseService: CourseService) {
  }

  public ngOnInit(): void {
    this.isOnLoginPage = RegExp('login').test(window.location.toString());
    this.route.params.subscribe((data) => {
     this.courseService.getItemByID(data['id,']).subscribe( (course) => {
       this.currentCourseName = course.title;
       this.cd.markForCheck();
     });
    });
  }
}
