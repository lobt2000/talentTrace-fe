import { ICommon } from '../interfaces/common/common.interface';

export const children: Array<ICommon> = [
  {
    name: 'All',
    id: 0,
  },
  {
    name: 'Only managers',
    id: 1,
  },
  {
    name: 'No one',
    id: 2,
  },
];

export const permissionsIds = [
  { name: 'Possibility to send a messages', id: 1, children: children },
  { name: 'Generating a link for the candidate', id: 2 },
  { name: 'Possibility to write comments for vacancy', id: 3 },
  { name: 'Possibility to manage vacancies', id: 4, children: children },
  { name: '', id: 5 },
  { name: '', id: 6 },
  { name: '', id: 7 },
  { name: '', id: 8 },
];

export const permissionsObjects = {
  permissionsIds,
  children,
};
