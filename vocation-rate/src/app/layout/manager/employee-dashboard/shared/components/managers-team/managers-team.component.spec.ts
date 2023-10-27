import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagersTeamComponent } from './managers-team.component';

describe('ManagersTeamComponent', () => {
  let component: ManagersTeamComponent;
  let fixture: ComponentFixture<ManagersTeamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagersTeamComponent]
    });
    fixture = TestBed.createComponent(ManagersTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
