import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subject, filter, of, switchMap, takeUntil, tap } from 'rxjs';
import { LoadingService } from 'src/app/service/loading.service';
import { CommonUrls } from 'src/app/shared/constansts/common/common.constants';
import { IOptions } from 'src/app/shared/interfaces/options.interface';
import { VacancyDashboardService } from '../../services/vacancy-dashboard.service';
import { PageActions } from 'src/app/shared/constansts/page-actions.model';
import { MatDialog } from '@angular/material/dialog';
import { AddItemToComponent } from 'src/app/shared/components/modals/add-item-to/add-item-to.component';
import { OptionType } from 'src/app/shared/constansts/optionType.model';
import { CandidatesService } from '../../../candidates/services/candidates.service';

@Component({
  selector: 'app-candidates-list',
  templateUrl: './candidates-list.component.html',
  styleUrls: ['./candidates-list.component.scss'],
})
export class CandidatesListComponent implements OnDestroy {
  @Input() id;
  @Output() updateCandidate: EventEmitter<any> = new EventEmitter();
  candidates: any[] = [];
  allCandidates: any[][];
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

  destroy$ = new Subject();

  constructor(
    private loadingService: LoadingService,
    private router: Router,
    private vacancyService: VacancyDashboardService,
    private candidatesService: CandidatesService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    if (this.id !== PageActions.CREATION) this.getAllVacancyCandidates();
  }

  onGoToCandidate(candidate) {
    this.router.navigate([CommonUrls.Manager, 'candidates', candidate.id], {
      queryParams: { vacancyId: this.id },
    });
  }

  actionTrigger(action, candidate) {
    if (action.type == 'delete_from_vacancy') {
      this.candidatesService
        .onDelete(
          'Are you sure you want to delete this candidate from this vacancy?',
        )
        .pipe(
          filter((res) => !!res),
          switchMap(() => {
            this.loadingService.setLoading(true);
            this.candidates = this.candidates.filter(
              (el) => el.id !== candidate.id,
            );

            return this.id === PageActions.CREATION
              ? of(this.updateCandidate.emit(this.candidates))
              : this.vacancyService.onUpdateVacancy(this.id, {
                  candidates: this.candidates.map((el) => el.id),
                });
          }),
          switchMap((res) => {
            if (typeof res === 'object') {
              const vacanciesIds = (candidate.vacanciesIds ?? []).filter(
                (el) => el.id !== this.id,
              );
              return this.candidatesService.updateCandidate(candidate.id, {
                candidate: {
                  vacanciesIds: vacanciesIds,
                },
              });
            }
            return of('');
          }),
        )
        .subscribe(() => this.loadingService.setLoading(false));
    }
  }

  getAllVacancyCandidates() {
    this.loadingService.setLoading(true);
    this.vacancyService
      .onGetAllVacancyCandidates(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.candidates = res.data;
        this.loadingService.setLoading(false);
      });
  }

  async onAddCandidate() {
    this.loadingService.setLoading(true);
    this.allCandidates = (
      await this.candidatesService
        .getAllCandidates()
        .pipe(takeUntil(this.destroy$))
        .toPromise()
    ).data;
    this.loadingService.setLoading(false);

    this.dialog.closeAll();
    this.dialog
      .open(AddItemToComponent, {
        width: '60vw',
        height: '600px',
        position: {
          left: 'calc(50% - 20vw)',
        },
        data: {
          title: 'Add candidate to vacancy',
          type: OptionType[OptionType.ADD],
          items: this.allCandidates,
          members: this.candidates ?? [],
          itemTitle: 'vacancy',
        },
      })
      .afterClosed()
      .pipe(
        filter((el) => !!el),
        takeUntil(this.destroy$),
        tap((el) => {
          if (el.type === OptionType[OptionType.ADD]) {
            this.loadingService.setLoading(true);
            this.candidates.push(el.member);
            this.id === PageActions.CREATION
              ? this.updateCandidate.emit(this.candidates)
              : this.vacancyService
                  .onUpdateVacancy(this.id, {
                    candidates: this.candidates.map((el) => el.id),
                  })
                  .pipe(takeUntil(this.destroy$))
                  .subscribe();
          }
        }),
        switchMap((el) => {
          if (el.type === OptionType[OptionType.ADD]) {
            if (this.id === PageActions.CREATION) return of('');
            const vacanciesIds = el.vacanciesIds || [];
            vacanciesIds.push(this.id);
            return this.candidatesService.updateCandidate(el.member.id, {
              candidate: {
                vacanciesIds: vacanciesIds,
              },
            });
          }
        }),
      )
      .subscribe(() => this.loadingService.setLoading(false));
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
