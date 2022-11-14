import { Component } from '@angular/core';
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
export class HomeComponent {
  form: FormGroup;
  showAlert = false;
  alertType: AlertType = AlertType.Danger;
  alertMessage = '';

  constructor(private userService: UserService) {
    this.form = new FormGroup({
      tradename: new FormControl('', Validators.required),
      businessname: new FormControl('', Validators.required),
      rfc: new FormControl('', Validators.required),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(ONLY_NUMBERS_PATTERN),
        Validators.maxLength(12),
      ]),
      emails: new FormControl('', [
        Validators.required,
        Validators.pattern(MULTIPLE_EMAIL_PATTERN),
      ]),
      name: new FormControl('', Validators.required),
      responsibleEmail: new FormControl('', [
        Validators.required,
        Validators.pattern(MULTIPLE_EMAIL_PATTERN),
      ]),
      cellphone: new FormControl('', [
        Validators.required,
        Validators.pattern(ONLY_NUMBERS_PATTERN),
        Validators.maxLength(12),
      ]),
      founder: new FormControl('', Validators.required),
      generalManagement: new FormControl('', Validators.required),
      operationalManagement: new FormControl('', Validators.required),
      legalRepresentative: new FormControl('', Validators.required),
      legalRepresentativeEmail: new FormControl('', [
        Validators.required,
        Validators.pattern(MULTIPLE_EMAIL_PATTERN),
      ]),
      operationsStartDate: new FormControl('', Validators.required),
      incorporationsStartDate: new FormControl('', Validators.required),
      mision: new FormControl('', Validators.required),
      vision: new FormControl('', Validators.required),
      ethicalValues: new FormControl('', Validators.required),
      alliances: new FormControl(''),
      courses: new FormControl('', Validators.required),
      issuesToStrengthen: new FormControl('', Validators.required),
      whichTopics: new FormControl(
        { value: '', disabled: true },
        Validators.required
      ),
      previousDonations: new FormControl(false, Validators.required),
      strategicAlliances: new FormControl('', Validators.required),
      whyYourOSC: new FormControl('', Validators.required),
      whatMakesYouDifferent: new FormControl('', Validators.required),
      benefitsSystem: new FormControl('', Validators.required),
      personalGrowth: new FormControl('', Validators.required),
    });

    this.form.get('issuesToStrengthen')?.valueChanges.subscribe((res) => {
      if (res === '11') {
        this.f['whichTopics'].enable();
        return;
      }
      this.f['whichTopics'].disable();
      this.f['whichTopics'].reset();
    });
  }

  get f() {
    return this.form.controls;
  }

  update() {
    this.userService.updateOSC(this.f['name'].value).subscribe({
      next: (res) => {
        this.form.reset();
        this.showAlert = true;
        this.alertMessage = 'Nombre actualizado';
        this.alertType = AlertType.Success;
      },
      error: () => {
        this.showAlert = true;
        this.alertMessage = 'Error al actualizar';
        this.alertType = AlertType.Danger;
      },
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
