import {Pipe, PipeTransform} from '@angular/core';
import {format} from "date-fns";
import {pl} from "date-fns/locale";

@Pipe({
  name: 'datetime',
  standalone: true
})
export class DateTimePipe implements PipeTransform {
  transform = (value: string | number | Date, ...args: unknown[]): unknown => format(value, "EEEE, d MMMM HH:mm", {locale: pl})
}
