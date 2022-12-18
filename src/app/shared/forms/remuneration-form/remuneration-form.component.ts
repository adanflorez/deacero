import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import Remuneration from 'src/app/lib/models/remuneration.model';
import RemunerationForm from 'src/app/lib/models/remuneration-form.model';

@Component({
  selector: 'app-remuneration-form',
  templateUrl: './remuneration-form.component.html',
  styleUrls: ['./remuneration-form.component.scss'],
})
export class RemunerationFormComponent implements OnInit, OnDestroy {
  @Input() updateParentModel: (
    part: RemunerationForm,
    isFormValid: boolean
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  ) => void = () => {};
  @Input() defaultValues: RemunerationForm;
  form: FormGroup;
  remunerations: Remuneration[];
  private unsubscribe: Subscription[] = [];

  constructor() {
    this.form = new FormGroup({});
    this.defaultValues = {};
    this.remunerations = [];
    this.updateParentModel({}, this.isValid);
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
      remunerationQuestion: new FormControl(
        this.defaultValues.remunerationQuestion == null
          ? true
          : this.defaultValues.remunerationQuestion
      ),
    });
    this.subscribeToForm();
    this.subscribeToRemunerationQuestion();
  }

  subscribeToForm() {
    const sub = this.form.valueChanges.subscribe(val => {
      this.updateParentModel({ ...val }, this.isValid);
    });
    this.unsubscribe.push(sub);
  }

  updateRemunerations(remuneration: Remuneration[]) {
    this.remunerations = remuneration;
    const data = { ...this.form.value, remuneration };
    this.updateParentModel(data, this.isValid);
  }

  private subscribeToRemunerationQuestion() {
    const sub = this.form
      .get('remunerationQuestion')
      ?.valueChanges.subscribe(res => {
        if (!res) {
          this.updateRemunerations([]);
        }
      });
    this.unsubscribe.push(sub as Subscription);
  }

  get isValid(): boolean {
    return this.form.valid && this.f['remunerationQuestion']?.value
      ? this.remunerations.length > 0
      : true;
  }
}
