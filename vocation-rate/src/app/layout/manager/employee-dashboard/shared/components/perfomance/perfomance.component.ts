import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiSearchComponent } from 'src/app/shared/components/ui/ui-search/ui-search.component';
import { CandidateCardComponent } from 'src/app/shared/components/candidate-card/candidate-card.component';
import { MatIconModule } from '@angular/material/icon';
import { UiFilterComponent } from 'src/app/shared/components/ui/ui-filter/ui-filter.component';
import { UiSortComponent } from 'src/app/shared/components/ui/ui-sort/ui-sort.component';
import { IOptions } from 'src/app/shared/interfaces/options.interface';

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
  ],
  templateUrl: './perfomance.component.html',
  styleUrls: ['./perfomance.component.scss'],
})
export class PerfomanceComponent implements OnInit {
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

  ngOnInit(): void {
    console.log(this.candidates);
  }
}
