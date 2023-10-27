import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeMemberModalComponent } from './change-member-modal.component';

describe('ChangeMemberModalComponent', () => {
  let component: ChangeMemberModalComponent;
  let fixture: ComponentFixture<ChangeMemberModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeMemberModalComponent]
    });
    fixture = TestBed.createComponent(ChangeMemberModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
