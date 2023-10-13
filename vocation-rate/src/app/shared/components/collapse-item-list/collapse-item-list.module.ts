import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CollapseItemListComponent } from './collapse-item-list.component';
import { MoreOptionsComponent } from '../more-options/more-options.component';

@NgModule({
  declarations: [CollapseItemListComponent],
  imports: [CommonModule, TranslateModule, MoreOptionsComponent],
  exports: [CollapseItemListComponent],
})
export class CollapseItemListModule {}
