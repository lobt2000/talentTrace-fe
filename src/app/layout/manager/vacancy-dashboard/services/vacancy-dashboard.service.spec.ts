import { TestBed } from '@angular/core/testing';

import { VacancyDashboardService } from './vacancy-dashboard.service';

describe('VacancyDashboardService', () => {
  let service: VacancyDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VacancyDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
