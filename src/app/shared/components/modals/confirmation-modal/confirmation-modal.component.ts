import { Component, OnInit, Inject } from '@angular/core';
import { BaseModalComponent } from '../base-modal.component';
import { TranslateService } from '@ngx-translate/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IConfirmationData } from 'src/app/shared/interfaces/common/common-confirmation-modal.interface';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
})
export class ConfirmationModalComponent
  extends BaseModalComponent
  implements OnInit
{
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IConfirmationData,
    private translate: TranslateService,
    public dialogRef: MatDialogRef<ConfirmationModalComponent>,
  ) {
    super(translate, dialogRef);
  }

  ngOnInit(): void {}
}
