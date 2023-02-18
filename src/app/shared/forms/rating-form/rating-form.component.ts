import { Component, Input, OnChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { RATING } from 'src/app/core/constants';
import { CallSection } from 'src/app/core/enums/sections.enum';
import FormValid from 'src/app/core/models/form-valid.model';
import { AlertType } from 'src/app/shared/alert';

import { RatingForm } from './domain';

@Component({
  selector: 'app-rating-form',
  templateUrl: './rating-form.component.html',
  styleUrls: ['./rating-form.component.scss'],
})
export class RatingFormComponent implements OnChanges {
  @Input() updateParentModel: (
    part: RatingForm,
    formValid: FormValid
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  ) => void = () => {};
  @Input() defaultValues: RatingForm;
  @Input() category: string;
  form!: FormGroup;
  rating = RATING;
  groups: string[];

  categories = [
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

  alertType: AlertType = AlertType.Warning;

  private unsubscribe: Subscription[] = [];

  constructor() {
    this.defaultValues = {};
    this.category = '';
    this.groups = [];
    this.initForm();
  }

  get isValidForm(): FormValid {
    return {
      name: CallSection.RATING,
      valid: this.form.valid,
    };
  }

  ngOnChanges(): void {
    this.initForm();
    this.changeCategory(this.category);
  }

  initForm() {
    this.form = new FormGroup({
      livingConditions: new FormControl(this.defaultValues.livingConditions),
      lifeQuality: new FormControl(this.defaultValues.lifeQuality),
      capacityBuilding: new FormControl(this.defaultValues.capacityBuilding),
      supportType: new FormControl(this.defaultValues.supportType),
      supportScope: new FormControl(this.defaultValues.supportScope),
      resilienceBuilding: new FormControl(
        this.defaultValues.resilienceBuilding
      ),
      socialBackwardness: new FormControl(
        this.defaultValues.socialBackwardness
      ),
      communitySense: new FormControl(this.defaultValues.communitySense),
      sustainabilityProcesses: new FormControl(
        this.defaultValues.sustainabilityProcesses
      ),
      statusImprovement: new FormControl(this.defaultValues.statusImprovement),
      urbanDevelopment: new FormControl(this.defaultValues.urbanDevelopment),
      professionalizationProcess: new FormControl(
        this.defaultValues.professionalizationProcess
      ),
      opportunityGeneration: new FormControl(
        this.defaultValues.opportunityGeneration
      ),
    });
    this.subscribeToForm();
  }

  subscribeToForm() {
    const sub = this.form.valueChanges.subscribe(val => {
      setTimeout(() => {
        this.updateParentModel(val, this.isValidForm);
      }, 500);
    });
    this.unsubscribe.push(sub);
  }

  private changeCategory(category: string) {
    // Reset previous controls
    switch (category) {
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
    this.form.updateValueAndValidity();
    this.updateParentModel({}, this.isValidForm);
  }
}
