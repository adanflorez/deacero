import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import FormValid from 'src/app/lib/models/form-valid.model';
import GeneralDataForm from 'src/app/lib/models/general-data-form.model';

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

  constructor() {
    this.defaultValues = {};
    this.form = new FormGroup({});
  }

  ngOnInit(): void {
    this.initForm();
  }

  get f() {
    return this.form.controls;
  }

  initForm() {
    this.form = new FormGroup({
      projectName: new FormControl('', [Validators.required]),
    });
  }
}
