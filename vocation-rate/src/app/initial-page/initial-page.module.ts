import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InitialPageComponent } from './initial-page.component';
import { InitialPageRoutingModule } from './initial-page-routing.module';

@NgModule({
  declarations: [
    InitialPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InitialPageRoutingModule,
    HttpClientModule
  ],
  providers: [],
})
export class InitialPageModule { }
