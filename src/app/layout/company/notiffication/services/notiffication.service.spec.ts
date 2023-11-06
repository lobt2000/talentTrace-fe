import { TestBed } from '@angular/core/testing';

import { NotifficationService } from './notiffication.service';

describe('NotifficationService', () => {
  let service: NotifficationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotifficationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
