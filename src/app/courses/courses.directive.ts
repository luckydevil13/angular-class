import {Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[sgHighLightBorderCourse]'
})
export class СourseBorderDirective implements OnInit {
  @Input() private sgHighLightBorderCourse: Date;

  constructor(private el: ElementRef) {
  }

  private dateDiffInDays(dt: Date): number {
    const now: Date = new Date();
    return Math.floor((Date.UTC(dt.getFullYear(), dt.getMonth(), dt.getDate())
      - Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) ) / (1000 * 60 * 60 * 24));
  }

  public ngOnInit(): void {
    const diffDays: number = this.dateDiffInDays(this.sgHighLightBorderCourse);
    if ( diffDays > 0 ) {
      this.el.nativeElement.style['border-color'] = 'blue';
    } else if (diffDays > -14) {
      this.el.nativeElement.style['border-color'] = 'green';
    }
  }
}
