import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiInstructionComponent } from './ui-instruction.component';

describe('UiInstructionComponent', () => {
  let component: UiInstructionComponent;
  let fixture: ComponentFixture<UiInstructionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UiInstructionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiInstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
