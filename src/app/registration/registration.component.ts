import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonUrls } from '../shared/constansts/common/common.constants';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  registration(event) {
    localStorage.setItem('userType', 'manager');
    this.router.navigate([CommonUrls.Manager]);
  }
}
