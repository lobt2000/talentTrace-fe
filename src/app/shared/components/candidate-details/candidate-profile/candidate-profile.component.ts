import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
  ChangeDetectorRef,
} from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { LoadingService } from 'src/app/service/loading.service';
import { PageActions } from 'src/app/shared/constansts/page-actions.model';

@Component({
  selector: 'app-candidate-profile',
  templateUrl: './candidate-profile.component.html',
  styleUrls: ['./candidate-profile.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    PdfViewerModule,
    MatIconModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class CandidateProfileComponent implements OnInit, OnChanges {
  @Input() id = '';
  @Input() candidate_details;
  @Output() formUpdate: EventEmitter<any> = new EventEmitter();

  candidateImg;
  candidate_form: UntypedFormGroup;
  constructor(
    private fb: FormBuilder,
    private loadingService: LoadingService,
    private cdr: ChangeDetectorRef,
  ) {}

  get isCreation(): boolean {
    return this.id === PageActions.CREATION;
  }

  ngOnInit(): void {
    this.createCandidateForm();
  }

  ngOnChanges(): void {
    console.log('asfasdas');

    if (!this.isCreation) {
      this.updateForm();
    }
  }

  createCandidateForm() {
    this.candidate_form = this.fb.group({
      firstName: this.fb.control(null, [Validators.required]),
      surName: this.fb.control(null, [Validators.required]),
      email: this.fb.control(null, [Validators.required, Validators.email]),
      position: this.fb.control(null, [Validators.required]),
      cv: this.fb.control(null, [Validators.required]),
      icon: this.fb.control(null),
    });

    this.candidate_form.valueChanges.pipe().subscribe(() => {
      this.formUpdate.emit(this.candidate_form);
    });
  }

  updateForm() {
    if (this.candidate_form) {
      this.candidate_form.patchValue({ ...this.candidate_details });
      this.candidateImg = this.candidate_details.icon;
      this.candidate_form.disable();
    }
  }

  onUploadFile(event) {
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      const formData = new FormData();
      formData.append('thumbnail', file);

      let reader = new FileReader();
      this.loadingService.setLoading(true);
      reader.onload = (e) => {
        this.candidate_form.get('cv').patchValue({
          type: file,
          data: e.target.result,
        });

        this.loadingService.setLoading(false);
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  onUploadCandidateImg(event) {
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      const formData = new FormData();
      formData.append('thumbnail', file);

      let reader = new FileReader();
      this.loadingService.setLoading(true);
      reader.onload = (e) => {
        this.candidateImg = {
          type: file,
          data: e.target.result,
        };
        this.candidate_form.get('icon').patchValue(this.candidateImg);
        this.loadingService.setLoading(false);
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  removeFile() {
    this.cdr.detectChanges();
    this.candidate_form.get('cv').reset();
  }

  get getCvValue() {
    return this.candidate_form.get('cv').value;
  }
}
