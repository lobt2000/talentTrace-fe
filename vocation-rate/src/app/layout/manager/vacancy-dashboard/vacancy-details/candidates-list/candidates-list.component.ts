import { Component, Input } from '@angular/core';
import { IOptions } from 'src/app/shared/interfaces/options.interface';

@Component({
  selector: 'app-candidates-list',
  templateUrl: './candidates-list.component.html',
  styleUrls: ['./candidates-list.component.scss'],
})
export class CandidatesListComponent {
  @Input() candidates: Array<any> = [];
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
}
