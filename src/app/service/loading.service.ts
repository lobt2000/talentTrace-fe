import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  constructor() {}

  private loadingBS = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingBS.asObservable();

  setLoading(turn: boolean) {
    this.loadingBS.next(turn);
  }

  get getLoadingValue(): boolean {
    return this.loadingBS.value;
  }
}
