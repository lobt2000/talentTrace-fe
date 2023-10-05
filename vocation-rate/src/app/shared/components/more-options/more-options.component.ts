import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { IOptions } from '../../interfaces/options.interface';
import { SharedModule } from '../../shared.module';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-more-options',
  standalone: true,
  imports: [CommonModule, MatIconModule, SharedModule],
  templateUrl: './more-options.component.html',
  styleUrls: ['./more-options.component.scss'],
  animations: [
    trigger('enterLeaveTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('300ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class MoreOptionsComponent implements OnInit {
  @Input() optionsList: Array<IOptions>;
  @Output() onTriggerAction: EventEmitter<any> = new EventEmitter();
  isOptions: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  triggerAction(option) {
    this.isOptions = false;
    this.onTriggerAction.emit(option);
  }
}
