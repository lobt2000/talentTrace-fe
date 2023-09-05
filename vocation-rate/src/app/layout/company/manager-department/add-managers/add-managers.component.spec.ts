import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddManagersComponent } from './add-managers.component';

describe('AddManagersComponent', () => {
  let component: AddManagersComponent;
  let fixture: ComponentFixture<AddManagersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddManagersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddManagersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
