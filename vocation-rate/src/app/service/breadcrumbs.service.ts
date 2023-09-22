import { Injectable } from '@angular/core';
import { BehaviorSubject, debounceTime } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbsService {
  defaultBreadcrumb = null;
  readonly breadcrumbs$ = new BehaviorSubject([]);
  breadcrumbs = this.breadcrumbs$.asObservable().pipe(debounceTime(10));
  constructor() {}
  get getBreadcrumbs(): any[] {
    return this.breadcrumbs$.getValue();
  }
  get getActiveBreadcrumb(): any {
    const arr = this.breadcrumbs$.getValue();
    return arr.length > 1 ? arr[arr.length - 1] : arr[0];
  }

  setDefault(breadcrumb) {
    this.defaultBreadcrumb = breadcrumb;
    this.breadcrumbs$.next([this.defaultBreadcrumb]);
  }

  resetBreadcrumbs() {
    this.breadcrumbs$.next([this.defaultBreadcrumb]);
  }

  addBreadcrumbs(breadcrumb?) {
    setTimeout(() => {
      this.breadcrumbs$.next([...this.getBreadcrumbs, breadcrumb]);
    }, 0);
  }
  replaceLastBreadcrumb(breadcrumb?) {
    setTimeout(() => {
      if (this.getBreadcrumbs.length > 1) {
        this.getBreadcrumbs.pop();
      }
      this.breadcrumbs$.next(
        breadcrumb
          ? [...this.getBreadcrumbs, breadcrumb]
          : [...this.getBreadcrumbs]
      );
    }, 0);
  }
  removeActiveBreadcrumb() {
    setTimeout(() => {
      if (this.getBreadcrumbs.length > 1) {
        this.getBreadcrumbs.pop();
      }
      this.breadcrumbs$.next([...this.getBreadcrumbs]);
    }, 0);
  }
}
