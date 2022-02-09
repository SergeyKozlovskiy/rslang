import { IStatisticBody } from './../types/types';

export const getStatistics = (title: string): IStatisticBody | null => {
  const statistics: string | null = localStorage.getItem(title);
  if (typeof(statistics) === 'string') {
    return JSON.parse(statistics)
  } else {
    return null;
  }
}