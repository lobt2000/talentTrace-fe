import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadingAdditionComponent } from './uploading-addition.component';

describe('UploadingAdditionComponent', () => {
  let component: UploadingAdditionComponent;
  let fixture: ComponentFixture<UploadingAdditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadingAdditionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadingAdditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
