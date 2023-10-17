import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule, MatAccordion } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-ui-accordion',
  templateUrl: './ui-accordion.component.html',
  styleUrls: ['./ui-accordion.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class UiAccordionComponent implements OnInit {
  @Input() name: string = 'My header';
  @Input({ required: true }) options: Array<any> = [];
  @Input() optionsType: string = 'checkbox';
  isOpen: boolean = false;

  ngOnInit(): void {}

  changeState() {
    this.isOpen = !this.isOpen;
  }
}
