import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs';
import { ChangeMemberModalComponent } from 'src/app/layout/manager/vacancy-dashboard/shared/components/change-member-modal/change-member-modal.component';
import {
  IPersonChange,
  PersonEventTitle,
} from 'src/app/layout/manager/vacancy-dashboard/shared/models/person-change.interface';
import {
  OptionType,
  OptionTypeKeys,
} from 'src/app/shared/constansts/optionType.model';
import { EmployeeDashboardService } from '../../../services/employee-dashboard.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { PersonCardComponent } from 'src/app/layout/manager/vacancy-dashboard/shared/components/person-card/person-card.component';

@Component({
  selector: 'app-managers-team',
  templateUrl: './managers-team.component.html',
  styleUrls: ['./managers-team.component.scss'],
  standalone: true,
  imports: [MatIconModule, CommonModule, PersonCardComponent],
})
export class ManagersTeamComponent {
  isOpenOption: boolean = false;

  constructor(
    private dialog: MatDialog,
    private employeeDashboardService: EmployeeDashboardService,
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
