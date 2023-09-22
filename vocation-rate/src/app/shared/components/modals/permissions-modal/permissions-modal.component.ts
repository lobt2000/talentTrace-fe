import { Component, Inject, OnInit } from '@angular/core';
import { BaseModalComponent } from '../base-modal.component';
import { TranslateService } from '@ngx-translate/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, map, merge } from 'rxjs';
import { permissionsObjects } from 'src/app/shared/constansts/permissions';

@Component({
  selector: 'app-permissions-modal',
  templateUrl: './permissions-modal.component.html',
  styleUrls: ['./permissions-modal.component.scss'],
})
export class PermissionsModalComponent
  extends BaseModalComponent
  implements OnInit
{
  permissionForm: FormGroup;
  isOpen = {
    vacancies: true,
    members: true,
  };
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private translate: TranslateService,
    public dialogRef: MatDialogRef<PermissionsModalComponent>,
    private fb: FormBuilder
  ) {
    super(translate, dialogRef);
  }

  get getVacanciesFormGroup() {
    return this.permissionForm.get('vacancies');
  }

  get isAllVacanciesChecked() {
    return this.permissionForm.get('vacancies').value.isAll;
  }

  get vacanciesFromSubPermissionArray() {
    return this.permissionForm.get('vacancies')['controls'].subpermission;
  }

  get getMembersFormGroup() {
    return this.permissionForm.get('members');
  }

  get isAllMembersChecked() {
    return this.permissionForm.get('members').value.isAll;
  }

  get membersFromSubPermissionArray() {
    return this.permissionForm.get('members')['controls'].subpermission;
  }

  isAllChecked(type: string): boolean {
    return this.permissionForm.get(type).value.isAll;
  }

  areAllChecked(array) {
    return array.every((el) => el.checked);
  }

  ngOnInit(): void {
    this.permissionForm = this.fb.group({
      vacancies: this.fb.group({
        name: 'Vacancies',
        isAll: false,
        subpermission: this.fb.array([
          this.fb.group({
            name: 'Possibility to send a messages',
            type: 'select',
            checked: false,
            selectValue: [null, [Validators.required]],
            options: this.fb.array([
              this.fb.group({
                name: 'All',
                type: 'normal',
              }),
              this.fb.group({
                name: 'Only managers',
                type: 'normal',
              }),
              this.fb.group({
                name: 'No one',
                type: 'normal',
              }),
            ]),
          }),
          this.fb.group({
            name: 'Generating a link for the candidate',
            checked: false,
            type: 'checkbox',
          }),
          this.fb.group({
            name: 'Possibility to write comments for vacancy',
            checked: false,
            type: 'checkbox',
          }),
          this.fb.group({
            name: 'Possibility to manage vacancies',
            type: 'multiple-select',
            checked: false,
            selectValue: [null, [Validators.required]],
            options: this.fb.array([
              this.fb.group({
                name: 'All',
                type: 'normal',
              }),
              this.fb.group({
                name: 'Only managers',
                type: 'normal',
              }),
              this.fb.group({
                name: 'No one',
                type: 'normal',
              }),
            ]),
          }),
        ]),
      }),
      members: this.fb.group({
        name: 'Company Members',
        isAll: false,
        subpermission: this.fb.array([
          this.fb.group({
            name: 'Possibility to send a messages',
            type: 'select',
            checked: false,
            selectValue: [null, [Validators.required]],
            options: this.fb.array([
              this.fb.group({
                name: 'All',
                type: 'normal',
              }),
              this.fb.group({
                name: 'Only managers',
                type: 'normal',
              }),
              this.fb.group({
                name: 'No one',
                type: 'normal',
              }),
            ]),
          }),
          this.fb.group({
            name: 'Generating a link for the candidate',
            checked: false,
            type: 'checkbox',
          }),
          this.fb.group({
            name: 'Possibility to write comments for vacancy',
            checked: false,
            type: 'checkbox',
          }),
          this.fb.group({
            name: 'Possibility to send a messages',
            type: 'multiple-select',
            checked: false,
            selectValue: [null, [Validators.required]],
            options: this.fb.array([
              this.fb.group({
                name: 'All',
                checked: false,
              }),
              this.fb.group({
                name: 'Only managers',
                checked: false,
              }),
              this.fb.group({
                name: 'No one',
                checked: false,
              }),
            ]),
          }),
        ]),
      }),
    });

    this.permissionForm
      .get('vacancies')
      .get('isAll')
      .valueChanges.subscribe((res) => {
        if (res) {
          this.isOpen.vacancies = true;
        }
        this.setAll(res, 'vacancies');
      });

    merge(
      ...this.vacanciesFromSubPermissionArray['controls'].map(
        (control, index) => control.get('checked').valueChanges
      )
    )
      .pipe(debounceTime(100))
      .subscribe(() => {
        const isAllChecked = this.areAllChecked(
          this.vacanciesFromSubPermissionArray.value
        );
        this.getVacanciesFormGroup.patchValue(
          { isAll: isAllChecked },
          { emitEvent: false }
        );
      });

    merge(
      ...this.vacanciesFromSubPermissionArray['controls']
        .filter((control) => control.get('selectValue'))
        .map((control) => control.get('selectValue').valueChanges)
    )
      .pipe(debounceTime(100))
      .subscribe((res) => {
        this.multiSlectorsControls('vacancies', res);
      });

    this.permissionForm
      .get('members')
      .get('isAll')
      .valueChanges.subscribe((res) => {
        if (res) {
          this.isOpen.members = true;
        }
        this.setAll(res, 'members');
      });

    merge(
      ...this.membersFromSubPermissionArray['controls'].map(
        (control, index) => control.get('checked').valueChanges
      )
    )
      .pipe(debounceTime(100))
      .subscribe(() => {
        const isAllChecked = this.areAllChecked(
          this.membersFromSubPermissionArray.value
        );
        this.getMembersFormGroup.patchValue(
          { isAll: isAllChecked },
          { emitEvent: false }
        );
      });

    merge(
      ...this.membersFromSubPermissionArray['controls']
        .filter((control) => control.get('selectValue'))
        .map((control) => control.get('selectValue').valueChanges)
    )
      .pipe(debounceTime(100))
      .subscribe((res: any) => {
        this.multiSlectorsControls('members', res);
      });

    if (this.data && this.data.permissions) {
      this.updatePermission();
    }
  }

  updatePermission() {
    const dataPermissions = this.data.permissions;
    for (const prop in dataPermissions) {

      this.getSubpermissionArray(prop)['controls'].forEach((control) => {
        const availablePermission = dataPermissions[prop].find(
          (el) => el.name === control.value.name
        );
        if (control.get('selectValue')) {
          control.patchValue({
            checked: true,
            selectValue:
              control.value.type == 'multiple-select'
                ? permissionsObjects.children
                    .filter((el) =>
                      availablePermission.children.some(
                        (per) => per.id === el.id
                      )
                    )
                    .map((el) => el.name)
                : permissionsObjects.children.find(
                    (el) => el.id == availablePermission.children
                  ).name,
          });
        } else {
          control.patchValue({ checked: true });
        }
      });
    }
  }

  getFormGroup(type: string) {
    return this.permissionForm.get(type);
  }

  getSubpermissionArray(type: string) {
    return this.permissionForm.get(type)['controls'].subpermission;
  }

  getControlsInsideSubpermissions(type, index, control) {
    return this.getFormGroup(type)['controls'].subpermission['controls'][index][
      'controls'
    ][control];
  }

  someComplete(type: string): boolean {
    return (
      this.getSubpermissionArray(type).value.filter((t) => t.checked).length >
        0 && !this.getFormGroup(type).value.isAll
    );
  }

  changeSelectValue(type: string, value) {
    this.getSubpermissionArray(type)
      ['controls'].filter(
        (control) =>
          control.get('selectValue') && control.get('selectValue').value
      )
      .forEach((control) => {
        control.patchValue(value, { emitEvent: false });
      });
  }

  setAll(completed: boolean, type) {
    this.permissionForm
      .get(type)
      ['controls'].subpermission.controls.forEach((element) => {
        element.controls.checked.patchValue(completed);
        if (completed && element.get('selectValue')) {
          const elementValue = element.value;
          element
            .get('selectValue')
            .patchValue(
              elementValue.type == 'select'
                ? elementValue.options[0].name
                : [elementValue.options[0].name]
            );
        }
      });
    if (!completed) {
      this.changeSelectValue(type, { selectValue: null });
    }
  }

  toggleBlockPermission(type: string, event?) {
    if (event && event.target.className.includes('mat-checkbox')) return;
    this.isOpen[type] = !this.isOpen[type];
  }

  formPatchValue(control, value, emitEvent) {
    control.patchValue(value, { emitEvent: emitEvent });
  }

  multiSlectorsControls(type, res) {
    let selectedValue = [];
    if (typeof res == 'object') {
      this.getSubpermissionArray(type)
        ['controls'].filter(
          (control) =>
            control.get('selectValue') &&
            control.get('selectValue').value &&
            typeof control.get('selectValue').value == 'object'
        )
        .forEach((control) => {
          const selectValue = control.get('selectValue');
          const options = control.get('options');
          const optionsControlsArray = control.get('options').controls;
          if (selectValue.value.includes('All')) {
            if (selectValue.value.length == 1) {
              optionsControlsArray.forEach((option) =>
                this.formPatchValue(option, { checked: true }, false)
              );

              this.formPatchValue(
                selectValue,
                [...control.value.options.map((el) => el.name)],
                false
              );
            } else {
              if (
                options.value[0].checked &&
                selectValue.value.length < options.value.length
              ) {
                this.formPatchValue(
                  optionsControlsArray[0],
                  { checked: false },
                  false
                );

                this.formPatchValue(
                  selectValue,
                  [...selectValue.value.filter((el) => el !== 'All')],
                  false
                );
              } else {
                this.formPatchValue(
                  optionsControlsArray[0],
                  { checked: true },
                  false
                );
                this.formPatchValue(
                  selectValue,
                  [...options.value.map((el) => el.name)],
                  false
                );
              }
            }
          } else {
            if (options.value[0].checked) {
              optionsControlsArray.forEach((option) =>
                this.formPatchValue(option, { checked: false }, false)
              );
              this.formPatchValue(selectValue, [], false);
            } else {
              let filteredOptions = [];
              if (options.value.length - 1 === selectValue.value.length) {
                this.formPatchValue(
                  optionsControlsArray[0],
                  { checked: true },
                  false
                );
                filteredOptions = options.value.map((el) => el.name);
              } else {
                optionsControlsArray.forEach((option) => {
                  if (
                    (option.value.name === 'All' && option.value.checked) ||
                    !selectValue.value.includes(option.value.name)
                  ) {
                    this.formPatchValue(option, { checked: false }, false);
                  } else {
                    this.formPatchValue(option, { checked: true }, false);
                    filteredOptions.push(option.value.name);
                  }
                });
              }

              selectValue.patchValue([...filteredOptions], {
                emitEvent: false,
              });
            }
          }
          selectedValue = selectValue.value;
        });
    }

    this.changeSelectValue(type, {
      checked: Boolean(selectedValue.length),
    });
  }

  closeModalWithValue() {
    this.onClose(this.permissionForm.getRawValue());
  }
}
