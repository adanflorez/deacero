import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { AlertType } from 'src/app/shared/alert';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss'],
})
export class PasswordRecoveryComponent implements OnInit {
  @Output() showAlert = new EventEmitter();
  showModal = false;
  form!: FormGroup;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', Validators.email),
    });
  }

  get f() {
    return this.form.controls;
  }

  close() {
    this.showModal = false;
  }

  confirm() {
    if (this.form.invalid) return;
    this.authService.passwordRecovery(this.f['email'].value).subscribe({
      next: () => {
        this.showModal = false;
        this.showAlert.emit({
          showAlert: true,
          message: 'Hemos enviado un mensaje a tu correo',
          alertType: AlertType.Success,
        });
        this.form.reset();
      },
      error: () => {
        this.showModal = false;
        this.showAlert.emit({
          showAlert: true,
          message:
            'El correo no esta registrado, por favor verifica la información.',
          alertType: AlertType.Danger,
        });
      },
    });
  }
}
