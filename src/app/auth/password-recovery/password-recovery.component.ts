import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/lib/services/auth.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AlertType } from 'src/app/lib/enums/alert-type';

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
      next: (res) => {
        this.showModal = false;
        this.showAlert.emit({
          showAlert: true,
          message: 'Hemos enviado un mensaje a tu correo',
          alertType: AlertType.Success,
        });
        this.form.reset();
      },
      error: (error) => {
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
