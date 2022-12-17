import { AlertType } from 'src/app/lib/enums/alert-type';
import { AuthService } from 'src/app/lib/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PASSWORD_PATERN } from 'src/app/lib/constants';
import { CustomValidators } from 'src/app/lib/helpers/custom-validators';

declare let window: any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  showAlert = false;
  alertType: AlertType = AlertType.Danger;
  alertMessage = '';
  signupForm!: FormGroup;
  passwordFieldType = 'password';
  confirmPasswordFieldType = 'password';
  passwordButonnIcon = 'lock';
  confirmPasswordButonnIcon = 'lock';

  constructor(private authService: AuthService, private router: Router) {
    this.signupForm = new FormGroup(
      {
        name: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.email, Validators.required]),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(PASSWORD_PATERN),
        ]),
        confirmPassword: new FormControl('', Validators.required),
      },
      [CustomValidators.MatchValidator('password', 'confirmPassword')]
    );
  }

  ngOnInit(): void {
    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new window.bootstrap.Tooltip(tooltipTriggerEl);
    });
  }

  get f() {
    return this.signupForm.controls;
  }

  get passwordMatchError() {
    return (
      this.signupForm.getError('mismatch') &&
      this.signupForm.get('confirmPassword')?.touched
    );
  }

  signup() {
    this.authService
      .signup(
        this.f['email'].value,
        this.f['password'].value,
        this.f['name'].value
      )
      .subscribe({
        next: (res: any) => {
          localStorage.setItem('token', res.data.token);
          this.router.navigate(['/home']);
        },
        error: error => {
          this.showAlert = true;
          this.alertMessage = error.error.message;
          this.alertType = AlertType.Danger;
        },
      });
  }

  showHidePassword(field: number): void {
    if (field === 1) {
      if (this.passwordFieldType === 'password') {
        this.passwordFieldType = 'text';
        this.passwordButonnIcon = 'unlock';
        return;
      }
      this.passwordFieldType = 'password';
      this.passwordButonnIcon = 'lock';
    } else {
      if (this.confirmPasswordFieldType === 'password') {
        this.confirmPasswordFieldType = 'text';
        this.confirmPasswordButonnIcon = 'unlock';
        return;
      }
      this.confirmPasswordFieldType = 'password';
      this.confirmPasswordButonnIcon = 'lock';
    }
  }

  validateRFC(input: any) {
    let rfc = input.target.value.trim().toUpperCase(),
      valido;

    const rfcCorrecto = this.rfcValido(rfc); // ⬅️ Acá se comprueba

    if (rfcCorrecto) {
      valido = 'Válido';
      this.f.name.updateValueAndValidity();
    } else {
      valido = 'No válido';
      this.f.name.setErrors({ invalidRFC: true });
    }
  }

  rfcValido(rfc: any, aceptarGenerico = true) {
    const re =
      /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/;
    const validado = rfc.match(re);

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
    let suma, digitoEsperado;

    if (len == 12) suma = 0;
    else suma = 481; //Ajuste para persona moral

    for (let i = 0; i < len; i++)
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
