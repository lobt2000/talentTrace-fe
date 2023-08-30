import { Component, OnInit } from '@angular/core';
import { BreadcrumbsService } from 'src/app/service/breadcrumbs.service';

@Component({
  selector: 'app-ui-page',
  templateUrl: './ui-page.component.html',
  styleUrls: ['./ui-page.component.scss']
})
export class UiPageComponent implements OnInit {
  breadcrumbs$;
  constructor(private breadcrumbsService: BreadcrumbsService,) { }

  ngOnInit(): void {
    this.breadcrumbs$ = this.breadcrumbsService.breadcrumbs;
  }

}
