import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacancyDashboardComponent } from './vacancy-dashboard.component';

describe('VacancyDashboardComponent', () => {
  let component: VacancyDashboardComponent;
  let fixture: ComponentFixture<VacancyDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VacancyDashboardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VacancyDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
