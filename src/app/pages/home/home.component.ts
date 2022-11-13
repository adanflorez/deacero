import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MULTIPLE_EMAIL_PATTERN,
  ONLY_NUMBERS_PATTERN,
} from 'src/app/lib/constants';
import { AlertType } from 'src/app/lib/enums/alert-type';
import { UserService } from 'src/app/lib/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  form: FormGroup;
  showAlert = false;
  alertType: AlertType = AlertType.Danger;
  alertMessage = '';

  constructor(private userService: UserService) {
    this.form = new FormGroup({
      tradename: new FormControl('', Validators.required),
      businessname: new FormControl('', Validators.required),
      rfc: new FormControl('', Validators.required),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(ONLY_NUMBERS_PATTERN),
        Validators.maxLength(12),
      ]),
      emails: new FormControl('', [
        Validators.required,
        Validators.pattern(MULTIPLE_EMAIL_PATTERN),
      ]),
      name: new FormControl('', Validators.required),
      responsibleEmail: new FormControl('', [
        Validators.required,
        Validators.pattern(MULTIPLE_EMAIL_PATTERN),
      ]),
      cellphone: new FormControl('', [
        Validators.required,
        Validators.pattern(ONLY_NUMBERS_PATTERN),
        Validators.maxLength(12),
      ]),
      founder: new FormControl('', Validators.required),
      generalManagement: new FormControl('', Validators.required),
      operationalManagement: new FormControl('', Validators.required),
      legalRepresentative: new FormControl('', Validators.required),
      legalRepresentativeEmail: new FormControl('', [
        Validators.required,
        Validators.pattern(MULTIPLE_EMAIL_PATTERN),
      ]),
      operationsStartDate: new FormControl('', Validators.required),
      incorporationsStartDate: new FormControl('', Validators.required),
      mision: new FormControl('', Validators.required),
      vision: new FormControl('', Validators.required),
      ethicalValues: new FormControl('', Validators.required),
    });
  }

  get f() {
    return this.form.controls;
  }

  update() {
    this.userService.updateOSC(this.f['name'].value).subscribe({
      next: (res) => {
        this.form.reset();
        this.showAlert = true;
        this.alertMessage = 'Nombre actualizado';
        this.alertType = AlertType.Success;
      },
      error: () => {
        this.showAlert = true;
        this.alertMessage = 'Error al actualizar';
        this.alertType = AlertType.Danger;
      },
    });
  }
}
