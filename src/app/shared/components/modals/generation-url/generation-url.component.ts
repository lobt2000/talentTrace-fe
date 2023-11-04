import { Component, OnInit, Inject } from '@angular/core';
import { BaseModalComponent } from '../base-modal.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-generation-url',
  templateUrl: './generation-url.component.html',
  styleUrls: ['./generation-url.component.scss'],
})
export class GenerationUrlComponent
  extends BaseModalComponent
  implements OnInit
{
  url: string = 'http://localhost:4200/managerRegistration';
  isCopy: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: string | number },
    private translate: TranslateService,
    public dialogRef: MatDialogRef<GenerationUrlComponent>,
  ) {
    super(translate, dialogRef);
  }

  ngOnInit(): void {
    this.url += `?id=${this.data.id}`;
  }

  copyUrl() {
    this.isCopy = true;
  }
}
