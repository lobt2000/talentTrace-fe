import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserType } from '../constansts/user-type.model';

@Injectable({
  providedIn: 'root',
})
export class IsCompanyGuard  {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let userType = localStorage.getItem('userType');
    if (userType && userType === UserType.Company) {
      return true;
    }
    return false;
  }
}
