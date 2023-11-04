import { TestBed } from '@angular/core/testing';

import { StaffDepartmentService } from './staff-department.service';

describe('StaffDepartmentService', () => {
  let service: StaffDepartmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaffDepartmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
