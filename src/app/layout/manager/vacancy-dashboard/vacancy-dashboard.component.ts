import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbsService } from 'src/app/service/breadcrumbs.service';
import { IOptions } from 'src/app/shared/interfaces/options.interface';
import { VacancyDashboardService } from './services/vacancy-dashboard.service';
import { LoadingService } from 'src/app/service/loading.service';
import { CandidatesService } from '../candidates/services/candidates.service';

@Component({
  selector: 'app-vacancy-dashboard',
  templateUrl: './vacancy-dashboard.component.html',
  styleUrls: ['./vacancy-dashboard.component.scss'],
})
export class VacancyDashboardComponent implements OnInit {
  vacancy_list: any[] = [];
  candidates_list: any[] = [];
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
    private vacancyService: VacancyDashboardService,
    private candidatesService: CandidatesService,
    private loadingService: LoadingService,
  ) {}

  ngOnInit(): void {
    this.breadcrumbsService.removeActiveBreadcrumb();
    this.getAllVacancies();
    this.getAllCandidatesWithoutVacancies();
  }

  getAllVacancies() {
    this.loadingService.setLoading(true);
    this.vacancyService.onGetAllVacancies().subscribe((res) => {
      this.vacancy_list = res.data;
      this.loadingService.setLoading(false);
    });
  }

  getAllCandidatesWithoutVacancies() {
    this.loadingService.setLoading(true);
    this.candidatesService.getAllCandidates().subscribe((res) => {
      this.candidates_list = res.data.filter((el) => !el.vacanciesIds?.length);
      this.loadingService.setLoading(false);
    });
  }

  onGoToItem(item) {
    this.navigateToItem(item.id);
  }

  onAddItem() {
    this.navigateToItem('Creation');
  }

  navigateToItem(route?) {
    this.vacancyService.navigateToItem(route);
  }

  triggerAction(event) {
    if (event.type === 'create') {
      this.onAddItem();
    }
  }

  onAddCandidate() {}
}
