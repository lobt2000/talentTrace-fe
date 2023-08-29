import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CollapseItemListComponent } from './collapse-item-list.component';

@NgModule({
  declarations: [CollapseItemListComponent],
  imports: [CommonModule, TranslateModule],
  exports: [CollapseItemListComponent],
})
export class CollapseItemListModule {}
