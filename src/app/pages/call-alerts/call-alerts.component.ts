import { Component } from '@angular/core';
import GoverningBody from 'src/app/lib/models/governing-body.model';

@Component({
  selector: 'app-call-alerts',
  templateUrl: './call-alerts.component.html',
  styleUrls: ['./call-alerts.component.scss'],
})
export class CallAlertsComponent {
  formData: GoverningBody = {};

  updateData = (form: GoverningBody, isFormValid: boolean) => {
    const currentData = this.formData;
    console.log(isFormValid);
    console.log(form);
    const updatedData = { ...currentData, ...form };
    this.formData = updatedData;
  };
}
