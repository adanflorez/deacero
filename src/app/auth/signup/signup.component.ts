import { AlertType } from 'src/app/lib/enums/alert-type';
import { AuthService } from 'src/app/lib/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PASSWORD_PATERN, ALPHABET, RFC_PATTERN } from 'src/app/lib/constants';
import { CustomValidators } from 'src/app/lib/helpers/custom-validators';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    tooltipTriggerList.forEach(function (tooltipTriggerEl) {
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  validateRFC(input: Event) {
    const rfc = (input.target as HTMLInputElement).value.trim().toUpperCase();

    if (this.validRFC(rfc)) {
      this.f.name.updateValueAndValidity();
    } else {
      this.f.name.setErrors({ invalidRFC: true });
    }
  }

  validRFC(rfc: string, acceptGeneric = true) {
    const re = RFC_PATTERN;
    const isValidated = rfc.match(re);

    if (!isValidated) return false;

    // Separate the check digit from the rest of the RFC
    const digitVerifier = isValidated.pop(),
      rfcWithoutDigit = isValidated.slice(1).join(''),
      len = rfcWithoutDigit.length,
      // Obtain the expected digit
      dictionary = ALPHABET,
      index = len + 1;
    let sum, digitExpected;

    if (len == 12) sum = 0;
    else sum = 481; // Adjustment for legal entity

    for (let i = 0; i < len; i++)
      sum += dictionary.indexOf(rfcWithoutDigit.charAt(i)) * (index - i);
    digitExpected = 11 - (sum % 11);
    if (digitExpected == 11) digitExpected = 0;
    else if (digitExpected == 10) digitExpected = 'A';

    // Does the check digit match the expected digit?
    // or is it a Generic RFC (sales to general public)?
    if (
      (digitVerifier != digitExpected &&
        (!acceptGeneric ||
          rfcWithoutDigit + digitVerifier != 'XAXX010101000')) ||
      (!acceptGeneric && rfcWithoutDigit + digitVerifier == 'XEXX010101000')
    )
      return false;
    return rfcWithoutDigit + digitVerifier;
  }
}
