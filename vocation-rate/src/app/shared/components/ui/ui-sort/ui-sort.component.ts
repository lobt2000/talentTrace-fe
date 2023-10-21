import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ClickOutsideDirective } from 'src/app/shared/directives/click-outside.directive';
import {
  trigger,
  transition,
  style,
  animate,
  state,
} from '@angular/animations';
import { TranslateModule } from '@ngx-translate/core';
import { MatRadioModule } from '@angular/material/radio';
import { UiAccordionComponent } from '../ui-accordion/ui-accordion.component';
import { IAnimationProperty } from 'src/app/shared/constansts/animation-property.interface';
import { FadeAniimationDirective } from 'src/app/shared/directives/fade-aniimation.directive';

@Component({
  selector: 'app-ui-sort',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    ClickOutsideDirective,
    TranslateModule,
    MatRadioModule,
    UiAccordionComponent,
    FadeAniimationDirective,
  ],
  templateUrl: './ui-sort.component.html',
  styleUrls: ['./ui-sort.component.scss'],
  animations: [
    trigger('enterLeaveTrigger', [
      state(
        'open',
        style({
          opacity: 1,
        })
      ),
      state(
        'closed',
        style({
          opacity: 0,
        })
      ),
      transition('open => closed', [animate('0.3s')]),
      transition('closed => open', [animate('0.3s 0.2s')]),
    ]),
  ],
})
export class UiSortComponent implements OnInit {
  @Input() sortsList: Array<any>;
  @Output() onTriggerAction: EventEmitter<any> = new EventEmitter();
  isOptions: boolean = false;
  animationProperty: IAnimationProperty = {
    childClassName: 'fade',
    parentClassName: 'options-container',
    isFirstInit: false,
  };
  constructor() {}

  ngOnInit(): void {}

  triggerAction(sort, e) {
    console.log(e);

    this.isOptions = false;
    // this.onTriggerAction.emit(sort);
  }
}
