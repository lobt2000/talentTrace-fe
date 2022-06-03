import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInCompanyComponent } from './sign-in-company.component';

describe('SignInCompanyComponent', () => {
  let component: SignInCompanyComponent;
  let fixture: ComponentFixture<SignInCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignInCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
