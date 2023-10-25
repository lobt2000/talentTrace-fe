import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { IOptions } from '../../interfaces/options.interface';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MoreOptionsComponent } from '../more-options/more-options.component';
import { UiProgressComponent } from '../ui/ui-progress/ui-progress.component';

@Component({
  selector: 'app-candidate-card',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MoreOptionsComponent,
    UiProgressComponent,
  ],
  templateUrl: './candidate-card.component.html',
  styleUrls: ['./candidate-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CandidateCardComponent implements OnInit {
  @Input() candidate;
  @Input() moreOptions: Array<IOptions> = [];

  ngOnInit(): void {
    console.log(this.moreOptions);
  }
}
