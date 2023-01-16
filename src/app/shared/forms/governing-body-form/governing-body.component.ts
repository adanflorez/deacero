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
import { ONLY_NUMBERS_PATTERN } from 'src/app/core/constants';
import { AlertType } from 'src/app/core/enums/alert-type';
import { CallSection } from 'src/app/core/enums/sections.enum';
import FormValid from 'src/app/core/models/form-valid.model';
import Member from 'src/app/core/models/member.model';

import { GoverningBodyForm } from './domain';

@Component({
  selector: 'app-governing-body',
  templateUrl: './governing-body.component.html',
  styleUrls: ['./governing-body.component.scss'],
})
export class GoverningBodyComponent implements OnInit, OnDestroy, OnChanges {
  @Input() updateParentModel: (
    part: GoverningBodyForm,
    formValid: FormValid
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  ) => void = () => {};
  @Input() defaultValues: GoverningBodyForm;
  @Input() disable: boolean;
  form: FormGroup;
  members: Member[];
  alertType: AlertType = AlertType.Warning;
  private unsubscribe: Subscription[] = [];

  constructor() {
    this.form = new FormGroup({});
    this.defaultValues = {};
    this.disable = false;
    this.members = [];
  }

  ngOnInit(): void {
    this.initForm();
    this.initMembers();
    this.updateParentModel({}, this.isValidForm);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { disable } = changes;
    if (disable.currentValue) {
      this.form.disable();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach(sb => sb.unsubscribe());
  }

  initMembers() {
    this.members = this.defaultValues.members as Member[];
  }

  get f() {
    return this.form.controls;
  }

  initForm() {
    this.form = new FormGroup({
      meetings: new FormControl(this.defaultValues.meetings, [
        Validators.required,
        Validators.pattern(ONLY_NUMBERS_PATTERN),
      ]),
      renewalFrequency: new FormControl(this.defaultValues.renewalFrequency, [
        Validators.required,
        Validators.pattern(ONLY_NUMBERS_PATTERN),
      ]),
    });
    this.subscribeToForm();
  }

  subscribeToForm() {
    const sub = this.form.valueChanges.subscribe(val => {
      this.updateParentModel(
        { ...val, members: this.members },
        this.isValidForm
      );
    });
    this.unsubscribe.push(sub);
  }

  updateMembers(members: Member[]) {
    this.members = members;
    const data = { ...this.form.value, members };
    this.updateParentModel(data, this.isValidForm);
  }

  get isValidForm(): FormValid {
    return {
      name: CallSection.GOVERNING_BODY,
      valid: this.form.valid && this.members.length > 0,
    };
  }
}
