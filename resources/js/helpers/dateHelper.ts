import { format } from 'date-fns';

export const DateFormat = 'E dd/MM/yyyy';

export const TimeFormat = "HH'h'mm";

export const DateTimeFormat = `${DateFormat} ${TimeFormat}`;

export const formatDate = (date: string | number | Date) => format(date, DateFormat);

export const formatDatetime = (date: string | number | Date) => format(date, DateTimeFormat);

export const formatMonth = (date: string | number | Date) => format(date, 'MMMM yyyy');

export const formatDay = (date: string | number | Date) => format(date, 'E dd');
