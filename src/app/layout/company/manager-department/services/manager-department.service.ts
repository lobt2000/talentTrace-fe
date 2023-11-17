import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRequest } from 'src/app/shared/interfaces/common/common.interface';

@Injectable({
  providedIn: 'root',
})
export class ManagerDepartmentService {
  constructor(private http: HttpClient) {}

  getAllManagers(): Observable<IRequest> {
    return this.http.get<IRequest>('/api/v1/managers');
  }

  getManager(id: string) {
    return this.http.get(`/api/v1/managers/${id}`);
  }

  createManager(body) {
    return this.http.post(`/api/v1/managers`, body);
  }

  updateManager(id: string, body) {
    console.log(id);

    return this.http.patch(`/api/v1/managers/${id}`, body);
  }

  deleteManager(id: string) {
    return this.http.delete(`/api/v1/managers/${id}`);
  }
}
