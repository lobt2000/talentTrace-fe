export interface ColumnModel {
  value: any;
  label: string;
  cell?: {
    type?: ColumnTypes;
    icon?: string;
    tooltip?: string;
    routerLink?: string;
    linkName?: string;
    linkIdField?: string;
    event?: (...args) => any;
    hidden?: (...args) => any;
  };
  field?: string;
  hiddenSort?: boolean;
  hiddenColumn?: boolean;
  sortFn?: (a: unknown, b: unknown) => 0 | -1 | 1;
}

export enum ColumnTypes {
  'icon' = 'icon',
  'link' = 'link',
  'date' = 'date',
  'role' = 'role',
  'class' = 'class',
}
