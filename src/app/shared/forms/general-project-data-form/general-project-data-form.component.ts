import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CallSection } from 'src/app/core/enums/sections.enum';
import FormValid from 'src/app/core/models/form-valid.model';
import { AlertType } from 'src/app/shared/alert';

import { GeneralProjectDataForm } from './domain';

@Component({
  selector: 'app-general-project-data-form',
  templateUrl: './general-project-data-form.component.html',
  styleUrls: ['./general-project-data-form.component.scss'],
})
export class GeneralProjectDataFormComponent implements OnInit {
  @Input() updateParentModel: (
    part: GeneralProjectDataForm,
    isFormValid: FormValid
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  ) => void = () => {};
  @Input() defaultValues: GeneralProjectDataForm;
  form: FormGroup;

  categories: string[] = [];
  groups: string[];
  alertType: AlertType = AlertType.Warning;

  private unsubscribe: Subscription[] = [];

  constructor() {
    this.defaultValues = {};
    this.categories = [
      // 'Alimentación',
      // 'Asistencia jurídica',
      // 'Asistencia o rehabilitación médica',
      // 'Atención a grupos sociales con discapacidad',
      'Becas',
      // 'Defensa y promoción de los DH',
      // 'Desarrollo comunidades indígenas.',
      // 'Desarrollo Institucional',
      // 'Desarrollo urbano',
      // 'Detonación de oportunidades para la resiliencia económica.',
      // 'Ecología',
      'Educación',
      // 'Empoderamiento social',
      // 'Equipamiento',
      // 'Fomento educativo',
      // 'Inclusión',
      // 'Infraestructura',
      // 'Medio ambiente',
      // 'Nutrición',
      // 'Orientación social',
      // 'Participación ciudadana.',
      // 'Promoción y difusión cultural',
      // 'Reinserción social',
      // 'Salud mental',
      'Primera infancia', //24
      'Ciencia y tecnología calidad de vida', //25
      'Emprendimiento', //26
    ];
    this.groups = [];
    this.form = new FormGroup({});
  }

  ngOnInit(): void {
    this.initForm();
    this.updateParentModel({}, this.isValid);
  }

  get f() {
    return this.form.controls;
  }

  get isValid(): FormValid {
    return {
      name: CallSection.GENERAL_PROJECT_DATA,
      valid: this.form.valid,
    };
  }

  initForm() {
    this.form = new FormGroup({
      projectName: new FormControl(this.defaultValues.projectName, [
        Validators.required,
      ]),
      category: new FormControl(
        this.defaultValues.category,
        Validators.required
      ),
    });
    this.subscribeToForm();
    this.handleCategory();
  }

  subscribeToForm() {
    const sub = this.form.valueChanges.subscribe(val => {
      this.updateParentModel({ ...val }, this.isValid);
    });
    this.unsubscribe.push(sub);
  }

  private handleCategory() {
    const sub = this.form
      .get('category')
      ?.valueChanges.subscribe(() => this.changeCategory());
    this.unsubscribe.push(sub as Subscription);
  }

  private changeCategory() {
    // Reset previous controls
    switch (this.f.category.value) {
      case this.categories[0]:
      case this.categories[1]:
      case this.categories[2]:
      case this.categories[4]:
        this.groups = [
          'socialBackwardness',
          'capacityBuilding',
          'communitySense',
          'sustainabilityProcesses',
        ];
        break;
      case this.categories[3]:
        this.groups = [
          'livingConditions',
          'lifeQuality',
          'capacityBuilding',
          'supportType',
          'supportScope',
          'resilienceBuilding',
        ];
        break;
      default:
        this.groups = [];
        break;
    }
    // Set validators to current controls
    this.setValidatorsToRating();
  }

  private setValidatorsToRating() {
    this.groups.forEach(group => {
      this.form.get(group)?.setValidators(Validators.required);
    });
  }
}
