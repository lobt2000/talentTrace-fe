import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralInfoProfileComponent } from './general-info-profile.component';

describe('GeneralInfoProfileComponent', () => {
  let component: GeneralInfoProfileComponent;
  let fixture: ComponentFixture<GeneralInfoProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneralInfoProfileComponent]
    });
    fixture = TestBed.createComponent(GeneralInfoProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
