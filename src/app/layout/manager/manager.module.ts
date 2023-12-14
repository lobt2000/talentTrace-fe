import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarMenuModule } from 'src/app/shared/components/sidebar-menu/sidebar-menu.module';
import { ManagerRoutes } from './manager.routing';
import { ManagerComponent } from './manager.component';

@NgModule({
  declarations: [ManagerComponent],
  imports: [CommonModule, ManagerRoutes, SidebarMenuModule],
})
export class ManagerModule {}
