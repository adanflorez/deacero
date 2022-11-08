import { AlertType } from 'src/app/lib/enums/alert-type';
import { UserService } from './../lib/services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  form: FormGroup;
  showAlert = false;
  alertType: AlertType = AlertType.Danger;
  alertMessage = '';

  constructor(private userService: UserService) {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
    });
  }

  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {}

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
