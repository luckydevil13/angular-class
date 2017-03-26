import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'sg-breadcrumb',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'breadcrumb.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbComponent {}
