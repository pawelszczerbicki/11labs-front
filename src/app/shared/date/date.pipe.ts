import {Pipe, PipeTransform} from '@angular/core';
import {format} from "date-fns";
import {pl} from "date-fns/locale";

@Pipe({
  name: 'date',
  standalone: true
})
export class DatePipe implements PipeTransform {
  transform = (value: string | number | Date, ...args: unknown[]): unknown => format(value, "d MMMM", { locale: pl })
}
