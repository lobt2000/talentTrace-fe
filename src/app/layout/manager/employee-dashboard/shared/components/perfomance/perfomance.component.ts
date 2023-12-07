import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiSearchComponent } from 'src/app/shared/components/ui/ui-search/ui-search.component';
import { CandidateCardComponent } from 'src/app/shared/components/candidate-card/candidate-card.component';
import { MatIconModule } from '@angular/material/icon';
import { UiFilterComponent } from 'src/app/shared/components/ui/ui-filter/ui-filter.component';
import { UiSortComponent } from 'src/app/shared/components/ui/ui-sort/ui-sort.component';
import { IOptions } from 'src/app/shared/interfaces/options.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { PageActions } from 'src/app/shared/constansts/page-actions.model';
import { EmployeeDashboardService } from '../../../services/employee-dashboard.service';
import { Subject, filter, switchMap, takeUntil, tap } from 'rxjs';
import { LoadingService } from 'src/app/service/loading.service';
import { PerfomanceCardComponent } from 'src/app/shared/components/perfomance-card/perfomance-card.component';
import { CommonUrls } from 'src/app/shared/constansts/common/common.constants';

@Component({
  selector: 'app-perfomance',
  standalone: true,
  imports: [
    CommonModule,
    UiSearchComponent,
    CandidateCardComponent,
    MatIconModule,
    UiFilterComponent,
    UiSortComponent,
    PerfomanceCardComponent,
  ],
  templateUrl: './perfomance.component.html',
  styleUrls: ['./perfomance.component.scss'],
})
export class PerfomanceComponent implements OnInit, OnDestroy {
  @Input() id: string;
  perfomances = [];
  perfomanceOption: Array<IOptions> = [
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
      name: 'Delete',
      icon: {
        name: 'delete',
        color: 'red',
      },
    },
  ];

  private destroy$ = new Subject();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private employeeService: EmployeeDashboardService,
    private loadingService: LoadingService,
  ) {}

  ngOnInit(): void {
    console.log(this.perfomances);

    this.getAllPerfomance();
  }

  getAllPerfomance() {
    this.loadingService.setLoading(true);
    this.employeeService
      .getAllPerfomance(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        console.log(res);

        this.perfomances = res.data;
        this.loadingService.setLoading(false);
      });
  }

  onAddPerfomance() {
    this.router.navigate(['perfomance', PageActions.CREATION], {
      relativeTo: this.route,
    });
  }

  onGoToCandidate(candidate) {
    this.router.navigate([candidate.id], {
      relativeTo: this.route,
    });
  }

  onDelete(perfomance) {
    console.log(perfomance);

    this.employeeService
      .onDelete('Are you sure you want to delete this perfomance?')
      .pipe(
        filter((res) => !!res),
        switchMap((el) => {
          this.loadingService.setLoading(true);
          return this.employeeService.deleteEmployeePerfomance(
            this.id,
            perfomance['id'],
          );
        }),
        tap(() => this.getAllPerfomance()),
      )
      .subscribe((res) => {
        this.loadingService.setLoading(false);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
