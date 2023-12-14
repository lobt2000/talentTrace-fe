import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { Subject, takeUntil, tap } from 'rxjs';
import { EmployeeDashboardService } from 'src/app/layout/manager/employee-dashboard/services/employee-dashboard.service';
import { LoadingService } from 'src/app/service/loading.service';
import { PageActions } from 'src/app/shared/constansts/page-actions.model';

@Component({
  selector: 'app-general-feedback',
  templateUrl: './general-feedback.component.html',
  styleUrls: ['./general-feedback.component.scss'],
  imports: [CommonModule, PdfViewerModule, TranslateModule, MatIconModule],
  standalone: true,
})
export class GeneralFeedbackComponent implements OnInit, OnDestroy {
  @Input() feedback;
  @Input() id;
  @Output() updateFeedback: EventEmitter<any> = new EventEmitter();

  private destroy$ = new Subject();

  constructor(
    private loadingService: LoadingService,
    private employeeService: EmployeeDashboardService,
  ) {}

  ngOnInit(): void {
    if (!this.isCreation) this.getFile();
  }

  getFile() {
    this.loadingService.setLoading(true);
    this.employeeService
      .getPerfomanceFile(this.feedback?.file?.id)
      .pipe(
        takeUntil(this.destroy$),
        tap(
          (res) =>
            (this.feedback.file = {
              ...this.feedback.file,
              data: res.data.file.data,
            }),
        ),
      )
      .subscribe(() => this.loadingService.setLoading(false));
  }

  onUploadFile(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      this.loadingService.setLoading(true);
      reader.onload = (e) => {
        this.feedback.file = {
          ...(!this.isCreation && { id: this.feedback.file.id }),
          data: e.target.result,
        };
        this.updateFeedback.emit(this.feedback);
        this.loadingService.setLoading(false);
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  get isCreation() {
    return PageActions.CREATION === this.id;
  }

  removeFile() {
    delete this.feedback.file.data;
    this.updateFeedback.emit(this.feedback);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
