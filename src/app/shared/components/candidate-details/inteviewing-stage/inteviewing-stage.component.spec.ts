import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteviewingStageComponent } from './inteviewing-stage.component';

describe('InteviewingStageComponent', () => {
  let component: InteviewingStageComponent;
  let fixture: ComponentFixture<InteviewingStageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InteviewingStageComponent],
    });
    fixture = TestBed.createComponent(InteviewingStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
