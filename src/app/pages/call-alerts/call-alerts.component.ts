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
    generalProjectData: {
      comment: 'Comentario datos generales',
      category: 'Alimentación',
    },
    location: { comment: 'Comentario ubicacion' },
    projectManager: {
      comment: 'Comentario responsable del proyecto',
    },
    projectDevelopment: { comment: 'Comentario desarrollo del proyecto' },
    period: { comment: 'Comentario vigencia' },
    objectives: { comment: 'Comentario objetivos y metas' },
    projectBudget: { comment: 'Comentario presupuesto de proyecto' },
    communication: { comment: 'Comentario comunicacion' },
    documents: {},
    rating: { comment: 'Comentario calificaciones' },
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
