import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerRegistrationComponent } from './manager-registration.component';

describe('ManagerRegistrationComponent', () => {
  let component: ManagerRegistrationComponent;
  let fixture: ComponentFixture<ManagerRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerRegistrationComponent],
    });
    fixture = TestBed.createComponent(ManagerRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
