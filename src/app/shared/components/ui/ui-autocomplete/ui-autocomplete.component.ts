import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  FormControl,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Subject, debounceTime, takeUntil } from 'rxjs';

@Component({
  selector: 'app-ui-autocomplete',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    AsyncPipe,
  ],
  templateUrl: './ui-autocomplete.component.html',
  styleUrls: ['./ui-autocomplete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: UiAutocompleteComponent,
    },
  ],
})
export class UiAutocompleteComponent
  implements OnDestroy, ControlValueAccessor, OnInit
{
  @Input({ required: true }) options: Array<any> = [];
  @Input() title: string = '';
  form = new FormControl('', [Validators.required]);
  destroy$ = new Subject();

  onChange = (val: any | null) => {};
  onTouched = () => {};
  ngOnInit(): void {
    this.form.valueChanges
      .pipe(debounceTime(300), takeUntil(this.destroy$))
      .subscribe((res) => {
        console.log(res);
        this.onChange(res);
      });
  }

  writeValue(val: any | null) {
    if (!val) this.form.markAllAsTouched();
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  markAsTouched() {
    console.log('here');

    this.onTouched();
  }

  displayFn(value) {
    return typeof value === 'object' ? value?.name : value;
  }

  getOptionValue(option): string {
    return typeof option === 'object' ? option?.name : option;
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.unsubscribe();
  }
}
