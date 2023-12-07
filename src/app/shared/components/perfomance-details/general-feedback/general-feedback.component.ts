import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { LoadingService } from 'src/app/service/loading.service';

@Component({
  selector: 'app-general-feedback',
  templateUrl: './general-feedback.component.html',
  styleUrls: ['./general-feedback.component.scss'],
  imports: [CommonModule, PdfViewerModule, TranslateModule, MatIconModule],
  standalone: true,
})
export class GeneralFeedbackComponent {
  @Input() feedback;
  @Output() updateFeedback: EventEmitter<any> = new EventEmitter();

  constructor(private loadingService: LoadingService) {}

  onUploadFile(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      this.loadingService.setLoading(true);
      reader.onload = (e) => {
        this.feedback.file = {
          data: e.target.result,
        };
        this.updateFeedback.emit(this.feedback);
        this.loadingService.setLoading(false);
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }
}
