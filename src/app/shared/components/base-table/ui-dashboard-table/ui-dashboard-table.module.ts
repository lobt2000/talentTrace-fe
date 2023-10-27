import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { UiDashboardTableComponent } from './ui-dashboard-table.component';

@NgModule({
  declarations: [UiDashboardTableComponent],
  imports: [CommonModule, RouterModule, TranslateModule],
  exports: [UiDashboardTableComponent],
})
export class UiDashboardTableModule {}
