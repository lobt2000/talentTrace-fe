import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { IAnimationProperty } from '../constansts/animation-property.interface';

@Directive({
  selector: '[fadeAniimation]',
  standalone: true,
})
export class FadeAniimationDirective implements OnChanges, OnDestroy {
  timeOut: ReturnType<typeof setTimeout>;
  @Input({ required: true }) animationProperty: IAnimationProperty;
  @Input({ required: true }) isOpenOption: boolean;
  @Input() delay: number = 500;
  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['animationProperty']?.currentValue &&
      this.animationProperty.isFirstInit
    ) {
      this.onChangeDisplayStyle();
      this.animationProperty.isFirstInit = false;
      return;
    }

    this.timeOut = setTimeout(() => {
      this.onChangeDisplayStyle();
    }, this.delay);
  }

  private onChangeDisplayStyle() {
    this.elementRef.nativeElement
      .querySelectorAll(`.${this.animationProperty.parentClassName}`)
      .forEach((element, i) => {
        const classList = [...element.classList];
        this.renderer.setStyle(
          element,
          'display',
          this.animationProperty.isFirstInit && i == 0
            ? 'flex'
            : !classList.includes(this.animationProperty.childClassName)
            ? 'none'
            : 'flex',
        );
      });
  }

  ngOnDestroy(): void {
    clearTimeout(this.timeOut);
  }
}
