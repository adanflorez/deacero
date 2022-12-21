import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ONLY_NUMBERS_PATTERN } from 'src/app/lib/constants';
import GoverningBody from 'src/app/lib/models/governing-body.model';
import Member from 'src/app/lib/models/member.model';
import { CallSection } from 'src/app/lib/enums/sections.enum';
import FormValid from 'src/app/lib/models/form-valid.model';
import { AlertType } from 'src/app/lib/enums/alert-type';

@Component({
  selector: 'app-governing-body',
  templateUrl: './governing-body.component.html',
  styleUrls: ['./governing-body.component.scss'],
})
export class GoverningBodyComponent implements OnInit, OnDestroy {
  @Input() updateParentModel: (
    part: GoverningBody,
    formValid: FormValid
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  ) => void = () => {};
  @Input() defaultValues: GoverningBody;
  form: FormGroup;
  members: Member[];
  alertType: AlertType = AlertType.Warning;
  private unsubscribe: Subscription[] = [];

  constructor() {
    this.form = new FormGroup({});
    this.defaultValues = {};
    this.members = [];
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
