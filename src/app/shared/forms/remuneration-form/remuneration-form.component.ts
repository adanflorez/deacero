import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CallSection } from 'src/app/core/enums/sections.enum';
import { Remuneration } from 'src/app/core/models';
import FormValid from 'src/app/core/models/form-valid.model';
import { AlertType } from 'src/app/shared/alert';

import { RemunerationForm } from './domain';

@Component({
  selector: 'app-remuneration-form',
  templateUrl: './remuneration-form.component.html',
  styleUrls: ['./remuneration-form.component.scss'],
})
export class RemunerationFormComponent implements OnInit, OnDestroy, OnChanges {
  @Input() updateParentModel: (
    part: RemunerationForm,
    isFormValid: FormValid
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  ) => void = () => {};
  @Input() defaultValues!: RemunerationForm;
  @Input() disable: boolean;
  @Input() allowComment: boolean;
  form: FormGroup;
  remunerations: Remuneration[];
  alertType: AlertType = AlertType.Warning;
  private unsubscribe: Subscription[] = [];

  constructor() {
    this.form = new FormGroup({});
    this.remunerations = [];
    this.defaultValues = {};
    this.disable = false;
    this.allowComment = true;
  }

  ngOnInit(): void {
    this.initForm();
    this.initRemunerations();
    this.updateParentModel({}, this.isValid);
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
