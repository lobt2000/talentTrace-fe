import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmationModalComponent } from 'src/app/shared/components/modals/confirmation-modal/confirmation-modal.component';
import { IRequest } from 'src/app/shared/interfaces/common/common.interface';

@Injectable({
  providedIn: 'root',
})
export class EmployeeDashboardService {
  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
  ) {}

  getAllEmployees(): Observable<any> {
    return this.http.get(`/api/v1/employees/`);
  }

  getEmployee(id: string): Observable<any> {
    return this.http.get(`/api/v1/employees/${id}`);
  }

  updateEmployee(id: string, body): Observable<any> {
    return this.http.patch(`/api/v1/employees/${id}`, body);
  }

  deleteEmployeePerfomance(id: string, perfomanceId): Observable<any> {
    return this.http.delete(
      `/api/v1/employees/${id}/perfomances/${perfomanceId}`,
    );
  }

  onDelete(message?) {
    this.dialog.closeAll();
    return this.dialog
      .open(ConfirmationModalComponent, {
        width: '40vw',
        height: '300px',
        position: {
          left: 'calc(50% - 15vw)',
        },
        panelClass: 'confirmation-modal',
        data: {
          text: message || 'Are you sure you want to delete this employee?',
          title: 'Confirmation',
        },
      })
      .afterClosed();
  }

  openErrorModal(message) {
    this.dialog.closeAll();
    return this.dialog
      .open(ConfirmationModalComponent, {
        width: '40vw',
        height: '300px',
        position: {
          left: 'calc(50% - 15vw)',
        },
        panelClass: 'confirmation-modal',
        data: {
          text: message,
          title: 'Error',
          withoutButtonCancel: true,
        },
      })
      .afterClosed();
  }

  createEmployeePerfomace(id: string, body: any): Observable<IRequest> {
    return this.http.post<IRequest>(
      `/api/v1/employees/${id}/perfomances`,
      body,
    );
  }

  updateEmployeePerfomace(
    id: string,
    perfomanceId: string,
    body: any,
  ): Observable<IRequest> {
    return this.http.patch<IRequest>(
      `/api/v1/perfomances/${perfomanceId}`,
      body,
    );
  }

  uploadFileForPerfomance(id: string, body: any): Observable<IRequest> {
    return this.http.post<IRequest>(`/api/v1/perfomances/files`, body);
  }

  updateFileForPerfomance(id: string, body: any): Observable<any> {
    return this.http.patch(`/api/v1/perfomances/files?id=${id}`, body);
  }

  getPerfomanceFile(id: string): Observable<any> {
    return this.http.get(`/api/v1/perfomances/files?id=${id}`);
  }

  getAllFeedBacks(id: string, perfomanceId: string): Observable<IRequest> {
    return this.http.get<IRequest>(
      `/api/v1/employees/${id}/perfomances/${perfomanceId}`,
    );
  }

  getAllPerfomance(id: string): Observable<IRequest> {
    return this.http.get<IRequest>(`/api/v1/employees/${id}/perfomances`);
  }

  getAllScoreOptions(): Observable<any> {
    return this.http.get('/api/v1/options/score');
  }

  createScoreOption(body): Observable<any> {
    return this.http.post('/api/v1/options/score', body);
  }

  get currUser() {
    return JSON.parse(localStorage.getItem('userData'));
  }
}
