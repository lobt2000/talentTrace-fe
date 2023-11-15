import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbsService } from 'src/app/service/breadcrumbs.service';
import { CommonUrls } from 'src/app/shared/constansts/common/common.constants';
import { IOptions } from 'src/app/shared/interfaces/options.interface';
import { CandidatesService } from './services/candidates.service';
import { LoadingService } from 'src/app/service/loading.service';
import { filter, switchMap } from 'rxjs';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss'],
})
export class CandidatesComponent implements OnInit {
  defaultBreadcrumb = {
    label: 'Candidates',
    value: 'candidates',
    link: '/manager/candidates',
  };

  candidates = [];
  candidateOption: Array<IOptions> = [
    {
      type: 'message',
      name: 'Write a message',
      icon: {
        name: 'chat',
        color: 'gray',
      },
    },
    {
      type: 'delete_from_vacancy',
      name: 'Delete from vacancy',
      icon: {
        name: 'delete',
        color: 'red',
      },
    },
    {
      type: 'delete',
      name: 'Delete permanently',
      icon: {
        name: 'delete_forever',
        color: 'red',
      },
    },
  ];

  filterList: Array<any> = [
    {
      name: 'Expirience',
      type: 'checkbox',
      options: [
        {
          name: '< 1 year',
          id: 0,
        },
        {
          name: '1..3 years',
          id: 0,
        },
        {
          name: '3..5 years',
          id: 0,
        },
      ],
    },
    {
      name: 'City',
      type: 'select',
      options: [
        {
          name: 'Lviv',
          id: 0,
        },
        {
          name: 'Kyiv',
          id: 0,
        },
        {
          name: 'Ternopil',
          id: 0,
        },
      ],
    },
  ];
  sortsList: Array<any> = [
    {
      name: '',
      id: 0,
    },
    {
      name: '1..3 years',
      id: 0,
    },
    {
      name: '3..5 years',
      id: 0,
    },
  ];

  constructor(
    private breadcrumbsService: BreadcrumbsService,
    private router: Router,
    private route: ActivatedRoute,
    private candidatesService: CandidatesService,
    private loadingService: LoadingService,
  ) {}

  ngOnInit(): void {
    this.breadcrumbsService.removeActiveBreadcrumb();
    this.getAllCandidates();
  }

  onGoToCandidate(candidate) {
    console.log(candidate);
    this.router.navigate([candidate.id], {
      relativeTo: this.route,
    });
  }

  onDelete(candidate) {
    this.candidatesService
      .onDelete()
      .pipe(
        filter((res) => !!res),
        switchMap((el) => {
          this.loadingService.setLoading(true);
          return this.candidatesService.deleteCandidate(candidate['id']);
        }),
      )
      .subscribe((res) => {
        this.loadingService.setLoading(false);
        const router = [CommonUrls.Manager, 'candidates'];
        this.router.navigate(router);
      });
  }

  getAllCandidates() {
    this.loadingService.setLoading(true);
    this.candidatesService.getAllCandidates().subscribe((res) => {
      this.candidates = res.data;
      this.loadingService.setLoading(false);
    });
  }

  onAddCandidate() {
    this.router.navigate([CommonUrls.Manager, 'candidates', 'Creation']);
  }
}
