import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiCanvasProgressComponent } from './ui-canvas-progress.component';

describe('UiCanvasProgressComponent', () => {
  let component: UiCanvasProgressComponent;
  let fixture: ComponentFixture<UiCanvasProgressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UiCanvasProgressComponent],
    });
    fixture = TestBed.createComponent(UiCanvasProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
