import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { OBJECTIVES } from 'src/app/core/constants';
import { AlertType } from 'src/app/shared/alert/enums/alert-type';
import { CallSection } from 'src/app/core/enums/sections.enum';
import FormValid from 'src/app/core/models/form-valid.model';

import { ObjectivesForm } from './domain';

@Component({
  selector: 'app-objectives-form',
  templateUrl: './objectives-form.component.html',
  styleUrls: ['./objectives-form.component.scss'],
})
export class ObjectivesFormComponent implements OnInit, OnDestroy {
  @Input() updateParentModel: (
    part: ObjectivesForm,
    formValid: FormValid
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  ) => void = () => {};
  @Input() defaultValues: ObjectivesForm;
  form: FormGroup;
  objectivesOptions = OBJECTIVES;
  objectivesFields = [
    'povertyEnd',
    'zeroHunger',
    'healthAndWellness',
    'qualityEducation',
    'genderEquality',
    'cleanWater',
    'affordableEnergy',
    'decentWork',
    'industry',
    'reducingInequalities',
    'cities',
    'production',
    'climateAction',
    'underwaterLife',
    'terrestrialEcosystemLife',
    'peace',
    'alliances',
  ];
  alertType: AlertType = AlertType.Warning;

  private unsubscribe: Subscription[] = [];

  constructor() {
    this.defaultValues = {};
    this.form = new FormGroup({});
  }

  get f() {
    return this.form.controls;
  }

  get isValidForm(): FormValid {
    return {
      name: CallSection.OBJECTIVES,
      valid: this.form.valid,
    };
  }

  ngOnInit(): void {
    this.initForm();
    this.updateParentModel({}, this.isValidForm);
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach(sb => sb.unsubscribe());
  }

  initForm() {
    this.form = new FormGroup({
      objectives: new FormControl(
        this.defaultValues.objectives || '',
        Validators.required
      ),
      povertyEnd: new FormControl(this.defaultValues.povertyEnd),
      zeroHunger: new FormControl(this.defaultValues.zeroHunger),
      healthAndWellness: new FormControl(this.defaultValues.healthAndWellness),
      qualityEducation: new FormControl(this.defaultValues.qualityEducation),
      genderEquality: new FormControl(this.defaultValues.genderEquality),
      cleanWater: new FormControl(this.defaultValues.cleanWater),
      affordableEnergy: new FormControl(this.defaultValues.affordableEnergy),
      decentWork: new FormControl(this.defaultValues.decentWork),
      industry: new FormControl(this.defaultValues.industry),
      reducingInequalities: new FormControl(
        this.defaultValues.reducingInequalities
      ),
      cities: new FormControl(this.defaultValues.cities),
      production: new FormControl(this.defaultValues.production),
      climateAction: new FormControl(this.defaultValues.climateAction),
      underwaterLife: new FormControl(this.defaultValues.underwaterLife),
      terrestrialEcosystemLife: new FormControl(
        this.defaultValues.terrestrialEcosystemLife
      ),
      peace: new FormControl(this.defaultValues.peace),
      alliances: new FormControl(this.defaultValues.alliances),
    });
    this.subscribeToForm();
    this.handleObjectives();
  }

  subscribeToForm() {
    const sub = this.form.valueChanges.subscribe(val => {
      setTimeout(() => {
        this.updateParentModel(val, this.isValidForm);
      }, 500);
    });
    this.unsubscribe.push(sub);
  }

  private handleObjectives() {
    const sub = this.form.get('objectives')?.valueChanges.subscribe(val => {
      this.objectivesOptions.forEach((_, index) => {
        if (val.includes(this.objectivesOptions[index])) {
          this.form
            .get(this.objectivesFields[index])
            ?.setValidators(Validators.required);
        } else {
          this.form.get(this.objectivesFields[index])?.clearValidators();
          this.form.get(this.objectivesFields[index])?.reset();
        }
      });
    });
    this.unsubscribe.push(sub as Subscription);
  }
}
