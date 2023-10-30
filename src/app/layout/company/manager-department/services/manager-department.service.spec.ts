import { TestBed } from '@angular/core/testing';

import { ManagerDepartmentService } from './manager-department.service';

describe('ManagerDepartmentService', () => {
  let service: ManagerDepartmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagerDepartmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
