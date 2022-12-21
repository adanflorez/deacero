import { BehaviorSubject } from 'rxjs';
import { Component } from '@angular/core';
import CallForm from 'src/app/lib/models/call-form.model';
import FormValid from 'src/app/lib/models/form-valid.model';

@Component({
  selector: 'app-call-alerts',
  templateUrl: './call-alerts.component.html',
  styleUrls: ['./call-alerts.component.scss'],
})
export class CallAlertsComponent {
  formData: CallForm = {
    governingBody: {
      comment: 'Ajustes',
    },
    remuneration: { comment: 'Comenatrio remuneracion' },
    generalProjectDataComment: 'Comentario datos generales',
    locationComment: 'Comentario ubicacion',
    projectManagerComment: 'Comentario responsable del proyecto',
    projectDevelopmentComment: 'Comentario desarrollo del proyecto',
    periodComment: 'Comentario vigencia',
    objectivesComment: 'Comentario objetivos y metas',
    projectBudgetComment: 'Comentario presupuesto de proyecto',
    socialMediaComment: 'Comentario comunicacion',
  };
  infoSaved$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  formsStatus: FormValid[];

  constructor() {
    this.formsStatus = [];
  }

  updateData = <T>(form: T, isFormValid: FormValid) => {
    const currentData = this.formData;
    const updatedData = { ...currentData, ...form };
    this.formData = updatedData;
    console.log(isFormValid);
    this.updateFormStatus(isFormValid);
  };

  private updateFormStatus(formValid: FormValid): void {
    const index = this.formsStatus.findIndex(
      item => item.name === formValid.name
    );
    if (index === -1) {
      this.formsStatus.push(formValid);
    } else {
      this.formsStatus.splice(index, 1);
      this.formsStatus.push(formValid);
    }
  }

  get isInvalidForm(): boolean {
    return this.formsStatus.length > 0
      ? this.formsStatus.some(form => !form.valid)
      : true;
  }

  save() {
    console.log('sending...');
  }
}
