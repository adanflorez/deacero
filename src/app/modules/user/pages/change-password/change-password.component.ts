import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PASSWORD_PATERN } from 'src/app/core/constants';
import { CustomValidators } from 'src/app/core/helpers/custom-validators';
import { AlertType } from 'src/app/shared/alert';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let window: any;

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  public changePasswordForm: FormGroup;
  public passwordFieldType: string;
  public passwordButtonIcon: string;
  public oldPasswordFieldType: string;
  public oldPasswordButtonIcon: string;
  public confirmPasswordFieldType: string;
  public confirmPasswordButtonIcon: string;
  public showAlert: boolean;
  public alertType: AlertType;
  public alertMessage: string;

  constructor() {
    this.changePasswordForm = this.initForm();
    this.oldPasswordFieldType = 'password';
    this.oldPasswordButtonIcon = 'lock';
    this.passwordFieldType = 'password';
    this.passwordButtonIcon = 'lock';
    this.confirmPasswordFieldType = 'password';
    this.confirmPasswordButtonIcon = 'lock';
    this.showAlert = false;
    this.alertType = AlertType.Danger;
    this.alertMessage = '';
  }
  ngOnInit(): void {
    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.forEach(function (tooltipTriggerEl) {
      return new window.bootstrap.Tooltip(tooltipTriggerEl);
    });
  }

  public initForm() {
    return new FormGroup(
      {
        oldPassword: new FormControl('', Validators.required),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(PASSWORD_PATERN),
        ]),
        confirmPassword: new FormControl('', Validators.required),
      },
      [CustomValidators.MatchValidator('password', 'confirmPassword')]
    );
  }

  public get f() {
    return this.changePasswordForm.controls;
  }

  public get passwordMatchError() {
    return (
      this.changePasswordForm.getError('mismatch') &&
      this.changePasswordForm.get('confirmPassword')?.touched
    );
  }

  public showHidePassword(field: number): void {
    if (field === 1) {
      if (this.oldPasswordFieldType === 'password') {
        this.oldPasswordFieldType = 'text';
        this.oldPasswordButtonIcon = 'unlock';
        return;
      }
      this.oldPasswordFieldType = 'password';
      this.oldPasswordButtonIcon = 'lock';
    } else if (field === 2) {
      if (this.passwordFieldType === 'password') {
        this.passwordFieldType = 'text';
        this.passwordButtonIcon = 'unlock';
        return;
      }
      this.passwordFieldType = 'password';
      this.passwordButtonIcon = 'lock';
    } else {
      if (this.confirmPasswordFieldType === 'password') {
        this.confirmPasswordFieldType = 'text';
        this.confirmPasswordButtonIcon = 'unlock';
        return;
      }
      this.confirmPasswordFieldType = 'password';
      this.confirmPasswordButtonIcon = 'lock';
    }
  }
}
