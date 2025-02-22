import {CalendarDateFormatter, DateFormatterParams} from 'angular-calendar';
import {Injectable} from '@angular/core';
import {format} from "date-fns";
import {pl} from "date-fns/locale";

@Injectable()
export class CustomDateFormatter extends CalendarDateFormatter {
  public override dayViewHour = ({date}: DateFormatterParams): string => format(date, 'HH:mm');
  public override weekViewHour = ({date, locale}: DateFormatterParams): string => this.dayViewHour({date, locale});
  public override monthViewColumnHeader = ({date,}: DateFormatterParams): string => format(date, "EEEE", {locale: pl})
  public override weekViewColumnHeader = ({date,}: DateFormatterParams): string => format(date, "EEEE", {locale: pl})
  public override weekViewColumnSubHeader = ({date,}: DateFormatterParams): string => format(date, "d MMMM", {locale: pl})
}
