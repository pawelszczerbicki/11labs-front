import {Pipe, PipeTransform} from '@angular/core';
import {format} from "date-fns";
import {pl} from 'date-fns/locale'

@Pipe({
  name: 'iso',
  standalone: true
})
export class IsoPipePipe implements PipeTransform {
  transform = (value: string | number | Date, ...args: unknown[]): unknown => format(value, 'EEEE, d MMMM', {locale: pl});
}
