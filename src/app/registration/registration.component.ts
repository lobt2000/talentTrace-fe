import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonUrls } from '../shared/constansts/common/common.constants';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit() {}

  registration(event) {
    console.log(event);
    this.authService.signUpCompany(event).subscribe((res) => {
      console.log(res);
    });
    // localStorage.setItem('userType', 'manager');
    // this.router.navigate([CommonUrls.Manager]);
  }
}
