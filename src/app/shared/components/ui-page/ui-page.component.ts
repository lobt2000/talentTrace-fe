import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { BreadcrumbsService } from 'src/app/service/breadcrumbs.service';

@Component({
  selector: 'app-ui-page',
  templateUrl: './ui-page.component.html',
  styleUrls: ['./ui-page.component.scss'],
})
export class UiPageComponent implements OnInit {
  breadcrumbs$;
  @Input() withBreadcrimbs: boolean = true;
  @Input() defaultBreadcrumb;
  constructor(
    private breadcrumbsService: BreadcrumbsService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.breadcrumbsService.setDefault(this.defaultBreadcrumb);
    this.breadcrumbs$ = this.breadcrumbsService.breadcrumbs;
  }

  logout() {
    this.authService.logout();
  }
}
