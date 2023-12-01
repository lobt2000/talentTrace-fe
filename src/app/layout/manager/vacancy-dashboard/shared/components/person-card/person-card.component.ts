import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  trigger,
  transition,
  style,
  animate,
  state,
} from '@angular/animations';
import { MatIconModule } from '@angular/material/icon';
import { ClickOutsideDirective } from 'src/app/shared/directives/click-outside.directive';
import {
  IPersonChange,
  PersonEventTitle,
} from '../../models/person-change.interface';
import {
  OptionType,
  OptionTypeKeys,
} from 'src/app/shared/constansts/optionType.model';
import { FadeAniimationDirective } from 'src/app/shared/directives/fade-aniimation.directive';
import { IAnimationProperty } from 'src/app/shared/interfaces/animation-property.interface';

@Component({
  selector: 'app-person-card',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    ClickOutsideDirective,
    FadeAniimationDirective,
  ],
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.scss'],
  animations: [
    trigger('enterLeaveTrigger', [
      state(
        'open',
        style({
          transform: 'rotateY(0deg)',
        }),
      ),
      state(
        'closed',
        style({
          transform: 'rotateY(-180deg)',
        }),
      ),
      transition('open => closed', [animate('0.6s ease-in')]),
      transition('closed => open', [animate('0.6s ease-in')]),
    ]),
  ],
})
export class PersonCardComponent implements OnDestroy {
  isOpenOption: boolean = true;

  animationProperty: IAnimationProperty = {
    childClassName: 'rotate-side',
    parentClassName: 'card-side-block',
    isFirstInit: true,
  };
  @Input() isChangingMember: boolean = false;
  @Input() person;
  @Input() itemTitle: string = 'team';
  @Input() isAvailableUpdate: boolean = true;
  @Output() triggerEvent: EventEmitter<any> = new EventEmitter();

  constructor() {}

  onTriggerChangeSide(value?) {
    this.isOpenOption = value || !this.isOpenOption;
  }

  onTriggerEvent(value: string) {
    let body: Partial<IPersonChange>;
    const change = OptionType[OptionType.CHANGE];
    if (OptionType[value]) {
      body = {
        type: value as OptionTypeKeys,
        title: PersonEventTitle[value],
        member: this.person,
      };
    }
    this.triggerEvent.emit(body);
  }

  get currUserId() {
    return JSON.parse(localStorage.getItem('userData')).id;
  }

  ngOnDestroy(): void {}
}
