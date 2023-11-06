import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LoadingService } from 'src/app/service/loading.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-ui-loader',
  templateUrl: './ui-loader.component.html',
  styleUrls: ['./ui-loader.component.scss'],
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
})
export class UiLoaderComponent {
  public loadingService = inject(LoadingService);
}
