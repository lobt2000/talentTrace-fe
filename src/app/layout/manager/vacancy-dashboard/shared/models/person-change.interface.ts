import {
  OptionType,
  OptionTypeKeys,
} from 'src/app/shared/constansts/optionType.model';

export interface IPersonChange {
  type: OptionTypeKeys;
  title: string;
  member?: any;
  members?: any[];
  managers?: any[];
}

export enum PersonEventTitle {
  CREATE = 'Create a person',
  ADD = 'Add manager to team',
  CHANGE = 'Change a manager',
  DELETE = 'Delete manager',
  DELETE_PARMANENT = 'Delete parmanent',
  SEND_MESSAGE = 'Sent message',
}
