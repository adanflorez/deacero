import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertType } from 'src/app/lib/enums/alert-type';
import { UserService } from 'src/app/lib/services/user.service';

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
