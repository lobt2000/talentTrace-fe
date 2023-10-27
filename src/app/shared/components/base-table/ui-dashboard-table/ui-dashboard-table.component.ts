import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { BaseTableComponent } from '../base-table.component';
import { TranslateService } from '@ngx-translate/core';
import { ColumnModel } from 'src/app/shared/models/column.model';

@Component({
  selector: 'app-ui-dashboard-table',
  templateUrl: './ui-dashboard-table.component.html',
  styleUrls: ['./ui-dashboard-table.component.scss'],
})
export class UiDashboardTableComponent
  extends BaseTableComponent
  implements OnInit
{
  isLoading: boolean = false;
  customSort = { column: 'lastDueDate', order: true };
  @Input() columns: ColumnModel[];
  @Input() rows: any[];
  @Output() goToPermissions: EventEmitter<any> = new EventEmitter();
  @Output() goToItem: EventEmitter<any> = new EventEmitter();
  constructor(private translate: TranslateService) {
    super(translate);
  }

  ngOnInit(): void {}

  getArrowClass(index: number): string {
    let arrow: string;
    if (index !== this.activeIndex) {
      arrow = '';
    } else {
      if (this.isSortAsc) {
        arrow = 'up';
      } else {
        arrow = 'down';
      }
    }
    return arrow;
  }

  onGoToPermissions(item) {
    this.goToPermissions.emit(item);
  }

  onGoToItem(item) {
    this.goToItem.emit(item);
  }
}
