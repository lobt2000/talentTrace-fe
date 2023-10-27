import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserType } from '../constansts/user-type.model';
import { CommonUrls } from '../constansts/common/common.constants';

@Injectable({
  providedIn: 'root',
})
export class IsManagerGuard {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let userType = localStorage.getItem('userType');
    if (userType && userType === UserType.Manager) {
      return true;
    } else {
      this.router.navigate([CommonUrls.Company]);
      return false;
    }
  }
}
