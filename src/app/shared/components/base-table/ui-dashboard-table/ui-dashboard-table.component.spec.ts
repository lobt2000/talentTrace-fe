import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiDashboardTableComponent } from './ui-dashboard-table.component';

describe('UiDashboardTableComponent', () => {
  let component: UiDashboardTableComponent;
  let fixture: ComponentFixture<UiDashboardTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UiDashboardTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiDashboardTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
