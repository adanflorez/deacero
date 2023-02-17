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
import {
  MULTIPLE_EMAIL_PATTERN,
  ONLY_NUMBERS_PATTERN,
} from 'src/app/core/constants';
import { CallSection } from 'src/app/core/enums/sections.enum';
import FormValid from 'src/app/core/models/form-valid.model';
import { AlertType } from 'src/app/shared/alert';

import { FundManagerForm } from './domain';

@Component({
  selector: 'app-fund-manager-form',
  templateUrl: './fund-manager-form.component.html',
  styleUrls: ['./fund-manager-form.component.scss'],
})
export class FundManagerFormComponent implements OnInit, OnDestroy, OnChanges {
  @Input() updateParentModel: (
    part: FundManagerForm,
    formValid: FormValid
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  ) => void = () => {};
  @Input() defaultValues: FundManagerForm;
  @Input() disable: boolean;
  @Input() allowComment: boolean;
  form: FormGroup;

  alertType: AlertType = AlertType.Warning;

  private unsubscribe: Subscription[] = [];

  constructor() {
    this.defaultValues = {};
    this.form = new FormGroup({});
    this.disable = false;
    this.allowComment = true;
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

  get isValidForm(): FormValid {
    return {
      name: CallSection.FUND_MANAGER,
      valid: this.form.valid,
    };
  }

  initForm() {
    this.form = new FormGroup({
      name: new FormControl(this.defaultValues.name, Validators.required),
      responsibleEmail: new FormControl(this.defaultValues.responsibleEmail, [
        Validators.required,
        Validators.pattern(MULTIPLE_EMAIL_PATTERN),
      ]),
      cellphone: new FormControl(this.defaultValues.cellphone, [
        Validators.required,
        Validators.pattern(ONLY_NUMBERS_PATTERN),
        Validators.maxLength(12),
      ]),
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
}
