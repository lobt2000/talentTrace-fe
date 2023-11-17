import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmationModalComponent } from 'src/app/shared/components/modals/confirmation-modal/confirmation-modal.component';

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
          text: message || 'Are you sure you want to delete this candidate?',
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

  get currUser() {
    return JSON.parse(localStorage.getItem('userData'));
  }
}
