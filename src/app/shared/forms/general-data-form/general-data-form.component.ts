import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import FormValid from 'src/app/lib/models/form-valid.model';
import GeneralDataForm from 'src/app/lib/models/general-data-form.model';
import { CallSection } from 'src/app/lib/enums/sections.enum';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-general-data-form',
  templateUrl: './general-data-form.component.html',
  styleUrls: ['./general-data-form.component.scss'],
})
export class GeneralDataFormComponent implements OnInit {
  @Input() updateParentModel: (
    part: GeneralDataForm,
    isFormValid: FormValid
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  ) => void = () => {};
  @Input() defaultValues: GeneralDataForm;
  form: FormGroup;

  private unsubscribe: Subscription[] = [];

  constructor() {
    this.defaultValues = {};
    this.form = new FormGroup({});
  }

  ngOnInit(): void {
    this.initForm();
    this.updateParentModel({}, this.isValid);
  }

  get f() {
    return this.form.controls;
  }

  get isValid(): FormValid {
    return {
      name: CallSection.GENERAL_DATA,
      valid: this.form.valid,
    };
  }

  initForm() {
    this.form = new FormGroup({
      projectName: new FormControl('', [Validators.required]),
    });
    this.subscribeToForm();
  }

  subscribeToForm() {
    const sub = this.form.valueChanges.subscribe(val => {
      this.updateParentModel({ ...val }, this.isValid);
    });
    this.unsubscribe.push(sub);
  }
}
