import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StaffDepartmentService {
  constructor(private http: HttpClient) {}

  getAllEmployees() {
    return this.http.get('/api/v1/employees');
  }

  getEmployee(id: string) {
    return this.http.get(`/api/v1/employees/${id}`);
  }

  createEmployee(body) {
    return this.http.post(`/api/v1/employees`, body);
  }

  updateEmployee(id: string, body) {
    return this.http.patch(`/api/v1/employees/${id}`, body);
  }

  deleteEmployee(id: string) {
    return this.http.delete(`/api/v1/employees/${id}`);
  }
}
