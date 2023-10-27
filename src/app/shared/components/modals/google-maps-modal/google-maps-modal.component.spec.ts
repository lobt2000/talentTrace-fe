import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleMapsModalComponent } from './google-maps-modal.component';

describe('GoogleMapsModalComponent', () => {
  let component: GoogleMapsModalComponent;
  let fixture: ComponentFixture<GoogleMapsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GoogleMapsModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GoogleMapsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
