import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
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
  private unsubscribe: Subscription[] = [];

  constructor() {
    this.form = new FormGroup({});
    this.defaultValues = {};
    this.updateParentModel({}, this.form.valid);
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
  }

  subscribeToForm() {
    const sub = this.form.valueChanges.subscribe(val => {
      this.updateParentModel({ ...val }, this.form.valid);
    });
    this.unsubscribe.push(sub);
  }
}
