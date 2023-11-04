import { ICommon } from '../common/common.interface';

export interface IPosition {
  department: ICommon;
  qualificationLevelRequired: boolean;
  requiresTechStack: boolean;
  name: string;
  id: number;
}
