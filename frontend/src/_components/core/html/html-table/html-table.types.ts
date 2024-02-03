import { ReactNode } from 'react';
export type TableHeaderCellConfig = {
  children: ReactNode;
  className?: string;
};

export type TableHeaderRowConfig = {
  cells: TableHeaderCellConfig[];
  className?: string;
};

export type TableHeaderConfig = {
  rows: TableHeaderRowConfig[];
  className?: string;
};

export type TableCellConfig = {
  children: ReactNode;
  className?: string;
};

export type TableRowConfig = {
  cells: TableCellConfig[];
  className?: string;
};

export type TableBodyConfig = {
  rows: TableRowConfig[];
  className?: string;
};
export type TableFooterConfig = {
  rows: TableRowConfig[];
  className?: string;
};

export type HTMLTableCaption = {
  className?: string;
  children: ReactNode;
};

export type TableConfig = {
  caption?: HTMLTableCaption;
  header?: TableHeaderConfig;
  body: TableBodyConfig;
  footer?: TableFooterConfig;
};