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
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { MatIconModule } from '@angular/material/icon';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
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
