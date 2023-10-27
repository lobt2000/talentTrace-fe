import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ui-instruction',
  templateUrl: './ui-instruction.component.html',
  styleUrls: ['./ui-instruction.component.scss'],
})
export class UiInstructionComponent implements OnInit {
  @Input() withButtons: boolean;
  constructor() {}

  ngOnInit(): void {}
}
