import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-base-modal',
  template: '',
})
export class BaseModalComponent {
  constructor(
    protected translateService: TranslateService,
    public dialogRef: MatDialogRef<BaseModalComponent>
  ) {}

  onClose(value?) {
    this.dialogRef.close(value);
  }
}
