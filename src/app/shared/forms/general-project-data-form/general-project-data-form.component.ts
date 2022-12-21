import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import FormValid from 'src/app/lib/models/form-valid.model';
import GeneralProjectDataForm from 'src/app/lib/models/general-project-data-form.model';
import { CallSection } from 'src/app/lib/enums/sections.enum';
import { Subscription } from 'rxjs';
import { AlertType } from 'src/app/lib/enums/alert-type';

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
      name: CallSection.GENERAL_DATA,
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
    // this.resetPreviousRatings();
    switch (this.f.category.value) {
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
  }
}
