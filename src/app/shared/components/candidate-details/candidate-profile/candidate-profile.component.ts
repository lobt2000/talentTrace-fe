import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
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
export class CandidateProfileComponent implements OnInit {
  @Input() id = '';

  pdfCv: string;
  candidateImg: string;
  candidate_form: UntypedFormGroup;
  constructor(
    private fb: FormBuilder,
    private loadingService: LoadingService,
  ) {}

  get isCreation(): boolean {
    return this.id === PageActions.CREATION;
  }

  ngOnInit(): void {
    this.createCandidateForm();
  }

  createCandidateForm() {
    this.candidate_form = this.fb.group({
      firstName: this.fb.control(null, [Validators.required]),
      secondName: this.fb.control(null, [Validators.required]),
      email: this.fb.control(null, [Validators.required]),
      position: this.fb.control(null, [Validators.required]),
    });
  }

  onUploadFile(event) {
    const file: File = event.target.files[0];
    this.loadingService.setLoading(true);
    if (file) {
      this.pdfCv = file.name;
      console.log(file);

      const formData = new FormData();

      formData.append('thumbnail', file);

      // const upload$ = this.http.post('/api/thumbnail-upload', formData);

      // upload$.subscribe();
    }
    setTimeout(() => {
      this.loadingService.setLoading(false);
    }, 500);
  }

  onUploadCandidateImg(event) {
    const file: File = event.target.files[0];
    this.loadingService.setLoading(true);
    if (file) {
      this.candidateImg = event.target.value;
      console.log(file);

      const formData = new FormData();

      formData.append('thumbnail', file);

      // const upload$ = this.http.post('/api/thumbnail-upload', formData);

      // upload$.subscribe();
    }
    setTimeout(() => {
      this.loadingService.setLoading(false);
    }, 500);
  }
}
