import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionByUploadingComponent } from './addition-by-uploading.component';

describe('AdditionByUploadingComponent', () => {
  let component: AdditionByUploadingComponent;
  let fixture: ComponentFixture<AdditionByUploadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionByUploadingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdditionByUploadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
