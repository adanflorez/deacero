import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';
import FormValid from 'src/app/core/models/form-valid.model';
import { CallSection } from 'src/app/core/enums/sections.enum';
import { AlertType } from 'src/app/core/enums/alert-type';
import { DecentWorkForm } from './domain';

@Component({
  selector: 'app-decent-work-form',
  templateUrl: './decent-work-form.component.html',
  styleUrls: ['./decent-work-form.component.scss'],
})
export class DecentWorkFormComponent implements OnInit, OnDestroy, OnChanges {
  @Input() updateParentModel: (
    part: DecentWorkForm,
    formValid: FormValid
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  ) => void = () => {};
  @Input() defaultValues: DecentWorkForm;
  @Input() disable: boolean;
  form: FormGroup;
  alertType: AlertType = AlertType.Warning;

  private unsubscribe: Subscription[] = [];

  constructor() {
    this.form = new FormGroup({});
    this.defaultValues = {};
    this.disable = false;
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
      whyYourOSC: new FormControl(
        this.defaultValues.whyYourOSC,
        Validators.required
      ),
      whatMakesYouDifferent: new FormControl(
        this.defaultValues.whatMakesYouDifferent,
        Validators.required
      ),
      benefitsSystem: new FormControl(
        this.defaultValues.benefitsSystem,
        Validators.required
      ),
      personalGrowth: new FormControl(
        this.defaultValues.personalGrowth,
        Validators.required
      ),
    });
    this.subscribeToForm();
    this.form.markAllAsTouched();
  }

  subscribeToForm() {
    const sub = this.form.valueChanges.subscribe(val => {
      this.updateParentModel(val, this.isValidForm);
    });
    this.unsubscribe.push(sub);
  }

  get isValidForm(): FormValid {
    return {
      name: CallSection.DECENT_WORK,
      valid: this.form.valid,
    };
  }
}
