import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiSortComponent } from './ui-sort.component';

describe('UiSortComponent', () => {
  let component: UiSortComponent;
  let fixture: ComponentFixture<UiSortComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UiSortComponent],
    });
    fixture = TestBed.createComponent(UiSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
