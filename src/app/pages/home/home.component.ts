import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MULTIPLE_EMAIL_PATTERN,
  ONLY_NUMBERS_PATTERN,
} from 'src/app/lib/constants';
import { AlertType } from 'src/app/lib/enums/alert-type';
import { UserService } from 'src/app/lib/services/user.service';

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
  oscData: any = {};

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getOSC();
  }

  getOSC() {
    this.loading = true;
    this.userService.getOSC().subscribe((res) => {
      console.log(res);
      this.oscData = res.data;
      this.products = res.data.product;
      this.donations = res.data.donation;
      this.initForm();
      this.loading = false;
    });
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
      rfc: new FormControl(this.oscData.rfc, Validators.required),
      phone: new FormControl(this.oscData.telefono, [
        Validators.required,
        Validators.pattern(ONLY_NUMBERS_PATTERN),
        Validators.maxLength(12),
      ]),
      emails: new FormControl(this.oscData.email, [
        Validators.required,
        Validators.pattern(MULTIPLE_EMAIL_PATTERN),
      ]),
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

    this.form.get('issuesToStrengthen')?.valueChanges.subscribe((res) => {
      if (res === '11') {
        this.f['whichTopics'].enable();
        return;
      }
      this.f['whichTopics'].disable();
      this.f['whichTopics'].reset();
    });
    this.form.get('previousDonations')?.valueChanges.subscribe((val) => {
      this.showDonationsTable = val;
      this.donations = [];
    });
    this.showDonationsTable = this.f.previousDonations.value;
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
      next: (res) => {
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

  validateRFC(input: any) {
    var rfc = input.target.value.trim().toUpperCase(),
      valido;

    var rfcCorrecto = this.rfcValido(rfc); // ⬅️ Acá se comprueba

    if (rfcCorrecto) {
      valido = 'Válido';
      this.f.rfc.updateValueAndValidity();
    } else {
      valido = 'No válido';
      this.f.rfc.setErrors({ invalidRFC: true });
    }
  }

  rfcValido(rfc: any, aceptarGenerico = true) {
    const re =
      /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/;
    var validado = rfc.match(re);

    if (!validado)
      //Coincide con el formato general del regex?
      return false;

    //Separar el dígito verificador del resto del RFC
    const digitoVerificador = validado.pop(),
      rfcSinDigito = validado.slice(1).join(''),
      len = rfcSinDigito.length,
      //Obtener el digito esperado
      diccionario = '0123456789ABCDEFGHIJKLMN&OPQRSTUVWXYZ Ñ',
      indice = len + 1;
    var suma, digitoEsperado;

    if (len == 12) suma = 0;
    else suma = 481; //Ajuste para persona moral

    for (var i = 0; i < len; i++)
      suma += diccionario.indexOf(rfcSinDigito.charAt(i)) * (indice - i);
    digitoEsperado = 11 - (suma % 11);
    if (digitoEsperado == 11) digitoEsperado = 0;
    else if (digitoEsperado == 10) digitoEsperado = 'A';

    //El dígito verificador coincide con el esperado?
    // o es un RFC Genérico (ventas a público general)?
    if (
      digitoVerificador != digitoEsperado &&
      (!aceptarGenerico || rfcSinDigito + digitoVerificador != 'XAXX010101000')
    )
      return false;
    else if (
      !aceptarGenerico &&
      rfcSinDigito + digitoVerificador == 'XEXX010101000'
    )
      return false;
    return rfcSinDigito + digitoVerificador;
  }
}
