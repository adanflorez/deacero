import { AuthService } from 'src/app/core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-validate',
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.scss'],
})
export class ValidateComponent implements OnInit {
  title = '';
  message = '';
  success = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const { code, derivation, email } = params;
      this.validate(code, derivation, email);
    });
  }

  validate(code: string, derivation: string, email: string) {
    this.authService.validateUser(code, derivation, email).subscribe({
      next: () => {
        this.title = 'Tu contraseña ha sido actualizada';
        this.message = 'Hemos enviado un correo, por favor revisa tu bandeja';
        this.success = true;
      },
      error: () => {
        this.title = 'Error';
        this.message = 'El enlace ha expirado';
        this.success = false;
      },
    });
  }

  get textClass(): string {
    return this.success ? 'text-success' : 'text-danger';
  }
}
