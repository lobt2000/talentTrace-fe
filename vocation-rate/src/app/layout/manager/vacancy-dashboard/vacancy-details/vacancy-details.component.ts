import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { BreadcrumbsService } from 'src/app/service/breadcrumbs.service';
import { GoogleMapsModalComponent } from 'src/app/shared/components/modals/google-maps-modal/google-maps-modal.component';
import { IBreadcrumb } from 'src/app/shared/constansts/ui-breadcrumbs.interface';
// import { ClickOutsideDirective } from 'shared/directives/click-outside.directive';

@Component({
  selector: 'app-vacancy-details',
  templateUrl: './vacancy-details.component.html',
  styleUrls: ['./vacancy-details.component.scss'],
})
export class VacancyDetailsComponent implements OnInit {
  editor = ClassicEditor;
  editorData = '';
  editMode: boolean = false;
  defaultBreadcrumb: IBreadcrumb = {
    label: 'Dashboard',
    value: 'dashboard',
    link: '/manager/vacancy-dashboard',
  };

  name: string;
  isCreation: boolean;
  currVacancy = {
    name: 'Middle Front-End Angular Developer',
    employment: 'Remote',
    country: 'Ukraine',
    city: 'Lviv',
    active: true,
    manager: {
      name: 'Jona Mickle',
      icon: 'assets/img/logo2.0.png',
    },
    candidates: [
      {
        name: 'Josef Monit',

        image: 'assets/img/dev-company-logo.jpeg',
      },
      {
        name: 'Rober Nodur',
        image: 'assets/img/logo2.0.png',
      },
    ],
  };

  candidates = [
    {
      name: 'Josef Monit',

      image: 'assets/img/dev-company-logo.jpeg',
    },
    {
      name: 'Rober Nodur',
      image: 'assets/img/logo2.0.png',
    },
  ];
  jobTypes: Array<any> = [
    { name: 'Full-Time', id: 0 },
    { name: 'Part-Time', id: 1 },
    { name: 'Seasonal', id: 2 },
    { name: 'Contract', id: 3 },
    { name: 'Temporary', id: 4 },
  ];
  currencies: Array<any> = [
    { name: 'usd', icon: 'attach_money' },
    { name: 'eur', icon: 'euro_symbol' },
    { name: 'gbp', icon: 'currency_pound' },
    { name: 'uah', icon: 'euro_symbol' },
  ];

  form: UntypedFormGroup;

  constructor(
    private breadcrumbsService: BreadcrumbsService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {}

  get getSelectedValue() {
    return this.currencies.find(
      (res) => res.name == this.form.get('salary').value.type
    )?.icon;
  }

  ngOnInit(): void {
    this.name = this.route.snapshot.params['id'];
    console.log(this.route.snapshot.params['id'], this.editorData.length);
    this.isCreation = this.name == 'Creation';

    this.breadcrumbsService.addBreadcrumbs({
      label: this.name,
      value: this.name,
      link: `/manager/vacancy-dashboard/${this.name}`,
    });

    this.form = this.fb.group({
      range: this.fb.group({
        start: this.fb.control(<Date | null>null),
        end: this.fb.control(<Date | null>null),
      }),
      quota: this.fb.control('', [Validators.required]),
      expirience: this.fb.control('', [Validators.required]),
      jobType: this.fb.control('', [Validators.required]),
      salary: this.fb.group({
        type: this.fb.control('', [Validators.required]),
        value: this.fb.control('', [Validators.required]),
      }),
      location: this.fb.control('', [Validators.required]),
    });
  }

  onGoToItem(item) {
    this.breadcrumbsService.addBreadcrumbs({
      label: item.name,
      value: item,
      link: `/manager/vacancy-dashboard/${this.name}/${item.name}`,
    });

    this.router.navigate([item.name], {
      relativeTo: this.route,
    });
  }

  onChange({ editor }) {
    this.editorData = editor.getData();

    console.log(this.editorData);
  }

  clickOutside(event) {
    event.stopPropagation();
    // console.log(event);
    this.editMode = false;
  }

  clickOutsideForm(event, control) {
    if (!this.isCreation) {
      event.stopPropagation();
      // console.log(event);
      this.form.get(control).disable();
    }
  }

  openLocationModal() {
    // this.dialog.closeAll();

    this.dialog.open(GoogleMapsModalComponent, {
      width: '60vw',
      height: '600px',
      position: {
        left: 'calc(50% - 20vw)',
      },
      data: '',
    });
  }
}
