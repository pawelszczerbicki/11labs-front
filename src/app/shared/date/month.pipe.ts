import {Pipe, PipeTransform} from '@angular/core';
import {format} from "date-fns";
import {pl} from 'date-fns/locale'

@Pipe({
  name: 'month',
  standalone: true
})
export class MonthPipe implements PipeTransform {
  transform = (value: string | number | Date, ...args: unknown[]): unknown => format(value, 'LLLL yyyy', {locale: pl});
}
