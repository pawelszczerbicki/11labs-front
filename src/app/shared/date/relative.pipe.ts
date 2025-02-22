import {Pipe, PipeTransform} from '@angular/core';
import {formatRelative} from "date-fns";
import {pl} from 'date-fns/locale'

@Pipe({
  name: 'relative',
  standalone: true
})
export class RelativePipe implements PipeTransform {
  transform = (value: string | number | Date, ...args: unknown[]): unknown => relative(value)
}

export const relative = (value: string | number | Date) => formatRelative(value, new Date(), {locale: pl});
