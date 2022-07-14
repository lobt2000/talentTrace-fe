import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InitialPageComponent } from './initial-page.component';
import { InitialPageRoutingModule } from './initial-page-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    InitialPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InitialPageRoutingModule,
    HttpClientModule,
    TranslateModule,
    SharedModule
  ],
  providers: [],
})
export class InitialPageModule { }
