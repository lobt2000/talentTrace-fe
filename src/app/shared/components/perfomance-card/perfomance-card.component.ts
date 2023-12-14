import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { IOptions } from '../../interfaces/options.interface';
import { CommonModule } from '@angular/common';
import { MoreOptionsComponent } from '../more-options/more-options.component';
import { MatIconModule } from '@angular/material/icon';
import { UiProgressComponent } from '../ui/ui-progress/ui-progress.component';

@Component({
  selector: 'app-perfomance-card',
  templateUrl: './perfomance-card.component.html',
  styleUrls: ['./perfomance-card.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MoreOptionsComponent,
    UiProgressComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PerfomanceCardComponent {
  @Input() perfomance;
  @Input() moreOptions: Array<IOptions> = [];

  @Output() goToItem: EventEmitter<any> = new EventEmitter();
  @Output() triggerAction: EventEmitter<any> = new EventEmitter();

  onGoToItem(event) {
    if (
      [...event.target.classList].includes('mat-icon') ||
      [...event.target.parentNode.classList].some((el) => el.includes('option'))
    )
      return;
    this.goToItem.emit(this.perfomance);
  }

  onGoToAction(action) {
    this.triggerAction.emit({ ...action, id: this.perfomance.id });
  }

  getScore;
}
