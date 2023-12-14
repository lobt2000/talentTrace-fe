import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { getColorPlate } from '../../../constansts/progress-color-plate';

@Component({
  selector: 'app-ui-progress',
  templateUrl: './ui-progress.component.html',
  styleUrls: ['./ui-progress.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class UiProgressComponent implements OnInit {
  @Input({ required: true }) progressValue: number;
  @Input({ required: true }) totalValue: number;
  @Input() title: string = '';

  ngOnInit(): void {}

  get culculatePercent(): number {
    return (100 * this.progressValue) / this.totalValue;
  }

  get getProgressBgColor(): string {
    return getColorPlate(this.culculatePercent);
  }
}
