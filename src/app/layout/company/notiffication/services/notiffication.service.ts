import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotifficationService {
  constructor(private http: HttpClient) {}

  getCompanyNotiffication(): Observable<any> {
    return this.http.get<any>('/api/v1/company/notiffications');
  }

  declineNotiffication(id: string): Observable<any> {
    return this.http.post('/api/v1/company/notiffications', { id: id });
  }
}
