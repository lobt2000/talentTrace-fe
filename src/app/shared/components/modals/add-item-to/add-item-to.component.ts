import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseModalComponent } from '../base-modal.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { IPersonChange } from 'src/app/layout/manager/vacancy-dashboard/shared/models/person-change.interface';
import { PersonCardComponent } from 'src/app/layout/manager/vacancy-dashboard/shared/components/person-card/person-card.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-item-to',
  standalone: true,
  imports: [CommonModule, PersonCardComponent, MatIconModule],
  templateUrl: './add-item-to.component.html',
  styleUrls: ['./add-item-to.component.scss'],
})
export class AddItemToComponent extends BaseModalComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IPersonChange,
    private translate: TranslateService,
    public dialogRef: MatDialogRef<AddItemToComponent>,
  ) {
    super(translate, dialogRef);
  }

  ngOnInit(): void {
    console.log(this.data);
  }

  onTriggerEvent(value: IPersonChange) {
    const body: IPersonChange = {
      type: this.data.type,
      title: this.data.title,
      ...value,
    };
    this.onClose(body);
  }

  get filteredItems(): any[] {
    return this.data.items.filter(
      (el) => !this.data.members.some((res) => res.id === el.id),
    );
  }
}
