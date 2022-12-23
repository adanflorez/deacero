import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import Remuneration from 'src/app/lib/models/remuneration.model';
import FormValid from 'src/app/lib/models/form-valid.model';
import RemunerationForm from 'src/app/lib/models/remuneration-form.model';
import { CallSection } from 'src/app/lib/enums/sections.enum';
import { AlertType } from 'src/app/lib/enums/alert-type';

@Component({
  selector: 'app-remuneration-form',
  templateUrl: './remuneration-form.component.html',
  styleUrls: ['./remuneration-form.component.scss'],
})
export class RemunerationFormComponent implements OnInit, OnDestroy {
  @Input() updateParentModel: (
    part: RemunerationForm,
    isFormValid: FormValid
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  ) => void = () => {};
  @Input() defaultValues!: RemunerationForm;
  form: FormGroup;
  remunerations: Remuneration[];
  alertType: AlertType = AlertType.Warning;
  private unsubscribe: Subscription[] = [];

  constructor() {
    this.form = new FormGroup({});
    this.remunerations = [];
    this.defaultValues = {};
  }

  ngOnInit(): void {
    this.initForm();
    this.initRemunerations();
    this.updateParentModel({}, this.isValid);
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach(sb => sb.unsubscribe());
  }

  get f() {
    return this.form.controls;
  }

  private initRemunerations() {
    this.remunerations =
      (this.defaultValues?.remunerations as Remuneration[]) || [];
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
      this.updateParentModel(
        { ...val, remunerations: this.remunerations },
        this.isValid
      );
    });
    this.unsubscribe.push(sub);
  }

  updateRemunerations(remunerations: Remuneration[]) {
    this.remunerations = remunerations;
    const data = { ...this.form.value, remunerations };
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

  get isValid(): FormValid {
    return {
      name: CallSection.REMUNERATIONS,
      valid:
        this.form.valid && this.f['remunerationQuestion']?.value
          ? this.remunerations.length > 0
          : true,
    };
  }
}
