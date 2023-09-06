import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCompanyMembersComponent } from './add-company-members.component';

describe('AddManagersComponent', () => {
  let component: AddCompanyMembersComponent;
  let fixture: ComponentFixture<AddCompanyMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCompanyMembersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCompanyMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
