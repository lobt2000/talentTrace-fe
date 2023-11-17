import { Component, Input } from '@angular/core';
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
  @Input() manager_team: Array<any> = [];
  @Input() emploee_details;
  @Input() managers: Array<any> = [];

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
      this.manager_team = this.manager_team.filter(
        (res) => res.id !== value.member.id,
      );
      this.updateManagersTeam();
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
          managers: this.managers,
          members: this.manager_team,
        },
      })
      .afterClosed()
      .pipe(filter((el) => el))
      .subscribe((el: IPersonChange) => {
        if (value.type === OptionType[OptionType.CHANGE]) {
          this.manager_team.push(el.member);
          this.manager_team = this.manager_team.filter(
            (res) => res.id !== value.member.id,
          );
          this.updateManagersTeam();
          // this.changeHiringTeam.emit(this.hiringTeam);
        } else if (el.type === OptionType[OptionType.ADD]) {
          this.manager_team.push(el.member);
          this.updateManagersTeam();
          // this.changeHiringTeam.emit(this.hiringTeam);
        } else if (el.type === OptionType[OptionType.DELETE]) {
          this.manager_team = this.manager_team.filter(
            (res) => res.id !== el.member.id,
          );
          this.updateManagersTeam();
          // this.changeHiringTeam.emit(this.hiringTeam);
        }
      });
  }

  onAddMember() {
    const body: IPersonChange = {
      type: OptionType[OptionType.ADD] as OptionTypeKeys,
      title: PersonEventTitle['ADD'],
    };
    this.onTriggerEvent(body);
  }

  updateManagersTeam() {
    this.employeeDashboardService
      .updateEmployee(this.emploee_details.id, {
        managers_team: this.manager_team.map((res) => res.id),
      })
      .subscribe();
  }

  get isAvailableUpdate() {
    return (
      this.emploee_details['hr'] === this.employeeDashboardService.currUser.name
    );
  }

  isCurrManager(manager) {
    return this.employeeDashboardService.currUser?.id === manager.id;
  }
}
