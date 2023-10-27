import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiFilterComponent } from './ui-filter.component';

describe('UiFilterComponent', () => {
  let component: UiFilterComponent;
  let fixture: ComponentFixture<UiFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UiFilterComponent]
    });
    fixture = TestBed.createComponent(UiFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
