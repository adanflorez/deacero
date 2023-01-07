import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import {
  MULTIPLE_EMAIL_PATTERN,
  ONLY_NUMBERS_PATTERN,
} from 'src/app/lib/constants';
import { AlertType } from 'src/app/lib/enums/alert-type';
import { CallService } from 'src/app/lib/services/call.service';
import { UserService } from 'src/app/lib/services/user.service';
import Response from 'src/app/lib/models/response.model';
import { validateRFC } from 'src/app/lib/helpers/rfc-validator';
import CallForm from 'src/app/lib/models/call-form.model';
import FormValid from 'src/app/lib/models/form-valid.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  form: FormGroup;
  showAlert = false;
  alertType: AlertType = AlertType.Danger;
  alertMessage = '';
  showDonationsTable = false;
  products = [];
  donations = [];
  loading = false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  oscData: any = {};
  infoSaved$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  formData: Partial<CallForm>;
  formsStatus: FormValid[];

  constructor(
    private userService: UserService,
    private callService: CallService
  ) {
    this.form = new FormGroup({});
    this.formsStatus = [];
    this.formData = {
      generalData: {},
      fundManager: {},
      organizationalInformation: {},
      strategicAlliances: {},
      decentWork: {},
    };
  }

  ngOnInit(): void {
    this.getOSC();
  }

  getOSC() {
    this.loading = true;
    this.userService
      .getOSC()
      .pipe(
        catchError(error => {
          this.showAlert = true;
          this.alertMessage = error.error.message;
          this.alertType = AlertType.Danger;
          return throwError(() => Error(error));
        })
      )
      .subscribe((res: any) => {
        this.formData = {
          generalData: {
            rfc: res.data.generalData.RFC,
            emails: res.data.generalData.email,
            businessname: res.data.generalData.razonSocial,
            position: res.data.generalData.position,
            tradename: res.data.generalData.nombreComercial,
            phone: res.data.generalData.telefono,
          },
          fundManager: {
            cellphone: res.data.procuringFunds?.celular,
            responsibleEmail: res.data.procuringFunds?.emailDelResponsable,
            name: res.data.procuringFunds?.nombre,
          },
          organizationalInformation: {
            generalManagement:
              res.data.organizationalInformation?.direccionGeneral,
            operationalManagement:
              res.data.organizationalInformation?.direccionOperativa,
            legalRepresentativeEmail:
              res.data.organizationalInformation?.emailDelRepresentanteLegal,
            incorporationsStartDate:
              res.data.organizationalInformation?.fechaDeConstitucion,
            operationsStartDate:
              res.data.organizationalInformation?.fechaInicioOperaciones,
            founder: res.data.organizationalInformation?.fundador,
            mission: res.data.organizationalInformation?.mision,
            legalRepresentative:
              res.data.organizationalInformation?.representanteLegal,
            ethicalValues: res.data.organizationalInformation?.valores,
            vision: res.data.organizationalInformation?.vision,
          },
          strategicAlliances: {
            donations: res.data.sustainabilityAndStrategic?.donation,
            products: res.data.sustainabilityAndStrategic?.product,
            previousDonations:
              res.data.sustainabilityAndStrategic?.recibioUnaDonacion,
            strategicalAlliances:
              res.data.sustainabilityAndStrategic?.actividadesEspecificasFDA,
            issuesToStrengthen:
              res.data.sustainabilityAndStrategic?.temasAFortalecer,
            whichTopics: res.data.sustainabilityAndStrategic?.temasDescripcion,
            alliances: res.data.sustainabilityAndStrategic?.redDeAlianzas,
            courses:
              res.data.sustainabilityAndStrategic?.listaCursosDeActualizacion,
          },
          decentWork: {},
        };
        this.oscData = res.data;
        this.products = (res.data as { product: never[] })?.product || [];
        this.donations = (res.data as { donation: never[] })?.donation || [];
        this.initForm();
        this.getCallStatus();
        this.loading = false;
      });
  }

  getCallStatus(): void {
    if (this.form.valid) {
      this.callService.status().subscribe((res: unknown) => {
        if ((res as Response<unknown>).data) {
          this.infoSaved$.next(true);
          this.form.disable();
        }
      });
    }
  }

  initForm() {
    this.form = new FormGroup({
      whyYourOSC: new FormControl(
        this.oscData.porqueTrabajarEnTuOSC,
        Validators.required
      ),
      whatMakesYouDifferent: new FormControl(
        this.oscData.diferenciasDeTuOsc,
        Validators.required
      ),
      benefitsSystem: new FormControl(
        this.oscData.descripcionOSC,
        Validators.required
      ),
      personalGrowth: new FormControl(
        this.oscData.crecimientoPersonal,
        Validators.required
      ),
    });
    this.form.markAllAsTouched();
  }

  get f() {
    return this.form.controls;
  }

  get isInvalidForm(): boolean {
    return this.formsStatus.length > 0
      ? this.formsStatus.some(form => !form.valid)
      : true;
  }

  update() {
    const form = {
      nombreComercial: this.f.tradename.value,
      razonSocial: this.f.businessname.value,
      rfc: this.f.rfc.value,
      telefono: this.f.phone.value,
      email: this.f.emails.value,
      position: this.f.position.value,
      nombre: this.f.name.value,
      emailDelResponsable: this.f.responsibleEmail.value,
      celular: this.f.cellphone.value,
      fundador: this.f.founder.value,
      direccionGeneral: this.f.generalManagement.value,
      direccionOperativa: this.f.operationalManagement.value,
      representanteLegal: this.f.legalRepresentative.value,
      emailDelRepresentanteLegal: this.f.legalRepresentativeEmail.value,
      fechaInicioOperaciones: this.f.operationsStartDate.value,
      fechaDeConstitucion: this.f.incorporationsStartDate.value,
      mision: this.f.mision.value,
      vision: this.f.vision.value,
      valores: this.f.ethicalValues.value,
      redDeAlianzas: this.f.alliances.value,
      listaCursosDeActualizacion: this.f.courses.value,
      temasAFortalecer: this.f.issuesToStrengthen.value,
      temasDescripcion: this.f.whichTopics.value,
      recibioUnaDonacion: this.f.previousDonations.value,
      actividadesEspecificasFDA: this.f.strategicAlliances.value,
      porqueTrabajarEnTuOSC: this.f.whyYourOSC.value,
      diferenciasDeTuOsc: this.f.whatMakesYouDifferent.value,
      descripcionOSC: this.f.benefitsSystem.value,
      crecimientoPersonal: this.f.personalGrowth.value,
      product: this.products,
      donation: this.donations,
    };
    this.userService.updateOSC(form).subscribe({
      next: () => {
        this.form.reset();
        this.showAlert = true;
        this.alertMessage = 'Información de OSC actualizada';
        this.alertType = AlertType.Success;
      },
      error: () => {
        this.showAlert = true;
        this.alertMessage = 'Error al actualizar';
        this.alertType = AlertType.Danger;
      },
      complete: () => this.getOSC(),
    });
  }

  validateRFC(input: Event, control: AbstractControl) {
    validateRFC(input, control);
  }

  updateData = <T>(form: T, isFormValid: FormValid) => {
    const sectionName = isFormValid.name as keyof CallForm;
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
