import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarMenuModule } from 'src/app/shared/components/sidebar-menu/sidebar-menu.module';
import { CandidatesComponent } from './candidates.component';
import { CandidatesRoutes } from './candidates.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { UiSearchComponent } from 'src/app/shared/components/ui/ui-search/ui-search.component';
import { MatIconModule } from '@angular/material/icon';
import { UiFilterComponent } from 'src/app/shared/components/ui/ui-filter/ui-filter.component';
import { UiSortComponent } from 'src/app/shared/components/ui/ui-sort/ui-sort.component';
import { CandidateCardComponent } from 'src/app/shared/components/candidate-card/candidate-card.component';
import { CandidateDetailsComponent } from 'src/app/shared/components/candidate-details/candidate-details.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [CandidatesComponent],
  imports: [
    CommonModule,
    SidebarMenuModule,
    SharedModule,
    UiSearchComponent,
    MatIconModule,
    UiFilterComponent,
    UiSortComponent,
    CandidateCardComponent,
    CandidateDetailsComponent,
    CandidatesRoutes,
    MatDialogModule,
    TranslateModule,
  ],
})
export class CandidatesModule {}
