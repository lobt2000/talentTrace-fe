import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ui-canvas-progress',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-canvas-progress.component.html',
  styleUrls: ['./ui-canvas-progress.component.scss'],
})
export class UiCanvasProgressComponent
  implements OnInit, OnChanges, AfterViewInit
{
  @Input() value: number = 0;
  @ViewChild('refCan', { static: true }) refCan: ElementRef;
  @Input() options;
  defaultOptions = {
    background: '#e2e2e2',
    color: '#3949AB',
    stroke: 20,
    label: '%',
    radius: 60,
    fontSize: 20,
  };
  settings;
  can;
  context;
  spanPercent;

  constructor() {}

  ngOnInit(): void {
    this.settings = {
      ...this.defaultOptions,
      ...this.options,
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['value'] &&
      (changes['value'].currentValue || changes['value'].currentValue == 0)
    ) {
      if (this.settings) {
        this.settings = {
          ...this.defaultOptions,
          ...this.options,
        };
        this.drawChart();
      }
    }
  }

  ngAfterViewInit() {
    this.can = this.refCan.nativeElement;
    this.context = this.can.getContext('2d');
    this.drawChart();
  }

  drawChart() {
    let posX = this.can.width / 2,
      posY = this.can.height / 2,
      fps = 1000 / 200,
      procent = 0,
      oneProcent = 360 / 100,
      result = oneProcent * this.value;
    this.context.lineCap = 'round';

    const arcMove = () => {
      var deegres = 0;
      var acrInterval = setInterval(() => {
        deegres += 1;
        this.context.clearRect(0, 0, this.can.width, this.can.height);
        procent = deegres / oneProcent;

        this.spanPercent = procent.toFixed();

        this.context.beginPath();
        this.context.arc(
          posX,
          posY,
          this.settings.radius,
          (Math.PI / 180) * 270,
          (Math.PI / 180) * (270 + 360),
        );
        this.context.strokeStyle = this.settings.background;
        this.context.lineWidth = this.settings.stroke;
        this.context.stroke();

        this.context.beginPath();
        this.context.strokeStyle = this.settings.color;
        this.context.lineWidth = this.settings.stroke;
        this.context.arc(
          posX,
          posY,
          this.settings.radius,
          (Math.PI / 180) * 270,
          (Math.PI / 180) * (270 + deegres),
        );
        this.context.stroke();
        if (deegres >= result) clearInterval(acrInterval);
      }, fps);
    };
    arcMove();
  }
}
