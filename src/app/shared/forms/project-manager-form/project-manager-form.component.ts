import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  MULTIPLE_EMAIL_PATTERN,
  ONLY_NUMBERS_PATTERN,
} from 'src/app/core/constants';
import FormValid from 'src/app/core/models/form-valid.model';
import ProjectManagerForm from 'src/app/core/models/project-manager-form.model';
import { Subscription } from 'rxjs';
import { CallSection } from 'src/app/core/enums/sections.enum';
import { AlertType } from 'src/app/core/enums/alert-type';

@Component({
  selector: 'app-project-manager-form',
  templateUrl: './project-manager-form.component.html',
  styleUrls: ['./project-manager-form.component.scss'],
})
export class ProjectManagerFormComponent implements OnInit, OnDestroy {
  @Input() updateParentModel: (
    part: ProjectManagerForm,
    formValid: FormValid
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  ) => void = () => {};
  @Input() defaultValues: ProjectManagerForm;
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
      name: CallSection.PROJECT_MANAGER,
      valid: this.form.valid,
    };
  }

  initForm() {
    this.form = new FormGroup({
      responsibleName: new FormControl(
        this.defaultValues.responsibleName,
        Validators.required
      ),
      emails: new FormControl(this.defaultValues.emails, [
        Validators.required,
        Validators.pattern(MULTIPLE_EMAIL_PATTERN),
      ]),
      phone: new FormControl(this.defaultValues.phone, [
        Validators.required,
        Validators.pattern(ONLY_NUMBERS_PATTERN),
        Validators.maxLength(12),
      ]),
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
