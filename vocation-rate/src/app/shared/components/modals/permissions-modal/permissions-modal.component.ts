import { Component, OnInit } from '@angular/core';
import { BaseModalComponent } from '../base-modal.component';
import { TranslateService } from '@ngx-translate/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-permissions-modal',
  templateUrl: './permissions-modal.component.html',
  styleUrls: ['./permissions-modal.component.scss'],
})
export class PermissionsModalComponent
  extends BaseModalComponent
  implements OnInit
{
  constructor(
    private translate: TranslateService,
    public dialogRef: MatDialogRef<PermissionsModalComponent>
  ) {
    super(translate, dialogRef);
  }

  ngOnInit(): void {}
}
