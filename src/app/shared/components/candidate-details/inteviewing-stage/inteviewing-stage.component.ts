import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CommentsComponent } from '../../comments/comments.component';
import { MatIconModule } from '@angular/material/icon';
import { UiDerfaultAccordionComponent } from '../../ui/ui-derfault-accordion/ui-derfault-accordion.component';

@Component({
  selector: 'app-inteviewing-stage',
  templateUrl: './inteviewing-stage.component.html',
  styleUrls: ['./inteviewing-stage.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    CommentsComponent,
    MatIconModule,
    UiDerfaultAccordionComponent,
  ],
})
export class InteviewingStageComponent {}
