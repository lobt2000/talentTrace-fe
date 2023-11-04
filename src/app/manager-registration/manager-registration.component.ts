import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Location } from '@angular/common';
import { AuthService } from '../service/auth.service';
import { LoadingService } from '../service/loading.service';
import { tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manager-registration',
  templateUrl: './manager-registration.component.html',
  styleUrls: ['./manager-registration.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatIconModule],
})
export class ManagerRegistrationComponent implements OnInit {
  formUpdatePass: FormGroup;
  hidePass: boolean = true;
  hideConfirmPass: boolean = true;
  managerId: string;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private authService: AuthService,
    private loadingService: LoadingService,
    private activeRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.managerId = this.activeRoute.snapshot.queryParams['id'];
    console.log(this.managerId);

    this.buildForm();
  }

  buildForm() {
    this.formUpdatePass = this.fb.group({
      confirmPassword: this.fb.control('adasA231@dasdas', [
        Validators.required,
        this.confirmPassValidator(),
        Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[#$@!%&|?\\/<>~""\'\';:*?])[A-Za-z\\d#$@!%&|?\\/<>~""\'\';:*?]{8,30}$',
        ),
      ]),

      password: this.fb.control('adasA231@dasdas', [
        Validators.required,
        Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[#$@!%&|?\\/<>~""\'\';:*?])[A-Za-z\\d#$@!%&|?\\/<>~""\'\';:*?]{8,30}$',
        ),
      ]),
    });
  }

  confirmPassValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      this.formUpdatePass?.value?.password !== control.value
        ? { notmatch: 'This value should be the same as password' }
        : null;
  }

  onSubmit() {
    if (!this.formUpdatePass.valid) return;
    this.loadingService.setLoading(true);
    const body = {
      ...this.formUpdatePass.getRawValue(),
      id: this.managerId,
    };
    this.authService
      .updateManagerPass(body)
      .pipe(
        tap((res) => {
          this.authService.setValueToLocalBase(res.user.role);
          this.loadingService.setLoading(false);
        }),
      )
      .subscribe();
  }

  goBack() {
    this.location.back();
  }
}
