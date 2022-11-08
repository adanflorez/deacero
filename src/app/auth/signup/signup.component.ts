import { AlertType } from 'src/app/lib/enums/alert-type';
import { AuthService } from 'src/app/lib/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  showAlert = false;
  alertType: AlertType = AlertType.Danger;
  alertMessage = '';
  signupForm!: FormGroup;

  constructor(private authService: AuthService) {
    this.signupForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', Validators.required),
    });
  }

  get f() {
    return this.signupForm.controls;
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
          console.log(res.data.token);
        },
        error: (error) => {
          this.showAlert = true;
          this.alertMessage = error.error.message;
          this.alertType = AlertType.Danger;
        },
      });
  }
}
