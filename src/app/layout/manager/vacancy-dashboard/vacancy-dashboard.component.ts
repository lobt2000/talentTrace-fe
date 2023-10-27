import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbsService } from 'src/app/service/breadcrumbs.service';
import { IOptions } from 'src/app/shared/interfaces/options.interface';

@Component({
  selector: 'app-vacancy-dashboard',
  templateUrl: './vacancy-dashboard.component.html',
  styleUrls: ['./vacancy-dashboard.component.scss'],
})
export class VacancyDashboardComponent implements OnInit {
  vacancy_list: any[] = [
    {
      name: 'Middle Front-End Angular Developer',
      employment: 'Remote',
      country: 'Ukraine',
      city: 'Lviv',
      active: true,
      candidates: [
        'assets/img/dev-company-logo.jpeg',
        'assets/img/logo2.0.png',
      ],
    },
    {
      name: 'Middle Front-End Angular Developer',
      employment: 'Remote',
      country: 'Ukraine',
      city: 'Lviv',
      active: true,
      candidates: [
        'assets/img/dev-company-logo.jpeg',
        'assets/img/logo2.0.png',
      ],
    },
    {
      name: 'Middle Front-End Angular Developer',
      employment: 'Remote',
      country: 'Ukraine',
      city: 'Lviv',
      active: true,
      candidates: [
        'assets/img/dev-company-logo.jpeg',
        'assets/img/logo2.0.png',
      ],
    },
    {
      name: 'Middle Front-End Angular Developer',
      employment: 'Remote',
      country: 'Ukraine',
      city: 'Lviv',
      active: true,
      candidates: [
        'assets/img/dev-company-logo.jpeg',
        'assets/img/logo2.0.png',
      ],
    },
    {
      name: 'Middle Front-End Angular Developer',
      employment: 'Remote',
      country: 'Ukraine',
      city: 'Lviv',
      active: true,
      candidates: [
        'assets/img/dev-company-logo.jpeg',
        'assets/img/logo2.0.png',
      ],
    },
    {
      name: 'Middle Front-End Angular Developer',
      employment: 'Remote',
      country: 'Ukraine',
      city: 'Lviv',
      active: true,
      candidates: [
        'assets/img/dev-company-logo.jpeg',
        'assets/img/logo2.0.png',
      ],
    },
    {
      name: 'Middle Front-End Angular Developer',
      employment: 'Remote',
      country: 'Ukraine',
      city: 'Lviv',
      active: true,
      candidates: [
        'assets/img/dev-company-logo.jpeg',
        'assets/img/logo2.0.png',
      ],
    },
    {
      name: 'Middle Front-End Angular Developer',
      employment: 'Remote',
      country: 'Ukraine',
      city: 'Lviv',
      active: true,
      candidates: [
        'assets/img/dev-company-logo.jpeg',
        'assets/img/logo2.0.png',
      ],
    },
    {
      name: 'Middle Front-End Angular Developer',
      employment: 'Remote',
      country: 'Ukraine',
      city: 'Lviv',
      active: true,
      candidates: [
        'assets/img/dev-company-logo.jpeg',
        'assets/img/logo2.0.png',
      ],
    },
    {
      name: 'Middle Front-End Angular Developer',
      employment: 'Remote',
      country: 'Ukraine',
      city: 'Lviv',
      active: true,
      candidates: [
        'assets/img/dev-company-logo.jpeg',
        'assets/img/logo2.0.png',
      ],
    },
    {
      name: 'Middle Front-End Angular Developer',
      employment: 'Remote',
      country: 'Ukraine',
      city: 'Lviv',
      active: true,
      candidates: [
        'assets/img/dev-company-logo.jpeg',
        'assets/img/logo2.0.png',
      ],
    },
    {
      name: 'Middle Front-End Angular Developer',
      employment: 'Remote',
      country: 'Ukraine',
      city: 'Lviv',
      active: true,
      candidates: [
        'assets/img/dev-company-logo.jpeg',
        'assets/img/logo2.0.png',
      ],
    },
    {
      name: 'Middle Front-End Angular Developer',
      employment: 'Remote',
      country: 'Ukraine',
      city: 'Lviv',
      active: true,
      candidates: [
        'assets/img/dev-company-logo.jpeg',
        'assets/img/logo2.0.png',
      ],
    },
  ];
  defaultBreadcrumb = {
    label: 'Dashboard',
    value: 'dashboard',
    link: '/manager/vacancy-dashboard',
  };

  vacanciesOptions: Array<IOptions> = [
    {
      type: 'create',
      name: 'Create a vacancy',
      icon: {
        name: 'add_circle_outline',
        color: 'green',
      },
    },
    {
      type: 'add',
      name: 'Add a candidate',
      icon: {
        name: 'group_add',
        color: 'green',
      },
    },
    {
      type: 'delete',
      name: 'Delete a vacancy',
      icon: {
        name: 'delete',
        color: 'red',
      },
    },
  ];

  constructor(
    private breadcrumbsService: BreadcrumbsService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.breadcrumbsService.removeActiveBreadcrumb();
  }

  onGoToItem(item) {
    this.router.navigate([item.name], {
      relativeTo: this.route,
    });
  }
}
