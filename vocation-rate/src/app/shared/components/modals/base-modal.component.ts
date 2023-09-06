import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-base-modal',
  template: '',
})
export class BaseModalComponent {
  constructor(
    protected translateService: TranslateService,
    public dialogRef: MatDialogRef<BaseModalComponent>
  ) {}

  onClose() {
    this.dialogRef.close();
  }
}
