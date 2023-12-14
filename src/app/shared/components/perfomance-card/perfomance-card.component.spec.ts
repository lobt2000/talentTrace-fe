import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfomanceCardComponent } from './perfomance-card.component';

describe('PerfomanceCardComponent', () => {
  let component: PerfomanceCardComponent;
  let fixture: ComponentFixture<PerfomanceCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerfomanceCardComponent],
    });
    fixture = TestBed.createComponent(PerfomanceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
