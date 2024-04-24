import React from 'react';

export enum ColorTheme {
  DARK = 'dark',
  LIGHT = 'light',
}
export type AppProps = {
  children: React.ReactNode;
};
export type TStatus = 'new' | 'done' | 'in work';

export interface IData {
  id: number;
  date: string;
  fullName: string;
  nameCompany: string;
  phoneFields: string;
  commentsFields: string;
  status: TStatus[];
}