import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
  NgZone
} from '@angular/core';
import {Course} from '../../course';
import {DialogService} from '../../common/dialog.service';

@Component({
  selector: 'sg-simple-course-no-on-push',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'courseSimple.notOnPush.component.html',
  styleUrls: [
    'courseSimple.component.css',
    '../../common/dialog.service.css'
  ],
})
export class CourseSimpleNotOnPushComponent{
  @Input() public course: Course;
  @Output() public notifyParent: EventEmitter<any> = new EventEmitter();
  private stopTimer: number;
  private startTimer: number;
  private subOnUnstable: any;
  private subOnStable: any;

  constructor(private dialogService: DialogService,
              private ngZone: NgZone
  ) {
    this.subOnUnstable = this.ngZone.onUnstable.subscribe(this.onZoneUnstable.bind(this));
    this.subOnStable = this.ngZone.onStable.subscribe(this.onZoneStable.bind(this));
  }

  public lastchange(): Date {
    return new Date();
  }

  public deleteCourse(course: Course): void {

    // due affected parent component profiling
    // this.dialogService.confirm('Delete ' + course.title, 'Do you really want to delete this course?').subscribe(
    //   () => this.notifyParent.emit({action: 'delete', course}),
    //   () => undefined
    // );

    this.notifyParent.emit({action: 'delete', course})
  }

  private onZoneUnstable(): void {
    this.startTimer = performance.now();
  }

  private onZoneStable(): void {
    this.stopTimer = performance.now();
    if (this.startTimer) {
      console.log('= in ' + this.constructor.name + ' =');
      console.log('unStable -> Stable: ' + Math.floor((this.stopTimer - this.startTimer ) * 1000) / 1000 + ' ms');
    }
  }

  public ngOnDestroy(): void {
    this.subOnUnstable.unsubscribe();
    this.subOnStable.unsubscribe();
  }

}