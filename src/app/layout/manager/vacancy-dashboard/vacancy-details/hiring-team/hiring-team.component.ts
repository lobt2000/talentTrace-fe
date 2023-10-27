import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChangeMemberModalComponent } from '../../shared/components/change-member-modal/change-member-modal.component';
import {
  IPersonChange,
  PersonEventTitle,
} from '../../shared/models/person-change.interface';
import { filter } from 'rxjs';
import {
  OptionType,
  OptionTypeKeys,
} from 'src/app/shared/constansts/optionType.model';
import { VacancyDashboardService } from '../../services/vacancy-dashboard.service';

@Component({
  selector: 'app-hiring-team',
  templateUrl: './hiring-team.component.html',
  styleUrls: ['./hiring-team.component.scss'],
})
export class HiringTeamComponent {
  isOpenOption: boolean = false;

  constructor(
    private dialog: MatDialog,
    private vacancyDashboardService: VacancyDashboardService,
  ) {}

  onTriggerEvent(value: IPersonChange) {
    // Should add BE Integration
    if (!value.type && !OptionType[value.type]) return;
    if (
      value.type === OptionType[OptionType.CHANGE] ||
      value.type === OptionType[OptionType.ADD]
    ) {
      this.openChangeModal(value);
    } else if (value.type === OptionType[OptionType.DELETE]) {
    } else if (value.type === OptionType[OptionType.SEND_MESSAGE]) {
    }
  }

  openChangeModal(value: IPersonChange) {
    this.dialog.closeAll();
    this.dialog
      .open(ChangeMemberModalComponent, {
        width: '60vw',
        height: '600px',
        position: {
          left: 'calc(50% - 20vw)',
        },
        data: {
          title: value.title,
          type: value.type,
        },
      })
      .afterClosed()
      .pipe(filter((el) => el))
      .subscribe((el: IPersonChange) => {});
  }

  onAddMember() {
    const body: IPersonChange = {
      type: OptionType[OptionType.ADD] as OptionTypeKeys,
      title: PersonEventTitle['ADD'],
    };
    this.onTriggerEvent(body);
  }
}
