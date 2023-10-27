export enum OptionType {
  CREATE,
  ADD,
  CHANGE,
  DELETE,
  DELETE_PARMANENT,
  SEND_MESSAGE,
}

export type OptionTypeKeys = keyof typeof OptionType;
