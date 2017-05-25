import {DebugElement} from '@angular/core/core';
import {By} from '@angular/platform-browser';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';
import {СourseBorderDirective} from './courses.directive';

@Component({
  selector: 'sg-test',
  template: `
    <div [sgHighLightBorderCourse]="date"></div>
  `
})
class TestComponent {
  public date: Date;
}

describe('course highlight directive', () => {
  let fixture: ComponentFixture<TestComponent>;
  let myDate: Date;

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [СourseBorderDirective, TestComponent] });
    fixture = TestBed.createComponent(TestComponent);
    myDate = new Date();
  });

  it('should mark border of future course as blue', () => {
    myDate.setDate(myDate.getDate() + 1);
    fixture.componentInstance.date = myDate;
    fixture.detectChanges();

    const styles: any = fixture.debugElement
      .query(By.directive(СourseBorderDirective))
      .nativeElement.style;
    expect(styles.borderColor).toEqual('blue');
  });

  it('should mark border of fresh course as green', () => {
    myDate.setDate(myDate.getDate() - 1);
    fixture.componentInstance.date = myDate;
    fixture.detectChanges();

    const styles: any = fixture.debugElement
      .query(By.directive(СourseBorderDirective))
      .nativeElement.style;
    expect(styles.borderColor).toEqual('green');
  });

  it('should not appy styles to old course', () => {
    myDate.setDate(myDate.getDate() - 15);
    fixture.componentInstance.date = myDate;
    fixture.detectChanges();

    const styles: any = fixture.debugElement
      .query(By.directive(СourseBorderDirective))
      .nativeElement.style;

    expect(styles.borderColor).toEqual('');
  });
});
