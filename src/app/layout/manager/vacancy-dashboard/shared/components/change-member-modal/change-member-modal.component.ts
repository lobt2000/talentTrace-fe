import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ClickOutsideDirective } from 'src/app/shared/directives/click-outside.directive';
import { PersonCardComponent } from '../person-card/person-card.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { BaseModalComponent } from 'src/app/shared/components/modals/base-modal.component';
import { IPersonChange } from '../../models/person-change.interface';

@Component({
  selector: 'app-change-member-modal',
  templateUrl: './change-member-modal.component.html',
  styleUrls: ['./change-member-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    ClickOutsideDirective,
    PersonCardComponent,
  ],
})
export class ChangeMemberModalComponent extends BaseModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IPersonChange,
    private translate: TranslateService,
    public dialogRef: MatDialogRef<ChangeMemberModalComponent>
  ) {
    super(translate, dialogRef);
  }

  onTriggerEvent(value: IPersonChange) {
    const body: IPersonChange = {
      type: this.data.type,
      title: this.data.title,
      ...value,
    };
    this.onClose(body);
  }
}
