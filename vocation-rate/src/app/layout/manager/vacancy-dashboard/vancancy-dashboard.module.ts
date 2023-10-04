import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VacancyDashboardComponent } from './vacancy-dashboard.component';
import { VacancyDashboardRoutingModule } from './vacancy-dasboard.routing';
import { CollapseItemListModule } from 'src/app/shared/components/collapse-item-list/collapse-item-list.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { VacancyDetailsComponent } from './vacancy-details/vacancy-details.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { AgmCoreModule } from '@agm/core';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';

@NgModule({
  declarations: [VacancyDashboardComponent, VacancyDetailsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    VacancyDashboardRoutingModule,
    CollapseItemListModule,
    SharedModule,
    TranslateModule,
    MatTabsModule,
    MatIconModule,
    CKEditorModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyD95W0lvAu6jV03YXxotXvBKI7EXC3VOPk",
      libraries: ['places']
    }),
    GooglePlaceModule
  ],
  providers: [{ provide: 'ckeditor', useValue: ClassicEditor }],
})
export class VacancyDashboardModule {}
