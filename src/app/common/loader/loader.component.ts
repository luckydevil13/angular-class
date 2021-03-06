import {
  ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation, ChangeDetectorRef,
  OnDestroy
} from '@angular/core';
import {LoaderBlockService} from './loader.service';

@Component({
  selector: 'sg-loadblock',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderBlockComponent implements OnInit, OnDestroy {
  public show: boolean;

  constructor(private loaderBlockService: LoaderBlockService,
              private cd: ChangeDetectorRef) {
  }

  public ngOnInit(): void {
    this.loaderBlockService.display.subscribe((val: boolean) => {
      this.cd.markForCheck();
      console.log('LoaderBlock:' + val);
      this.show = val;
    });
  }

  public ngOnDestroy(): void {
    this.loaderBlockService.display.unsubscribe();
  }
}
