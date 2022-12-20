import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RATING } from 'src/app/lib/constants';
import FormValid from 'src/app/lib/models/form-valid.model';
import RatingForm from 'src/app/lib/models/rating-form.model';
import { Subscription } from 'rxjs';
import { CallSection } from 'src/app/lib/enums/sections.enum';

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
    'Alimentación',
    'Asistencia jurídica',
    'Asistencia o rehabilitación médica',
    'Atención a grupos sociales con discapacidad',
    'Becas',
    'Defensa y promoción de los DH',
    'Desarrollo comunidades indígenas.',
    'Desarrollo Institucional',
    'Desarrollo urbano',
    'Detonación de oportunidades para la resiliencia económica.',
    'Ecología',
    'Educación',
    'Empoderamiento social',
    'Equipamiento',
    'Fomento educativo',
    'Inclusión',
    'Infraestructura',
    'Medio ambiente',
    'Nutrición',
    'Orientación social',
    'Participación ciudadana.',
    'Promoción y difusión cultural',
    'Reinserción social',
    'Salud mental',
  ];

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

  ngOnChanges(changes: SimpleChanges): void {
    this.initForm();
    this.changeCategory(changes.category?.currentValue);
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
    console.log(this.form);
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
    // this.resetPreviousRatings();
    switch (category) {
      case this.categories[0]:
      case this.categories[2]:
      case this.categories[3]:
      case this.categories[15]:
      case this.categories[18]:
      case this.categories[19]:
      case this.categories[23]:
      case this.categories[24]:
        this.groups = [
          'livingConditions',
          'lifeQuality',
          'capacityBuilding',
          'supportType',
          'supportScope',
          'resilienceBuilding',
        ];
        break;
      case this.categories[1]:
      case this.categories[4]:
      case this.categories[5]:
      case this.categories[6]:
      case this.categories[8]:
      case this.categories[10]:
      case this.categories[11]:
      case this.categories[12]:
      case this.categories[14]:
      case this.categories[17]:
      case this.categories[20]:
      case this.categories[21]:
      case this.categories[22]:
        this.groups = [
          'socialBackwardness',
          'capacityBuilding',
          'communitySense',
          'sustainabilityProcesses',
        ];
        break;
      case this.categories[7]:
      case this.categories[9]:
      case this.categories[13]:
      case this.categories[16]:
        this.groups = [
          'statusImprovement',
          'urbanDevelopment',
          'professionalizationProcess',
          'opportunityGeneration',
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
