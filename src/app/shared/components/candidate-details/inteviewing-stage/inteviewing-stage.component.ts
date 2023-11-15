import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  EventEmitter,
  Output,
  OnChanges,
} from '@angular/core';
import { CommentsComponent } from '../../comments/comments.component';
import { MatIconModule } from '@angular/material/icon';
import { UiDerfaultAccordionComponent } from '../../ui/ui-derfault-accordion/ui-derfault-accordion.component';
import { TranslateModule } from '@ngx-translate/core';
import { UiProgressComponent } from '../../ui/ui-progress/ui-progress.component';
import { UiAutocompleteComponent } from '../../ui/ui-autocomplete/ui-autocomplete.component';
import { defaultStages } from 'src/app/shared/constansts/stages.model';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CandidatesService } from 'src/app/layout/manager/candidates/services/candidates.service';
import {
  Subject,
  filter,
  forkJoin,
  of,
  skipUntil,
  takeUntil,
  takeWhile,
} from 'rxjs';
import { LoadingService } from 'src/app/service/loading.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from '../../modals/confirmation-modal/confirmation-modal.component';

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
    TranslateModule,
    UiProgressComponent,
    UiAutocompleteComponent,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
  ],
})
export class InteviewingStageComponent implements OnInit, OnDestroy, OnChanges {
  @ViewChild('videoPlayer') videoplayer: any;
  @Input() stages: any[] = [];
  @Output() updateStages: EventEmitter<Array<any>> = new EventEmitter();
  addStageOptions: Array<any> = [];
  addScoreOptions: Array<any> = [];

  isAddStageAvailable: boolean = false;
  isAddScoreAvailable: boolean = false;
  isAvailableStageAdding: boolean = true;

  addStageForm = new FormControl('', [Validators.required]);
  addScoreForm = this.fb.group({
    type: this.fb.control('', [Validators.required]),
    value: this.fb.control('', [
      Validators.required,
      Validators.min(0),
      Validators.max(100),
    ]),
  });
  private destroy$ = new Subject();
  videoSource;

  constructor(
    private fb: FormBuilder,
    private candidatesService: CandidatesService,
    private loadingService: LoadingService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {}

  ngOnChanges() {
    if (this.stages) {
      this.loadingService.setLoading(true);
      forkJoin(
        this.candidatesService.getAllScoreOptions(),
        this.candidatesService.getAllStageOptions(),
      )
        .pipe(
          takeUntil(this.destroy$),
          skipUntil(of(this.loadingService.getLoadingValue === false)),
        )
        .subscribe((res) => {
          this.addScoreOptions = res[0].data;
          this.addStageOptions = res[1].data.filter(
            (el) => !this.stages.some((item) => item.id === el.id),
          );
          this.loadingService.setLoading(false);
        });
      this.isAvailableStageAdding = true;
    }
  }

  onAddStage() {
    this.addStageForm.markAsDirty();
    if (this.addStageForm.invalid) return;

    if (typeof this.addStageForm.value === 'string') {
      let newStage = {
        name: this.addStageForm.value,
        type: this.addStageForm.value.toUpperCase().replace(' ', '_'),
      };
      this.loadingService.setLoading(true);
      this.candidatesService.createStageOption(newStage).subscribe((res) => {
        newStage['id'] = res.data.stageOptions.id;
        this.addStageOptions.push(res.data.stageOptions);
        this.loadingService.setLoading(false);
      });
      this.stages.push({ ...newStage, scores: [], file: '' });
    } else
      this.stages.push({
        ...(this.addStageForm.value as Object),
        scores: [],
        file: '',
      });

    this.isAvailableStageAdding = false;
    this.isAddStageAvailable = false;
  }

  onAddScore(stage) {
    this.addScoreForm.markAsTouched();
    if (this.addScoreForm.invalid) return;
    if (typeof this.addScoreForm.value.type === 'string') {
      let newScore = {
        name: this.addScoreForm.value.type,
        type: this.addScoreForm.value.type.toUpperCase().replace(' ', '_'),
      };
      this.loadingService.setLoading(true);
      this.candidatesService.createScoreOption(newScore).subscribe((res) => {
        newScore['id'] = res.data.scoreOptions.id;
        this.addScoreOptions.push(res.data.scoreOptions);
        this.loadingService.setLoading(false);
      });
      stage['scores'].push({
        ...newScore,
        value: this.addScoreForm.value.value,
      });
    } else
      stage['scores'].push({
        ...(this.addScoreForm.value.type as Object),
        value: this.addScoreForm.value.value,
      });

    this.updateStages.emit(this.stages);

    this.isAddScoreAvailable = false;
  }

  getFileTitle(stage): string {
    if (stage?.name?.toLowerCase()?.includes('interview')) {
      return 'Please upload the video with interviews';
    }
    return 'Please upload the file';
  }

  getFileIcon(stage): string {
    if (stage?.name?.toLowerCase()?.includes('interview')) {
      return 'movie';
    }
    return 'cloud_upload';
  }

  onGetStageFile(event, stage, i) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      this.loadingService.setLoading(true);
      reader.onload = (e) => {
        this.videoSource = e.target.result;
        stage['file'] = {
          data: e.target.result,
        };
        this.updateStages.emit(this.stages);
        this.loadingService.setLoading(false);
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  deleteStage(stage) {
    this.dialog
      .open(ConfirmationModalComponent, {
        width: '40vw',
        height: '300px',
        position: {
          left: 'calc(50% - 15vw)',
        },
        panelClass: 'confirmation-modal',
        data: {
          text: 'Do you really want to delete this stage',
          title: 'Confirmation',
        },
      })
      .afterClosed()
      .pipe(filter((res) => !!res))
      .subscribe((res) => {
        this.stages = this.stages.filter((el) => el.id !== stage.id);
        this.updateStages.emit(this.stages);
      });
  }

  addNewStage() {
    if (!this.isAvailableStageAdding) {
      this.dialog
        .open(ConfirmationModalComponent, {
          width: '40vw',
          height: '300px',
          position: {
            left: 'calc(50% - 15vw)',
          },
          panelClass: 'confirmation-modal',
          data: {
            text: 'Please save stage changes after that you can add new stage!!!',
            title: 'Error',
            withoutButtonCancel: true,
          },
        })
        .afterClosed()
        .subscribe();
      return;
    }
    this.isAddStageAvailable = true;
  }

  onGetFileType(type): boolean {
    return type?.data?.includes('video');
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.unsubscribe();
  }
}
