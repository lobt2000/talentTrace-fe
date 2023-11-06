import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ClickOutsideDirective } from 'src/app/shared/directives/click-outside.directive';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { TranslateModule } from '@ngx-translate/core';
import { UiAccordionComponent } from '../ui-accordion/ui-accordion.component';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { IAnimationProperty } from 'src/app/shared/interfaces/animation-property.interface';
import { FadeAniimationDirective } from 'src/app/shared/directives/fade-aniimation.directive';

@Component({
  selector: 'app-ui-filter',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    ClickOutsideDirective,
    MatIconModule,
    TranslateModule,
    UiAccordionComponent,
    FadeAniimationDirective,
  ],
  templateUrl: './ui-filter.component.html',
  styleUrls: ['./ui-filter.component.scss'],
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
export class UiFilterComponent implements OnInit {
  @Input() filtersList: Array<any>;
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
    this.isOptions = false;
    this.onTriggerAction.emit(option);
  }
}
