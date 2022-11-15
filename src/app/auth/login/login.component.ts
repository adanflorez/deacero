import { AlertType } from 'src/app/lib/enums/alert-type';
import { AuthService } from 'src/app/lib/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showAlert = false;
  message = '';
  alertType: AlertType = AlertType.Danger;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    localStorage.clear();
    this.initForm();
  }

  initForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', Validators.required),
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  login() {
    this.authService
      .login(this.f['username'].value, this.f['password'].value)
      .subscribe({
        next: (res) => {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.setAlert(
            true,
            'Usuario y/o contraseña incorrecto',
            AlertType.Danger
          );
        },
      });
  }

  setAlert(showAlert: boolean, message: string, alertType: AlertType) {
    this.showAlert = showAlert;
    this.message = message;
    this.alertType = alertType;
  }
}
