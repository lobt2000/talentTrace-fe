import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerDepartmentComponent } from './manager-department.component';

describe('ManagerDepartmentComponent', () => {
  let component: ManagerDepartmentComponent;
  let fixture: ComponentFixture<ManagerDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagerDepartmentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ManagerDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
