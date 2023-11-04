import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonUrls } from '../shared/constansts/common/common.constants';
import { AuthService } from '../service/auth.service';
import { LoadingService } from '../service/loading.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from '../shared/components/modals/confirmation-modal/confirmation-modal.component';
import { tap } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private loadingService: LoadingService,
    private _dialog: MatDialog,
  ) {}

  ngOnInit() {}

  registrationCompany(event) {
    console.log(event);
    this.loadingService.setLoading(true);
    this.authService.signUpCompany(event).subscribe((res) => {
      this.authService.setValueToLocalBase(res.user.role);
      this.loadingService.setLoading(false);
    });
  }

  registrationManager(event) {
    this.loadingService.setLoading(true);
    this.authService.signUpManager(event).subscribe(() => {
      this.loadingService.setLoading(false);
      this.openConfirmationModal();
    });
  }

  openConfirmationModal() {
    this._dialog.closeAll();
    this._dialog
      .open(ConfirmationModalComponent, {
        width: '40vw',
        height: '300px',
        position: {
          left: 'calc(50% - 15vw)',
        },
        panelClass: 'confirmation-modal',
        data: {
          text: 'Request for joining to the team was sent. Please wait acception.',
          title: 'Notiffication',
          withoutButtonCancel: true,
        },
      })
      .afterClosed()
      .subscribe(() => this.router.navigate(['home']));
  }
}
