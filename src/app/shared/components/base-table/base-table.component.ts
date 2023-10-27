import { Component, Input } from '@angular/core';
import { ColumnModel, ColumnTypes } from '../../models/column.model';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { UntypedFormControl } from '@angular/forms';

@Component({
  selector: 'app-base-table',
  template: '',
})
export class BaseTableComponent {
  @Input() isCustomSort;
  @Input() isCustomSearch;
  searchControl = new UntypedFormControl();
  columnTypes = ColumnTypes;
  activeIndex = -1;
  isSortAsc: boolean = true;
  sortBy = '';
  search = '';
  rows = [];
  columns: ColumnModel[];
  constructor(protected translateService: TranslateService) {}

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
  defaultSort(column: ColumnModel, index: number): void {
    if (!column.hiddenSort) {
      this.toggleSort(column, index);
      this.sort(column);
    }
  }

  toggleSort(column: ColumnModel, index: number): void {
    if (!column.hiddenSort) {
      if (this.activeIndex === index) {
        this.isSortAsc = !this.isSortAsc;
      } else {
        this.activeIndex = index;
        this.isSortAsc = true;
      }
    }
  }
  sort(column) {
    const sortIndex = this.isSortAsc ? 1 : -1;
    this.rows.sort((a, b) => {
      return sortIndex * this.comparatorFunction(a, b, column);
    });
  }

  comparatorFunction(a, b, column): 0 | 1 | -1 {
    if (column.sortFn) {
      return column.sortFn(a, b);
    }
    if (column?.cell?.type == ColumnTypes.class) {
      const class1 = a[column.field];
      const class2 = b[column.field];
      const level1 = parseInt(class1, 10);
      const level2 = parseInt(class2, 10);
      const name1 = class1.replace(/\d+/g, '').replace(/-/g, '');
      const name2 = class2.replace(/\d+/g, '').replace(/-/g, '');
      //   const order1 = OrderLevels.find((el) => name1 == el.name)?.order;
      //   const order2 = OrderLevels.find((el) => name2 == el.name)?.order;
      /*console.log(a[column.field]);
      console.log(name1);
      console.log('---second---');
      console.log(b[column.field]);
      console.log(name2);
      console.log('---------new---------');*/
      //   if (order1 > order2) {
      //     return 1;
      //   } else if (order1 < order2) {
      //     return -1;
      //   } else if (name1 == name2) {
      //     if (level1 > level2) {
      //       return 1;
      //     } else if (level1 < level2) {
      //       return -1;
      //     }
      //   }
      return 0;
    }
    if (column?.cell?.type == ColumnTypes.date) {
      const date1 = a[column.field];
      const date2 = b[column.field];
      if (moment(date1).isAfter(date2)) {
        return 1;
      } else if (moment(date2).isAfter(date1)) {
        return -1;
      }
      return 0;
    }
    return this.cleanComparator(a[column.field] || 0, b[column.field] || 0);
  }

  cleanComparator(a: unknown, b: unknown): 0 | 1 | -1 {
    if (a > b) {
      return 1;
    } else if (a < b) {
      return -1;
    }
    return 0;
  }
  hasTranslation(key: any): boolean {
    if (typeof key == 'string') {
      const translation = this.translateService.instant(key);
      return translation !== key && translation !== '';
    }
    return false;
  }
  onSearch(str: string) {
    this.search = str;
  }
}
