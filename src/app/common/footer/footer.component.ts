import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'sg-footer',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'footer.component.html',
  styleUrls: ['footer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FooterComponent implements OnInit {
  constructor() {
    return this;
  }

  public ngOnInit(): void {
    return;
  }
}
