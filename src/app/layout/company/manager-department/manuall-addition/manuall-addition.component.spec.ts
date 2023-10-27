import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManuallAdditionComponent } from './manuall-addition.component';

describe('ManuallAdditionComponent', () => {
  let component: ManuallAdditionComponent;
  let fixture: ComponentFixture<ManuallAdditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManuallAdditionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManuallAdditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
