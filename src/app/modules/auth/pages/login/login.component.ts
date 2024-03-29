import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import Response from 'src/app/core/models/response.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { RoleService } from 'src/app/core/services/role.service';
import { AlertType } from 'src/app/shared/alert';

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

  constructor(
    private authService: AuthService,
    private roleService: RoleService,
    private router: Router
  ) {}

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
        next: async (res: any) => {
          try {
            localStorage.setItem(
              'token',
              (res as Response<boolean>).token as string
            );
            localStorage.setItem(
              'role',
              (res as Response<boolean>).rol as string
            );
            const isAdmin = await firstValueFrom(this.roleService.isAdmin());
            if (isAdmin) {
              this.router.navigate(['/user-management']);
            } else {
              this.router.navigate(['/home']);
            }
          } catch (error) {
            console.error(error);
          }
        },
        error: () => {
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
