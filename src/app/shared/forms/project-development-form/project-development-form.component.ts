import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ONLY_NUMBERS_PATTERN } from 'src/app/core/constants';
import { CallSection } from 'src/app/core/enums/sections.enum';
import FormValid from 'src/app/core/models/form-valid.model';
import { AlertType } from 'src/app/shared/alert';

import { ProjectDevelopmentForm } from './domain';

@Component({
  selector: 'app-project-development-form',
  templateUrl: './project-development-form.component.html',
  styleUrls: ['./project-development-form.component.scss'],
})
export class ProjectDevelopmentFormComponent implements OnInit, OnDestroy {
  @Input() updateParentModel: (
    part: ProjectDevelopmentForm,
    formValid: FormValid
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  ) => void = () => {};
  @Input() defaultValues: ProjectDevelopmentForm;
  form: FormGroup;
  alertType: AlertType = AlertType.Warning;

  private unsubscribe: Subscription[] = [];

  constructor() {
    this.form = new FormGroup({});
    this.defaultValues = {};
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

  get isValidForm(): FormValid {
    return {
      name: CallSection.PROJECT_DEVELOPMENT,
      valid: this.form.valid,
    };
  }

  initForm() {
    this.form = new FormGroup({
      whichProblem: new FormControl(
        this.defaultValues.whichProblem,
        Validators.required
      ),
      generalObjective: new FormControl(
        this.defaultValues.generalObjective,
        Validators.required
      ),
      numberOfBeneficiaries: new FormControl(
        this.defaultValues.numberOfBeneficiaries,
        [Validators.required, Validators.pattern(ONLY_NUMBERS_PATTERN)]
      ),
      collaborationWithOtherOrganizations: new FormControl(
        this.defaultValues.collaborationWithOtherOrganizations
      ),
      collaboratorsAnswer: new FormControl(
        this.defaultValues.collaboratorsAnswer,
        Validators.required
      ),
      populationsConditionsBefore: new FormControl(
        this.defaultValues.populationsConditionsBefore,
        Validators.required
      ),
      populationsConditionsAfter: new FormControl(
        this.defaultValues.populationsConditionsAfter,
        Validators.required
      ),
      promoteSocialImprovement: new FormControl(
        this.defaultValues.promoteSocialImprovement,
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
}
