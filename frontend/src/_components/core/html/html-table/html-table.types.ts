import { ReactNode } from 'react';
export type TableHeaderCellConfig = {
  children: ReactNode;
  className?: string;
  id?: string;
};

export type TableHeaderRowConfig = {
  cells: TableHeaderCellConfig[];
  className?: string;
  id?: string;
};

export type TableHeaderConfig = {
  rows: TableHeaderRowConfig[];
  className?: string;
  id?: string;
};

export type TableCellConfig = {
  children: ReactNode;
  className?: string;
  id?: string;
};

export type TableRowConfig = {
  cells: TableCellConfig[];
  className?: string;
  id?: string;
};

export type TableBodyConfig = {
  rows: TableRowConfig[];
  className?: string;
  id?: string;
};
export type TableFooterConfig = {
  rows: TableRowConfig[];
  className?: string;
  id?: string;
};

export type HTMLTableCaption = {
  className?: string;
  children: ReactNode;
  id?: string;
};

export type TableConfig = {
  caption?: HTMLTableCaption;
  header?: TableHeaderConfig;
  body: TableBodyConfig;
  footer?: TableFooterConfig;
};