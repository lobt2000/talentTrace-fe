import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbsService } from 'src/app/service/breadcrumbs.service';
import { IOptions } from 'src/app/shared/interfaces/options.interface';

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

  candidates = [
    {
      name: 'Josef Monit',

      image: 'assets/img/images.jpeg',
    },
    {
      name: 'Rober Nodur',
      image: 'assets/img/logo2.0.png',
    },
  ];
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
      type: 'delete',
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
  ) {}

  ngOnInit(): void {
    this.breadcrumbsService.removeActiveBreadcrumb();
  }

  onGoToCandidate(candidate) {
    console.log(candidate);
    this.router.navigate([candidate.name], {
      relativeTo: this.route,
    });
  }
}
