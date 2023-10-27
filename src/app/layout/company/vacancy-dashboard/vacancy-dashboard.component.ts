import { Component, OnInit } from '@angular/core';
import { BreadcrumbsService } from 'src/app/service/breadcrumbs.service';

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
    link: '/company/vacancy-dashboard',
  };

  constructor(private breadcrumbsService: BreadcrumbsService) {}

  ngOnInit(): void {}

  onGoToItem(item) {
    this.breadcrumbsService.addBreadcrumbs({
      label: item.name,
      value: item,
      link: `/companyvacancy-dashboard/${item.name}`,
    });
  }
}