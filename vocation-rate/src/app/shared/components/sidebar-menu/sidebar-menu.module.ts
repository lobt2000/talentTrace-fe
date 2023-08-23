import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarMenuComponent } from './sidebar-menu.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [SidebarMenuComponent],
  imports: [CommonModule, RouterModule, TranslateModule],
  exports: [SidebarMenuComponent],
})
export class SidebarMenuModule {}
