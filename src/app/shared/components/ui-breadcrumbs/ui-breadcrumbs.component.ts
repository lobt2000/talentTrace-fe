import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IBreadcrumb } from '../../interfaces/ui-breadcrumbs.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ui-breadcrumbs',
  templateUrl: './ui-breadcrumbs.component.html',
  styleUrls: ['./ui-breadcrumbs.component.scss'],
})
export class UiBreadcrumbsComponent implements OnInit {
  @Input() breadcrumbs: IBreadcrumb[];
  @Output() breadcrumb = new EventEmitter();
  constructor(private router: Router) {}

  ngOnInit(): void {}

  onBreadcrumb(breadcrumb: IBreadcrumb, i: number) {
    // if (i == this.breadcrumbs.length - 1) {
    //   return false;
    // }
    if (breadcrumb?.queryParams) {
      this.router.navigate([`/${breadcrumb.link}`], {
        queryParams: breadcrumb?.queryParams,
      });
    } else {
      this.router.navigate([`/${breadcrumb.link}`]);
    }
  }
}
