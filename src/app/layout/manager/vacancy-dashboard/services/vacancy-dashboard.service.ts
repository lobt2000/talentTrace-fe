import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonUrls } from 'src/app/shared/constansts/common/common.constants';
import { IRequest } from 'src/app/shared/interfaces/common/common.interface';

@Injectable({
  providedIn: 'root',
})
export class VacancyDashboardService {
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  onGetVacancyDetails(id: string): Observable<IRequest> {
    return this.http.get<IRequest>(`api/v1/vacancies/${id}`);
  }

  onGetAllVacancies(): Observable<IRequest> {
    return this.http.get<IRequest>(`api/v1/vacancies`);
  }

  onGetAllManagers(): Observable<IRequest> {
    return this.http.get<IRequest>(`api/v1/managers`);
  }

  onCreateVacancy(body): Observable<IRequest> {
    return this.http.post<IRequest>('api/v1/vacancies', body);
  }

  onDeleteVacancy(id: string): Observable<IRequest> {
    return this.http.delete<IRequest>(`api/v1/vacancies/${id}`);
  }

  onUpdateVacancy(id: string, body): Observable<IRequest> {
    return this.http.patch<IRequest>(`api/v1/vacancies/${id}`, body);
  }

  onGetAllVacancyCandidates(id: string): Observable<IRequest> {
    return this.http.get<IRequest>(`api/v1/vacancies/${id}/candidates`);
  }

  navigateToItem(route?) {
    const router = [CommonUrls.Manager, 'vacancy-dashboard'];
    if (route) router.push(route);
    this.router.navigate(router);
  }
}
