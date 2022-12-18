import { Component } from '@angular/core';
import GoverningBody from 'src/app/lib/models/governing-body.model';
import RemunerationForm from 'src/app/lib/models/remuneration-form.model';

@Component({
  selector: 'app-call-alerts',
  templateUrl: './call-alerts.component.html',
  styleUrls: ['./call-alerts.component.scss'],
})
export class CallAlertsComponent {
  formData: GoverningBody & RemunerationForm = {};

  updateData = (
    form: GoverningBody & RemunerationForm,
    isFormValid: boolean
  ) => {
    const currentData = this.formData;
    console.log(isFormValid);
    console.log(form);
    const updatedData = { ...currentData, ...form };
    this.formData = updatedData;
  };
}
