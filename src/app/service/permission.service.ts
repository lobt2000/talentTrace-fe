import { Injectable } from '@angular/core';
import { permissionsIds } from '../shared/constansts/permissions';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
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
}
