import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PASSWORD_PATERN } from 'src/app/lib/constants';
import { CustomValidators } from 'src/app/lib/helpers/custom-validators';
import { validateRFC } from 'src/app/lib/helpers/rfc-validator';
import { AuthService } from 'src/app/lib/services/auth.service';
import { AlertType } from 'src/app/lib/enums/alert-type';

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
  rfcValidated$: BehaviorSubject<boolean>;
  rfcValidatedExists$: BehaviorSubject<boolean>;
  showMultisiteField: boolean;
  showMultisiteAlert: boolean;

  constructor(private authService: AuthService, private router: Router) {
    this.signupForm = new FormGroup(
      {
        name: new FormControl('FDE050318P80', Validators.required),
        siteName: new FormControl('', { nonNullable: true }),
        email: new FormControl('', [Validators.email, Validators.required]),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(PASSWORD_PATERN),
        ]),
        confirmPassword: new FormControl('', Validators.required),
      },
      [CustomValidators.MatchValidator('password', 'confirmPassword')]
    );
    this.rfcValidated$ = new BehaviorSubject(false);
    this.rfcValidatedExists$ = new BehaviorSubject(false);
    this.showMultisiteField = false;
    this.showMultisiteAlert = false;
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

  validateRFC(input: Event, control: AbstractControl<unknown, unknown>) {
    this.resetForm();
    validateRFC(input, control);
  }

  validateRFCExists(rfc: string) {
    this.showMultisiteAlert = false;
    this.authService.validateRFCExists(rfc).subscribe({
      next: response => {
        this.rfcValidated$.next(true);
        this.rfcValidatedExists$.next(response);
        this.showMultisiteAlert = true;
      },
      error: err => {
        console.error(err);
      },
    });
  }

  enableSiteNameField() {
    this.showMultisiteField = true;
    this.showMultisiteAlert = false;
    this.signupForm.get('siteName')?.setValidators(Validators.required);
    this.signupForm.markAllAsTouched();
  }

  private resetForm() {
    this.rfcValidated$.next(false);
    this.showMultisiteAlert = false;
    this.showMultisiteField = false;
    this.signupForm.get('siteName')?.reset();
    this.signupForm.get('siteName')?.setValidators(null);
  }
}
