import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifficationComponent } from './notiffication.component';

describe('NotifficationComponent', () => {
  let component: NotifficationComponent;
  let fixture: ComponentFixture<NotifficationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotifficationComponent],
    });
    fixture = TestBed.createComponent(NotifficationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
