import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CollapseItemListModule } from 'src/app/shared/components/collapse-item-list/collapse-item-list.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
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
import { VacancyDetailsRoutingModule } from './vacancy-dasboard.routing';
import { VacancyDetailsComponent } from './vacancy-details.component';
import { CandidatesListComponent } from './candidates-list/candidates-list.component';
import { CandidateCardComponent } from 'src/app/shared/components/candidate-card/candidate-card.component';
import { ClickOutsideDirective } from 'src/app/shared/directives/click-outside.directive';
import { UiSearchComponent } from 'src/app/shared/components/ui/ui-search/ui-search.component';
import { UiFilterComponent } from 'src/app/shared/components/ui/ui-filter/ui-filter.component';
import { UiSortComponent } from 'src/app/shared/components/ui/ui-sort/ui-sort.component';



@NgModule({
  declarations: [VacancyDetailsComponent, CandidatesListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    VacancyDetailsRoutingModule,
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
    CollapseItemListModule,
    CandidateCardComponent,
    ClickOutsideDirective,
    UiSearchComponent,
    UiFilterComponent,
    UiSortComponent
  ],
  providers: [{ provide: 'ckeditor', useValue: ClassicEditor }],
})
export class VacancyDetailsModule {}
