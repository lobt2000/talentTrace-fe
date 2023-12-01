import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { VacancyDashboardComponent } from './vacancy-dashboard.component';
import { VacancyDashboardRoutingModule } from './vacancy-dasboard.routing';
import { CollapseItemListModule } from 'src/app/shared/components/collapse-item-list/collapse-item-list.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [VacancyDashboardComponent],
  imports: [
    CommonModule,
    VacancyDashboardRoutingModule,
    CollapseItemListModule,
    SharedModule,
    TranslateModule,
    // AgmCoreModule.forRoot({
    //   apiKey: "AIzaSyD95W0lvAu6jV03YXxotXvBKI7EXC3VOPk",
    //   libraries: ['places']
    // }),
    // GooglePlaceModule
  ],
})
export class VacancyDashboardModule {}
