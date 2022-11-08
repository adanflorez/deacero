import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/lib/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss'],
})
export class PasswordRecoveryComponent implements OnInit {
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
        console.log(res);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
