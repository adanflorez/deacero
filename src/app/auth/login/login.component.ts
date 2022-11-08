import { AlertType } from 'src/app/lib/enums/alert-type';
import { AuthService } from 'src/app/lib/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('mschitiva68@gmail.com', Validators.email),
      password: new FormControl('6221830535', Validators.required),
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
          console.log(res);
        },
        error: (error) => {
          this.showAlert = true;
          this.message = 'Usuario y/o contraseña erradas';
          this.alertType = AlertType.Danger;
        },
      });
  }
}
