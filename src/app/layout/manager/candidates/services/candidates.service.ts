import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConfirmationModalComponent } from 'src/app/shared/components/modals/confirmation-modal/confirmation-modal.component';

@Injectable({
  providedIn: 'root',
})
export class CandidatesService {
  private vacancyIdBS = new BehaviorSubject<string>('');
  vacancyId$ = this.vacancyIdBS.asObservable();

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
  ) {}

  setVacancyId(id: string) {
    this.vacancyIdBS.next(id);
  }

  get getVacancyIdBSValue(): string {
    return this.vacancyIdBS.value;
  }

  getAllScoreOptions(): Observable<any> {
    return this.http.get('/api/v1/options/score');
  }

  getAllStageOptions(): Observable<any> {
    return this.http.get('/api/v1/options/stage');
  }

  createScoreOption(body): Observable<any> {
    return this.http.post('/api/v1/options/score', body);
  }

  createStageOption(body): Observable<any> {
    return this.http.post('/api/v1/options/stage', body);
  }

  deleteScoreOption(id: string): Observable<any> {
    return this.http.delete(`/api/v1/options/score/${id}`);
  }

  deleteStageOption(id: string): Observable<any> {
    return this.http.delete(`/api/v1/options/stage/${id}`);
  }

  getAllCandidates(): Observable<any> {
    return this.http.get('/api/v1/candidates');
  }

  createCandidate(body): Observable<any> {
    return this.http.post('/api/v1/candidates', body);
  }

  getCandidate(id: string, query?: string): Observable<any> {
    let url = '';
    if (query) {
      url += `?type=${query}`;
    }
    return this.http.get(`/api/v1/candidates/${id}${url}`);
  }

  deleteCandidate(id: string): Observable<any> {
    return this.http.delete(`/api/v1/candidates/${id}`);
  }

  updateCandidate(id: string, body): Observable<any> {
    return this.http.patch(`/api/v1/candidates/${id}`, body);
  }

  updateAllCandidates(id: string, body): Observable<any> {
    return this.http.patch(`/api/v1/candidates`, { vacancyId: id, ...body });
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
}
