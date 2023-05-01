import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { validateRFC } from 'src/app/core/helpers/rfc-validator';
import FormValid from 'src/app/core/models/form-valid.model';
import Response from 'src/app/core/models/response.model';
import { CallsUseCase } from 'src/app/domain';
import { AlertType } from 'src/app/shared/alert';

import { HomeForm } from './domain';
import { HomeService } from './infrastructure';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  showAlert = false;
  alertType: AlertType = AlertType.Danger;
  alertMessage = '';
  loading = false;
  infoSaved$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  formData: HomeForm;
  formsStatus: FormValid[];

  constructor(
    private readonly callsService: CallsUseCase,
    private homeService: HomeService
  ) {
    this.formsStatus = [];
    this.formData = {
      governingBody: {},
      remuneration: {},
      generalData: {},
      fundManager: {},
      organizationalInformation: {},
      strategicAlliances: {},
      decentWork: {},
    };
  }

  ngOnInit(): void {
    this.getApplication();
  }

  getApplication() {
    this.loading = true;
    this.homeService
      .get()
      .pipe(
        catchError(error => {
          this.showAlert = true;
          this.alertMessage = error.error.message;
          this.alertType = AlertType.Danger;
          return throwError(() => Error(error));
        })
      )
      .subscribe({
        next: (res: HomeForm) => {
          this.formData = res;
        },
        complete: () => {
          this.getCallStatus();
          this.loading = false;
        },
      });
  }

  getCallStatus(): void {
    setTimeout(() => {
      if (!this.isInvalidForm) {
        this.callsService.status().subscribe((res: unknown) => {
          if ((res as Response<unknown>).data) {
            this.infoSaved$.next(true);
          }
        });
      }
    }, 500);
  }

  get isInvalidForm(): boolean {
    return this.formsStatus.length > 0
      ? this.formsStatus.some(form => !form.valid)
      : true;
  }

  update() {
    this.homeService.update(this.formData).subscribe({
      next: () => {
        this.showAlert = true;
        this.alertMessage = 'Información de OSC actualizada';
        this.alertType = AlertType.Success;
      },
      error: () => {
        this.showAlert = true;
        this.alertMessage = 'Error al actualizar';
        this.alertType = AlertType.Danger;
      },
      complete: () => this.getApplication(),
    });
  }

  validateRFC(input: Event, control: AbstractControl) {
    validateRFC(input, control);
  }

  updateData = <T>(form: T, isFormValid: FormValid) => {
    const sectionName = isFormValid.name as keyof HomeForm;
    const sectionBody = {
      ...this.formData[sectionName],
      ...form,
    } as any;
    this.formData[sectionName] = sectionBody;
    this.updateFormStatus(isFormValid);
  };

  private updateFormStatus(formValid: FormValid): void {
    const index = this.formsStatus.findIndex(
      item => item.name === formValid.name
    );
    if (index === -1) {
      this.formsStatus.push(formValid);
    } else {
      this.formsStatus.splice(index, 1);
      this.formsStatus.push(formValid);
    }
  }
}
