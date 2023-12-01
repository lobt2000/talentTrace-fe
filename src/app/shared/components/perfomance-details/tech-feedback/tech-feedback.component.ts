import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from 'src/app/service/loading.service';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslateModule } from '@ngx-translate/core';
import { UiAutocompleteComponent } from '../../ui/ui-autocomplete/ui-autocomplete.component';
import { UiProgressComponent } from '../../ui/ui-progress/ui-progress.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@Component({
  selector: 'app-tech-feedback',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    UiProgressComponent,
    UiAutocompleteComponent,
    MatInputModule,
    MatTooltipModule,
    CKEditorModule,
  ],
  templateUrl: './tech-feedback.component.html',
  styleUrls: ['./tech-feedback.component.scss'],
  providers: [{ provide: 'ckeditor', useValue: ClassicEditor }],
})
export class TechFeedbackComponent {
  @Input() feedback;
  @Output() updateFeedback: EventEmitter<any> = new EventEmitter();

  editor = ClassicEditor;

  addScoreForm = this.fb.group({
    type: this.fb.control('', [Validators.required]),
    value: this.fb.control('', [
      Validators.required,
      Validators.min(0),
      Validators.max(100),
    ]),
  });
  videoSource;

  isAddScoreAvailable: boolean = false;
  addScoreOptions: Array<any> = [];

  constructor(
    private loadingService: LoadingService,
    private fb: FormBuilder,
  ) {}

  onAddScore(feedbacks) {
    this.addScoreForm.markAsTouched();
    if (this.addScoreForm.invalid) return;
    if (typeof this.addScoreForm.value.type === 'string') {
      let newScore = {
        name: this.addScoreForm.value.type,
        type: this.addScoreForm.value.type.toUpperCase().replace(' ', '_'),
      };
      this.loadingService.setLoading(true);
      // this.candidatesService.createScoreOption(newScore).subscribe((res) => {
      //   newScore['id'] = res.data.scoreOptions.id;
      //   this.addScoreOptions.push(res.data.scoreOptions);
      this.loadingService.setLoading(false);
      // });
      feedbacks['scores'].push({
        ...newScore,
        value: this.addScoreForm.value.value,
      });
    } else
      feedbacks['scores'].push({
        ...(this.addScoreForm.value.type as Object),
        value: this.addScoreForm.value.value,
      });

    this.addScoreForm.reset();
    // this.isAddScoreAvailable = false;
  }

  onGetInterviewFile(event, feedback) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      this.loadingService.setLoading(true);
      reader.onload = (e) => {
        this.videoSource = e.target.result;
        feedback['file'] = {
          data: e.target.result,
        };
        this.loadingService.setLoading(false);
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  get isAvailableUpdating() {
    // return this.permissionService.canUpdateInterviewStage(
    //   this.employee_details?.managers_team ?? []
    // );
    return true;
  }
}
