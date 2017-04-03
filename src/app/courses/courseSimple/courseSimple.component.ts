import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
  NgZone
} from '@angular/core';
import {Course} from '../../course';
import {DialogService} from '../../common/dialog.service';
import {LoaderBlockService} from '../../common/loaderBlock/loader.service';

@Component({
  selector: 'sg-simple-course',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'courseSimple.component.html',
  styleUrls: [
    'courseSimple.component.css',
    '../../common/dialog.service.css'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseSimpleComponent {
  @Input() public course: Course;
  @Output() public notifyParent: EventEmitter<any> = new EventEmitter();
  private stopTimer: number;
  private startTimer: number;
  private subOnUnstable: any;
  private subOnStable: any;

  constructor(private dialogService: DialogService,
              private ngZone: NgZone,
              private loaderBlockService: LoaderBlockService) {
    this.subOnUnstable = this.ngZone.onUnstable.subscribe(this.onZoneUnstable.bind(this));
    this.subOnStable = this.ngZone.onStable.subscribe(this.onZoneStable.bind(this));
  }

  public deleteCourse(course: Course): void {
    this.loaderBlockService.Show();
    // due affected parent component profiling
    // this.dialogService.confirm('Delete ' + course.title, 'Do you really want to delete this course?').subscribe(
    //   () => this.notifyParent.emit({action: 'delete', course}),
    //   () => undefined
    // );
    setTimeout(
      () => {
        this.loaderBlockService.Hide();
        this.notifyParent.emit({action: 'delete', course});
      },
      500);
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
  }

}
