import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
  NgZone
} from '@angular/core';
import {DialogService} from '../../common/dialog.service';
import {LoaderBlockService} from '../../common/loader/loader.service';
import {Course} from '../../course/course.interface.Course';
import {Subscription} from 'rxjs';

@Component({
  selector: 'sg-simple-course',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './course-simple.component.html',
  styleUrls: [
    './course-simple.component.css',
    '../../common/dialog.service.css'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseSimpleComponent {
  @Input() public course: Course;
  @Output() public notifyParent: EventEmitter<Object> = new EventEmitter();
  private stopTimer: number;
  private startTimer: number;
  private subOnUnstable: Subscription;
  private subOnStable: Subscription;
  private confirmSubscribtion: Subscription;

  constructor(private dialogService: DialogService,
              private ngZone: NgZone,
              private loaderBlockService: LoaderBlockService) {
    this.subOnUnstable = this.ngZone.onUnstable.subscribe(this.onZoneUnstable.bind(this));
    this.subOnStable = this.ngZone.onStable.subscribe(this.onZoneStable.bind(this));
  }

  public deleteCourse(course: Course): void {
    this.loaderBlockService.show();

    this.confirmSubscribtion = this.dialogService.confirm('Delete ' + course.title, 'Do you really want to delete this course?').subscribe(
        () => {
          this.notifyParent.emit({action: 'delete', course});
        },
      () => undefined,
      () => this.loaderBlockService.hide(),
    );
  }

  private onZoneUnstable(): void {
    this.startTimer = performance.now();
  }

  private onZoneStable(): void {
    this.stopTimer = performance.now();
    if (this.startTimer) {
      // console.log('= in ' + this.constructor.name + ' =');
      // console.log('unStable -> Stable: ' + Math.floor((this.stopTimer - this.startTimer ) * 1000) / 1000 + ' ms');
    }
  }

  public ngOnDestroy(): void {
    this.subOnUnstable.unsubscribe();
    this.subOnStable.unsubscribe();
    if (this.confirmSubscribtion) {
      this.confirmSubscribtion.unsubscribe();
    }
  }

}
