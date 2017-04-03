import {Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[sgHighLightBorderCourse]'
})
export class СourseBorderDirective {
  @Input() private sgHighLightBorderCourse: Date;

  constructor(private el: ElementRef) {
  }

  public ngOnInit(): void {
    let diffDays: number = this.dateDiffInDays(this.sgHighLightBorderCourse);
    if ( diffDays > 0 ) {
      this.el.nativeElement.style['border-color'] = 'blue';
    } else if (diffDays > -14) {
      this.el.nativeElement.style['border-color'] = 'green';
    }
  }

  private dateDiffInDays(dt: Date): number {
    let now: Date = new Date();
    return Math.floor((Date.UTC(dt.getFullYear(), dt.getMonth(), dt.getDate())
      - Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) ) / (1000 * 60 * 60 * 24));
  }

}
