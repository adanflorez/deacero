import { BehaviorSubject } from 'rxjs';
import { Component } from '@angular/core';
import CallForm from 'src/app/lib/models/call-form.model';

@Component({
  selector: 'app-call-alerts',
  templateUrl: './call-alerts.component.html',
  styleUrls: ['./call-alerts.component.scss'],
})
export class CallAlertsComponent {
  formData: CallForm = {};
  infoSaved$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  updateData = (form: CallForm, isFormValid: boolean) => {
    const currentData = this.formData;
    const updatedData = { ...currentData, ...form };
    this.formData = updatedData;
    console.log(isFormValid);
    console.log(this.formData);
  };

  get isValidForm(): boolean {
    return true;
  }
}
