import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonUrls } from '../shared/constansts/common/common.constants';
import { AuthService } from '../service/auth.service';
import { LoadingService } from '../service/loading.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private loadingService: LoadingService,
  ) {}

  ngOnInit() {}

  registrationCompany(event) {
    console.log(event);
    this.loadingService.setLoading(true);
    this.authService.signUpCompany(event).subscribe((res) => {
      this.authService.setValueToLocalBase(res.user.role);
      this.loadingService.setLoading(false);
    });
  }

  registrationUser(event) {
    this.loadingService.setLoading(true);
    this.authService.signUpUser(event).subscribe((res) => {
      this.authService.setValueToLocalBase(res.user.role);
      this.loadingService.setLoading(false);
    });
  }
}
