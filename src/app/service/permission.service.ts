import { Injectable } from '@angular/core';
import { permissionsIds } from '../shared/constansts/permissions';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  private canUpdateInterviewStageBS = new BehaviorSubject<boolean>(false);
  canUpdateInterviewStage$ = this.canUpdateInterviewStageBS.asObservable();

  constructor() {}

  getCorrectPermissions(res) {
    let permissions = {};

    for (const prop in res) {
      if (res[prop] && res[prop].subpermission.some((el) => el.checked)) {
        permissions[prop] = res[prop].subpermission
          .filter((el) => el.checked)
          .map((el) => {
            const curPermission = permissionsIds.find(
              (per) => per.name === el.name,
            );

            return {
              name: el.name,
              id: curPermission.id,
              ...(el.selectValue && {
                children:
                  typeof el.selectValue == 'object'
                    ? el.selectValue.map((per) => ({
                        id: curPermission.children.find(
                          (curChildPer) => curChildPer.name == per,
                        )?.id,
                      }))
                    : curPermission.children.find(
                        (per) => per.name === el.selectValue,
                      )?.id,
              }),
            };
          });
      }
    }
    return Object.values(permissions).length ? permissions : null;
  }

  canUpdateInterviewStage(managers): boolean {
    return managers?.some((manager) => manager.id === this.currUserId);
  }
  setCanUpdateInterviewStage(turn: boolean) {
    this.canUpdateInterviewStageBS.next(turn);
  }

  get getCanUpdateInterviewStageValue(): boolean {
    return this.canUpdateInterviewStageBS.value;
  }

  get currUserId() {
    return JSON.parse(localStorage.getItem('userData'))?.id;
  }
}
