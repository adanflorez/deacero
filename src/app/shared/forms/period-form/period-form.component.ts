import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CallSection } from 'src/app/lib/enums/sections.enum';
import FormValid from 'src/app/lib/models/form-valid.model';
import PeriodForm from 'src/app/lib/models/period-form.model';

@Component({
  selector: 'app-period-form',
  templateUrl: './period-form.component.html',
  styleUrls: ['./period-form.component.scss'],
})
export class PeriodFormComponent implements OnInit, OnDestroy {
  @Input() updateParentModel: (
    part: PeriodForm,
    formValid: FormValid
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  ) => void = () => {};
  @Input() defaultValues: PeriodForm;
  form: FormGroup;

  private unsubscribe: Subscription[] = [];

  constructor() {
    this.form = new FormGroup({});
    this.defaultValues = {};
  }

  get f() {
    return this.form.controls;
  }

  get isValidForm(): FormValid {
    return {
      name: CallSection.PERIOD,
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
      startDate: new FormControl(
        this.defaultValues.startDate,
        Validators.required
      ),
      endDate: new FormControl(this.defaultValues.endDate, Validators.required),
    });
    this.subscribeToForm();
  }

  subscribeToForm() {
    const sub = this.form.valueChanges.subscribe(val => {
      this.updateParentModel(val, this.isValidForm);
    });
    this.unsubscribe.push(sub);
  }
}
