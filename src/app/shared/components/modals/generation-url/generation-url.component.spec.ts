import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerationUrlComponent } from './generation-url.component';

describe('GenerationUrlComponent', () => {
  let component: GenerationUrlComponent;
  let fixture: ComponentFixture<GenerationUrlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenerationUrlComponent],
    });
    fixture = TestBed.createComponent(GenerationUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
