import { DATE_PICKER_FORMAT } from '~/models/date.model';
import dayjs from 'dayjs';
import 'dayjs/locale/vi'; // import locale
import isLeapYear from 'dayjs/plugin/isLeapYear'; // import plugin

dayjs.extend(isLeapYear); // use plugin
dayjs.locale('vi'); // use locale

export class DateJS {
  static getDate(date?: string) {
    if (date) return dayjs(date);
    return dayjs();
  }

  static getMonth(date?: string) {
    return this.getDate(date).month() + 1;
  }
  static getYear(date?: string) {
    return this.getDate(date).year();
  }

  static getDateFromNow(date: string) {
    return dayjs().diff(dayjs(date), 'day');
  }

  static splitDayMonthYear(date: string) {
    const dateSplit = date.split('-');
    return {
      day: dateSplit[2],
      month: dateSplit[1],
      year: dateSplit[0],
    };
  }

  static getFormatDate(date?: string, format = 'DD/MM/YYYY') {
    if (date) return dayjs(date).format(format);
    return dayjs().format(format);
  }

  static getDateFromStartOfMonth(
    date?: string,
    format: string = DATE_PICKER_FORMAT
  ) {
    return dayjs(date).startOf('month').format(format);
  }
}
