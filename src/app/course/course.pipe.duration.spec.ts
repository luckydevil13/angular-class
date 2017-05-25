import {By} from '@angular/platform-browser';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';
import {CourseDurationPipe} from './course.pipe.duration';

@Component({
  selector: 'sg-test',
  template: `
    <span>{{duration | courseDuration: duration}}</span>
  `
})
class CourseDurationTestComponent {
  public duration: number;
}

describe('courseDuration pipe test', () => {
  const pipe: CourseDurationPipe = new CourseDurationPipe();

  it('should return duration in format Nh Ymin', () => {
    const afterCourseDuration: string = pipe.transform(141);
    console.log(afterCourseDuration);
    expect(afterCourseDuration).toEqual('2h 21min');
  });

  it('should return duration in format Ymin', () => {
    const afterCourseDuration: string = pipe.transform(41);
    console.log(afterCourseDuration);
    expect(afterCourseDuration).toEqual('41min');
  });
});
