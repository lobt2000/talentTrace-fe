import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollapseItemListComponent } from './collapse-item-list.component';

describe('CollapseItemListComponent', () => {
  let component: CollapseItemListComponent;
  let fixture: ComponentFixture<CollapseItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollapseItemListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollapseItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
