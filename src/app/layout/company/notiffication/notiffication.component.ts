import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { NotifficationService } from './services/notiffication.service';
import { Router } from '@angular/router';
import { CommonUrls } from 'src/app/shared/constansts/common/common.constants';
import {
  notifficationEnum,
  notifficationEnumKeys,
} from 'src/app/shared/constansts/notiffication.model';
import { LoadingService } from 'src/app/service/loading.service';

@Component({
  selector: 'app-notiffication',
  templateUrl: './notiffication.component.html',
  styleUrls: ['./notiffication.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModule, TranslateModule],
})
export class NotifficationComponent implements OnInit {
  notiffications: Array<any>;

  constructor(
    private notifficationService: NotifficationService,
    private router: Router,
    private loadingService: LoadingService,
  ) {}

  ngOnInit(): void {
    this.notifficationService.getCompanyNotiffication().subscribe((res) => {
      this.notiffications = res.data.notiffications;
      console.log(this.notiffications);
    });
  }

  acceptNotiffiAction(notiffication) {
    this.router.navigate(
      [CommonUrls.Company, 'manager-department', 'add-manually'],
      {
        queryParams: {
          actionType: 'creation',
          id: notiffication.managerId,
          notifficationId: notiffication._id,
        },
      },
    );
  }

  declineNotiffiAction(notiffication) {
    this.loadingService.setLoading(true);
    this.notifficationService
      .declineNotiffication(notiffication._id)
      .subscribe((res) => {
        notiffication.active = false;
        this.loadingService.setLoading(false);
      });
  }

  getNotifficationTitle(notiffication: notifficationEnumKeys): string {
    return notifficationEnum[notiffication];
  }
}
