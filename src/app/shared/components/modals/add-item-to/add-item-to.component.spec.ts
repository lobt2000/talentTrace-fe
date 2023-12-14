import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItemToComponent } from './add-item-to.component';

describe('AddItemToComponent', () => {
  let component: AddItemToComponent;
  let fixture: ComponentFixture<AddItemToComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddItemToComponent],
    });
    fixture = TestBed.createComponent(AddItemToComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
