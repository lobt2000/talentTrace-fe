import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ManagerDepartmentService {
  constructor(private http: HttpClient) {}

  getAllManagers() {
    return this.http.get('/api/v1/managers');
  }
}
