import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { IOptions } from '../../interfaces/options.interface';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { FadeAniimationDirective } from '../../directives/fade-aniimation.directive';
import { IAnimationProperty } from '../../interfaces/animation-property.interface';

@Component({
  selector: 'app-more-options',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    ClickOutsideDirective,
    FadeAniimationDirective,
  ],
  templateUrl: './more-options.component.html',
  styleUrls: ['./more-options.component.scss'],
  animations: [
    trigger('enterLeaveTrigger', [
      state(
        'open',
        style({
          opacity: 1,
        }),
      ),
      state(
        'closed',
        style({
          opacity: 0,
        }),
      ),
      transition('open => closed', [animate('0.3s')]),
      transition('closed => open', [animate('0.3s 0.2s')]),
    ]),
  ],
})
export class MoreOptionsComponent implements OnInit {
  @Input() optionsList: Array<IOptions>;
  @Output() onTriggerAction: EventEmitter<any> = new EventEmitter();
  isOptions: boolean = false;
  animationProperty: IAnimationProperty = {
    childClassName: 'fade',
    parentClassName: 'options-container',
    isFirstInit: false,
  };
  constructor() {}

  ngOnInit(): void {}

  triggerAction(option) {
    this.changeStateOfOption(false);
    this.onTriggerAction.emit(option);
  }
  changeStateOfOption(value: boolean, e?) {
    if (
      e &&
      ([...e.target.classList].includes('option-block') ||
        [...e.target.parentElement.classList].includes('option-block'))
    )
      return;
    this.isOptions = value;
  }
}
