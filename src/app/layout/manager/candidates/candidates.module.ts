import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SidebarMenuModule } from 'src/app/shared/components/sidebar-menu/sidebar-menu.module';
import { CandidatesComponent } from './candidates.component';
import { CandidatesRoutes } from './candidates.routing';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { UiSearchComponent } from 'src/app/shared/components/ui/ui-search/ui-search.component';
import { MatIconModule } from '@angular/material/icon';
import { UiFilterComponent } from 'src/app/shared/components/ui/ui-filter/ui-filter.component';
import { UiSortComponent } from 'src/app/shared/components/ui/ui-sort/ui-sort.component';
import { CandidateCardComponent } from 'src/app/shared/components/candidate-card/candidate-card.component';
import { CandidateDetailsComponent } from 'src/app/shared/components/candidate-details/candidate-details.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [CandidatesComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SidebarMenuModule,
    TranslateModule,
    SharedModule,
    UiSearchComponent,
    MatIconModule,
    UiFilterComponent,
    UiSortComponent,
    CandidateCardComponent,
    CandidateDetailsComponent,
    CandidatesRoutes,
    MatDialogModule,
  ],
})
export class CandidatesModule {}
