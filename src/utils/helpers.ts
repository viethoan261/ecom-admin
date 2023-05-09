import { UseFormReturnType } from '@mantine/form';
import _ from 'lodash';
import { notiType, renderNotification } from './notifications';

export const randomArray = (number: number): number[] => Array.from({ length: number }, (_, i) => i + 1);

export const formatCurrency = (number: number | undefined) => {
  if (!number) return '0';
  const formattedNumber = _.replace(_.round(number, 0).toString(), /\B(?=(\d{3})+(?!\d))/g, '.') + ' đ';
  return formattedNumber;
};

export const formatDateFromISOString = (string: string | undefined) => {
  if (!string) return '';
  return string.split('T')[0];
};

export const getParamsFromUrl = (params: string) => {
  const searchParams = new URLSearchParams(window.location.search);
  const email = searchParams.get(params);
  return email;
};

export function getNextEnumValue<T>(value: T, enumObject: any): T | null {
  const values = Object.values(enumObject) as T[]; // cast the array to type T[]
  const currentIndex = values.indexOf(value);
  const nextIndex = currentIndex + 1;
  if (nextIndex < values.length) {
    return values[nextIndex];
  } else {
    return null;
  }
}
