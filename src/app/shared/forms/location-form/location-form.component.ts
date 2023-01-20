import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AlertType } from 'src/app/core/enums/alert-type';
import { CallSection } from 'src/app/core/enums/sections.enum';
import FormValid from 'src/app/core/models/form-valid.model';

import { LocationForm } from './domain';

@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.scss'],
})
export class LocationFormComponent implements OnInit, OnDestroy {
  @Input() updateParentModel: (
    part: LocationForm,
    formValid: FormValid
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  ) => void = () => {};
  @Input() defaultValues: LocationForm;
  form: FormGroup;
  locationFields = ['street', 'colony', 'town', 'state', 'postalCode'];
  alertType: AlertType = AlertType.Warning;

  private unsubscribe: Subscription[] = [];

  constructor() {
    this.form = new FormGroup({});
    this.defaultValues = {};
  }

  ngOnInit(): void {
    this.initForm();
    this.updateParentModel({}, this.isValidForm);
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach(sb => sb.unsubscribe());
  }

  get f() {
    return this.form.controls;
  }

  initForm() {
    this.form = new FormGroup({
      locationQuestion: new FormControl(
        this.defaultValues.locationQuestion == null
          ? true
          : this.defaultValues?.locationQuestion
      ),
      street: new FormControl(this.defaultValues.street, Validators.required),
      colony: new FormControl(this.defaultValues.colony, Validators.required),
      town: new FormControl(this.defaultValues.town, Validators.required),
      state: new FormControl(this.defaultValues.state, Validators.required),
      postalCode: new FormControl(
        this.defaultValues.postalCode,
        Validators.required
      ),
      video: new FormControl(this.defaultValues.video, Validators.required),
      daysAndHours: new FormControl(
        this.defaultValues.daysAndHours,
        Validators.required
      ),
      aboutCall: new FormControl(
        this.defaultValues.aboutCall,
        Validators.required
      ),
      whichMedia: new FormControl(this.defaultValues.whichMedia),
    });
    this.handleLocation();
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

  get isValidForm(): FormValid {
    return {
      name: CallSection.LOCATION,
      valid: this.form.valid,
    };
  }

  private handleLocation() {
    const locationQuestionSub = this.form
      .get('locationQuestion')
      ?.valueChanges.subscribe(res => {
        if (!res) {
          this.locationFields.forEach(field => {
            this.form.get(field)?.setValidators(Validators.required);
            this.form.get(field)?.reset();
          });
        } else {
          this.locationFields.forEach(field => {
            this.form.get(field)?.clearValidators();
          });
        }
      });
    this.unsubscribe.push(locationQuestionSub as Subscription);
  }
}
