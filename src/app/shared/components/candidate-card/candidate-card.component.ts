import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { IOptions } from '../../interfaces/options.interface';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MoreOptionsComponent } from '../more-options/more-options.component';
import { UiProgressComponent } from '../ui/ui-progress/ui-progress.component';
import { PageActions } from '../../constansts/page-actions.model';

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
  @Input() vacancyId: string = '';
  @Input() moreOptions: Array<IOptions> = [];

  @Output() goToItem: EventEmitter<any> = new EventEmitter();
  @Output() triggerAction: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
    console.log(this.moreOptions);
  }

  get getScores() {
    if (this.vacancyId === PageActions.CREATION) return [];
    const vacancyScore = (this.candidate?.stages ?? []).find(
      (el) => el.vacancyId === this.vacancyId,
    )?.scores;
    return vacancyScore ?? this.candidate?.stages[0]?.scores;
  }

  get getStageTitle() {
    if (this.vacancyId === PageActions.CREATION) return 'No stages';
    const vacancyStage = (this.candidate?.stages ?? []).find(
      (el) => el.vacancyId === this.vacancyId,
    );
    return vacancyStage?.name ?? this.candidate?.stages[0]?.name ?? 'No stages';
  }

  onGoToItem(event) {
    if (
      [...event.target.classList].includes('mat-icon') ||
      [...event.target.parentNode.classList].some((el) => el.includes('option'))
    )
      return;
    this.goToItem.emit(this.candidate);
  }

  onGoToAction(action) {
    console.log(action);
    this.triggerAction.emit(action);
  }
}
