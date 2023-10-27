import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SidebarMenuModule } from 'src/app/shared/components/sidebar-menu/sidebar-menu.module';
import { ManagerRoutes } from './manager.routing';
import { ManagerComponent } from './manager.component';

@NgModule({
  declarations: [ManagerComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ManagerRoutes,
    SidebarMenuModule,
  ],
})
export class ManagerModule {}
