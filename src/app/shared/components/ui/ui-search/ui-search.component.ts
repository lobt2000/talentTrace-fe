import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  ExistingProvider,
  Input,
  OnDestroy,
  OnInit,
  Output,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  UntypedFormControl,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { Subject, debounceTime, takeUntil } from 'rxjs';

export const CONTROL_UI_SEARCH: ExistingProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => UiSearchComponent),
  multi: true,
};

interface ILookUp {
  id: number;
  name: string;
}

@Component({
  selector: 'app-ui-search',
  templateUrl: './ui-search.component.html',
  styleUrls: ['./ui-search.component.scss'],
  providers: [CONTROL_UI_SEARCH],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule, MatIconModule]
})
export class UiSearchComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  @Input() placeholder: string = '';
  @Input() items: ILookUp[] = [];
  @Input() isChangeStyle: boolean;
  onChange: any;
  isOpened: boolean;
  destroy$: Subject<boolean> = new Subject<boolean>();
  search = new UntypedFormControl();
  activeItem = 0;
  @Output() changed = new EventEmitter();
  constructor() {}

  ngOnInit(): void {
    this.search.valueChanges
      .pipe(debounceTime(500), takeUntil(this.destroy$))
      .subscribe((str) => {
        if (str?.hasOwnProperty('id')) {
          return false;
        }
        this.changed.emit(str || '');
        if (this.onChange) {
          this.onChange(str);
        }
      });
  }
  resetSearch() {
    this.search.reset();
    this.onChange('');
    // this.changed.emit('');
  }
  onSelect(item) {
    this.activeItem = item.id;
    this.onChange(item.hasOwnProperty('fullName') ? item.fullName : item.name);
    this.changed.emit(
      item.hasOwnProperty('fullName') ? item.fullName : item.name
    );
    // this.selectItem.emit(this.activeItem);
  }
  displayFn(item) {
    return item
      ? item.hasOwnProperty('fullName')
        ? item.fullName
        : item.name
      : '';
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  writeValue(value) {
    this.search.patchValue(value, { emitEvent: false });
  }

  registerOnTouched(fn: () => void) {}
  registerOnChange(fn: () => void) {
    this.onChange = fn;
  }
}
