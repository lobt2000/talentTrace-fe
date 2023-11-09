import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateDetailsComponent } from './candidate-details.component';

describe('CandidateProfileComponent', () => {
  let component: CandidateDetailsComponent;
  let fixture: ComponentFixture<CandidateDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CandidateDetailsComponent],
    });
    fixture = TestBed.createComponent(CandidateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
