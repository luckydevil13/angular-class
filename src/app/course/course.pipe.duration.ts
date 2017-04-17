import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'courseDuration'})
export class CourseDurationPipe implements PipeTransform {

  private convertMinsToHrsMin(minutes: number): string {
    if (isNaN(minutes)) {
       return;
    }
    const h: number = Math.floor(minutes / 60);
    const m: number = minutes % 60;
    let result: string = h ? h + 'h ' : '';
    result = result + m + 'min';
    return result;
  }

  public transform(min: number): string {
    return this.convertMinsToHrsMin(min);
  }
}
