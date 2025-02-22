import {Pipe, PipeTransform} from '@angular/core';
import {format} from "date-fns";
import {pl} from "date-fns/locale";

@Pipe({
  name: 'hour',
  standalone: true
})
export class HourPipe implements PipeTransform {
  transform = (value: string | number | Date, ...args: unknown[]): unknown => format(value, 'HH:mm', {locale: pl})
}
