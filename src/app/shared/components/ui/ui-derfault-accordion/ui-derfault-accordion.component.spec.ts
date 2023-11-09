import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiDerfaultAccordionComponent } from './ui-derfault-accordion.component';

describe('UiDerfaultAccordionComponent', () => {
  let component: UiDerfaultAccordionComponent;
  let fixture: ComponentFixture<UiDerfaultAccordionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UiDerfaultAccordionComponent],
    });
    fixture = TestBed.createComponent(UiDerfaultAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
