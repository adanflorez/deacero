import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ONLY_NUMBERS_PATTERN } from 'src/app/lib/constants';
import FormValid from 'src/app/lib/models/form-valid.model';
import ProjectDevelopmentForm from 'src/app/lib/models/project-development-form.model';
import { CallSection } from 'src/app/lib/enums/sections.enum';
import { AlertType } from 'src/app/lib/enums/alert-type';

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
  }

  subscribeToForm() {
    const sub = this.form.valueChanges.subscribe(val => {
      this.updateParentModel(val, this.isValidForm);
    });
    this.unsubscribe.push(sub);
  }
}
