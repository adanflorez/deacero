import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ONLY_NUMBERS_PATTERN } from 'src/app/lib/constants';
import GoverningBody from 'src/app/lib/models/governing-body.model';
import Member from 'src/app/lib/models/member.model';

@Component({
  selector: 'app-governing-body',
  templateUrl: './governing-body.component.html',
  styleUrls: ['./governing-body.component.scss'],
})
export class GoverningBodyComponent implements OnInit, OnDestroy {
  @Input() updateParentModel: (
    part: GoverningBody,
    isFormValid: boolean
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  ) => void = () => {};
  @Input() defaultValues: GoverningBody;
  form: FormGroup;
  members: Member[];
  private unsubscribe: Subscription[] = [];

  constructor() {
    this.form = new FormGroup({});
    this.defaultValues = {};
    this.members = [];
    this.updateParentModel({}, this.form.valid && this.members.length > 0);
  }

  ngOnInit(): void {
    this.initForm();
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
        this.form.valid && this.members.length > 0
      );
    });
    this.unsubscribe.push(sub);
  }

  updateMembers(members: Member[]) {
    this.members = members;
    const data = { ...this.form.value, members };
    this.updateParentModel(data, this.form.valid && this.members.length > 0);
  }
}
