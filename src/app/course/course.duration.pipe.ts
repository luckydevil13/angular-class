import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'courseDuration'})
export class CourseDurationPipe implements PipeTransform {
  public transform(min: number): string {
    return this.convertMinsToHrsMin(min);
  }

  private convertMinsToHrsMin(minutes: number): string {
    let h: number = Math.floor(minutes / 60);
    let m: number = minutes % 60;
    let result: string = h ? h + 'h ' : '';
    result = result + m + 'min';
    return result;
  }
}
