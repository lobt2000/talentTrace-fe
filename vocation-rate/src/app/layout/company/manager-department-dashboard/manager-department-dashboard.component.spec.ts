import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerDepartmentDashboardComponent } from './manager-department-dashboard.component';

describe('ManagerDepartmentDashboardComponent', () => {
  let component: ManagerDepartmentDashboardComponent;
  let fixture: ComponentFixture<ManagerDepartmentDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerDepartmentDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerDepartmentDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
