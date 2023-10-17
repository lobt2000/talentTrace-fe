import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiAccordionComponent } from './ui-accordion.component';

describe('UiAccordionComponent', () => {
  let component: UiAccordionComponent;
  let fixture: ComponentFixture<UiAccordionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UiAccordionComponent]
    });
    fixture = TestBed.createComponent(UiAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
