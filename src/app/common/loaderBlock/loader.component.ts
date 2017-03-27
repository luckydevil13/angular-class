import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation, ChangeDetectorRef} from '@angular/core';
import {LoaderBlockService} from './loader.service';

@Component({
  selector: 'sg-loadblock',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'loader.component.html',
  styleUrls: ['loader.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderBlockComponent implements OnInit {
  public show: boolean;

  constructor(private loaderBlockService: LoaderBlockService,
              private cd: ChangeDetectorRef) {
  }

  public ngOnInit(): void {
    this.loaderBlockService.show.subscribe((val: boolean) => {
      this.cd.markForCheck();
      console.log('LoaderBlock:' + val);
      this.show = val;
    });
  }
}
