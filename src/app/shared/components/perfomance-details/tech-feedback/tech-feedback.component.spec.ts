import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechFeedbackComponent } from './tech-feedback.component';

describe('TechFeedbackComponent', () => {
  let component: TechFeedbackComponent;
  let fixture: ComponentFixture<TechFeedbackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TechFeedbackComponent],
    });
    fixture = TestBed.createComponent(TechFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
