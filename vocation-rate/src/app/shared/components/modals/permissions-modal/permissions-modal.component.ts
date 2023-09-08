import { Component, OnInit } from '@angular/core';
import { BaseModalComponent } from '../base-modal.component';
import { TranslateService } from '@ngx-translate/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, map, merge } from 'rxjs';

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
  constructor(
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

  ngOnInit(): void {
    this.permissionForm = this.fb.group({
      vacancies: this.fb.group({
        name: 'Vacancies',
        isAll: false,
        subpermission: this.fb.array([
          this.fb.group({
            name: 'Chat',
            checked: false,
          }),
          this.fb.group({
            name: 'Else',
            checked: false,
          }),
        ]),
      }),
      members: this.fb.group({
        name: 'Company Members',
        isAll: false,
        subpermission: this.fb.array([
          this.fb.group({
            name: 'Chat',
            checked: false,
          }),
          this.fb.group({
            name: 'Else',
            checked: false,
          }),
        ]),
      }),
    });

    this.permissionForm
      .get('vacancies')
      .get('isAll')
      .valueChanges.subscribe((res) => {
        this.setAll(res, 'vacancies');
      });

    merge(
      ...this.vacanciesFromSubPermissionArray['controls'].map(
        (control, index) => control.get('checked').valueChanges
      )
    )
      .pipe(debounceTime(100))
      .subscribe(() => {
        const isAllChecked = this.vacanciesFromSubPermissionArray.value.every(
          (el) => el.checked
        );
        this.getVacanciesFormGroup.patchValue(
          { isAll: isAllChecked },
          { emitEvent: false }
        );
      });

    this.permissionForm
      .get('members')
      .get('isAll')
      .valueChanges.subscribe((res) => {
        this.setAll(res, 'members');
      });

    merge(
      ...this.membersFromSubPermissionArray['controls'].map(
        (control, index) => control.get('checked').valueChanges
      )
    )
      .pipe(debounceTime(100))
      .subscribe(() => {
        const isAllChecked = this.membersFromSubPermissionArray.value.every(
          (el) => el.checked
        );
        this.getMembersFormGroup.patchValue(
          { isAll: isAllChecked },
          { emitEvent: false }
        );
      });
  }

  isAllChecked(type: string): boolean {
    return this.permissionForm.get(type).value.isAll;
  }

  getFormGroup(type: string) {
    return this.permissionForm.get(type);
  }

  getSubpermissionArray(type: string) {
    return this.permissionForm.get(type)['controls'].subpermission;
  }

  someComplete(type: string): boolean {
    return (
      this.getSubpermissionArray(type).value.filter((t) => t.checked).length >
        0 && !this.getFormGroup(type).value.isAll
    );
  }

  setAll(completed: boolean, type) {
    this.permissionForm
      .get(type)
      ['controls'].subpermission.controls.forEach((element) => {
        element.controls.checked.patchValue(completed);
      });
  }
}
