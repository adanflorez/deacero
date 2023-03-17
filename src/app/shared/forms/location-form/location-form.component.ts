import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CallSection } from 'src/app/core/enums/sections.enum';
import FormValid from 'src/app/core/models/form-valid.model';
import { AlertType } from 'src/app/shared/alert';
import { OpeningHours } from 'src/app/shared/tables/opening-hours-table';

import { LocationForm } from './domain';

@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.scss'],
})
export class LocationFormComponent implements OnInit, OnDestroy, OnChanges {
  @Input() updateParentModel: (
    part: LocationForm,
    formValid: FormValid
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  ) => void = () => {};
  @Input() defaultValues: LocationForm;
  @Input() disable: boolean;
  form: FormGroup;
  locationFields = ['street', 'colony', 'town', 'state', 'postalCode'];
  alertType: AlertType = AlertType.Warning;
  openingHours: Array<OpeningHours>;

  private unsubscribe: Subscription[] = [];

  constructor() {
    this.form = new FormGroup({});
    this.defaultValues = {};
    this.disable = false;
    this.openingHours = [];
  }

  ngOnInit(): void {
    this.initForm();
    this.updateParentModel({}, this.isValidForm);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { disable } = changes;
    if (disable?.currentValue) {
      this.form.disable();
    }
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
      aboutCall: new FormControl(
        this.defaultValues.aboutCall,
        Validators.required
      ),
      whichMedia: new FormControl(this.defaultValues.whichMedia),
    });
    this.handleLocation();
    this.subscribeToForm();
    this.updateOpeningHours(
      this.defaultValues.daysAndHours as Array<OpeningHours>
    );
    this.validateAboutCall();
  }

  validateAboutCall() {
    this.form.get('aboutCall')?.value == 'Otro' &&
      this.form.get('whichMedia')?.setValidators(Validators.required);
    this.form.updateValueAndValidity();
    this.form.get('aboutCall')?.valueChanges.subscribe(val => {
      if (val == 'Otro') {
        this.form.get('whichMedia')?.setValidators(Validators.required);
        this.form.updateValueAndValidity();
      }
    });
  }

  subscribeToForm() {
    this.form
      .get('locationQuestion')
      ?.setValue(this.defaultValues.locationQuestion);
    const sub = this.form.valueChanges.subscribe(val => {
      setTimeout(() => {
        this.updateParentModel(
          { ...val, daysAndHours: this.openingHours },
          this.isValidForm
        );
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
            this.form.updateValueAndValidity();
          });
        } else {
          this.locationFields.forEach(field => {
            this.form.get(field)?.clearValidators();
            this.form.get(field)?.reset();
            this.form.updateValueAndValidity();
          });
        }
      });
    this.unsubscribe.push(locationQuestionSub as Subscription);
  }

  public updateOpeningHours(openingHours: Array<OpeningHours>): void {
    this.openingHours = openingHours || [];
    const data = {
      ...this.form.value,
      daysAndHours: this.openingHours,
    };
    this.updateParentModel(data, this.isValidForm);
  }
}
