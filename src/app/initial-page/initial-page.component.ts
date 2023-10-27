import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonUrls } from '../shared/constansts/common/common.constants';

@Component({
  selector: 'app-initial-page',
  templateUrl: './initial-page.component.html',
  styleUrls: ['./initial-page.component.scss'],
})
export class InitialPageComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  goToLogin() {
    this.router.navigate([CommonUrls.Login]);
  }

  goToRegistration() {
    this.router.navigate([CommonUrls.Registration]);
  }
}
