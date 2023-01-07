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

  constructor(
    private userService: UserService,
    private callService: CallService
  ) {
    this.form = new FormGroup({});
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
      .subscribe((res: Response<unknown>) => {
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
      tradename: new FormControl(
        this.oscData.nombreComercial,
        Validators.required
      ),
      businessname: new FormControl(
        this.oscData.razonSocial,
        Validators.required
      ),
      rfc: new FormControl(
        { value: this.oscData.rfc, disabled: true },
        Validators.required
      ),
      phone: new FormControl(this.oscData.telefono, [
        Validators.required,
        Validators.pattern(ONLY_NUMBERS_PATTERN),
        Validators.maxLength(12),
      ]),
      emails: new FormControl(this.oscData.email, [
        Validators.required,
        Validators.pattern(MULTIPLE_EMAIL_PATTERN),
      ]),
      position: new FormControl(this.oscData.position, [Validators.required]),
      name: new FormControl(this.oscData.nombre, Validators.required),
      responsibleEmail: new FormControl(this.oscData.emailDelResponsable, [
        Validators.required,
        Validators.pattern(MULTIPLE_EMAIL_PATTERN),
      ]),
      cellphone: new FormControl(this.oscData.celular, [
        Validators.required,
        Validators.pattern(ONLY_NUMBERS_PATTERN),
        Validators.maxLength(12),
      ]),
      founder: new FormControl(this.oscData.fundador, Validators.required),
      generalManagement: new FormControl(
        this.oscData.direccionGeneral,
        Validators.required
      ),
      operationalManagement: new FormControl(
        this.oscData.direccionOperativa,
        Validators.required
      ),
      legalRepresentative: new FormControl(
        this.oscData.representanteLegal,
        Validators.required
      ),
      legalRepresentativeEmail: new FormControl(
        this.oscData.emailDelRepresentanteLegal,
        [Validators.required, Validators.pattern(MULTIPLE_EMAIL_PATTERN)]
      ),
      operationsStartDate: new FormControl(
        this.oscData.fechaInicioOperaciones,
        Validators.required
      ),
      incorporationsStartDate: new FormControl(
        this.oscData.fechaDeConstitucion,
        Validators.required
      ),
      mision: new FormControl(this.oscData.mision, Validators.required),
      vision: new FormControl(this.oscData.vision, Validators.required),
      ethicalValues: new FormControl(this.oscData.valores, Validators.required),
      alliances: new FormControl(this.oscData.redDeAlianzas),
      courses: new FormControl(
        this.oscData.listaCursosDeActualizacion,
        Validators.required
      ),
      issuesToStrengthen: new FormControl(
        this.oscData.temasAFortalecer,
        Validators.required
      ),
      whichTopics: new FormControl(
        { value: this.oscData.temasDescripcion, disabled: true },
        Validators.required
      ),
      previousDonations: new FormControl(
        this.oscData.recibioUnaDonacion || true,
        Validators.required
      ),
      strategicAlliances: new FormControl(
        this.oscData.actividadesEspecificasFDA,
        Validators.required
      ),
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

    this.form
      .get('issuesToStrengthen')
      ?.valueChanges.subscribe((res: string[]) => {
        if (res.includes('Otros')) {
          this.f['whichTopics'].enable();
          return;
        }
        this.f['whichTopics'].disable();
        this.f['whichTopics'].reset();
      });
    this.form.get('previousDonations')?.valueChanges.subscribe(val => {
      this.showDonationsTable = val;
      this.donations = [];
    });
    this.showDonationsTable = this.f.previousDonations.value;
    this.form.markAllAsTouched();
  }

  get f() {
    return this.form.controls;
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
}
