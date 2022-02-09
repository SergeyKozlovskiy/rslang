import { IStatisticBody } from './../types/types';

export const setStatistics = (title: string, body: IStatisticBody): void => {
  localStorage.setItem(title, JSON.stringify(body));
}