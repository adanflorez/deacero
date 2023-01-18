import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { URL_PATTERN } from 'src/app/core/constants';
import FormValid from 'src/app/core/models/form-valid.model';
import SocialMediaForm from 'src/app/core/models/social-media-form.model';
import { Subscription } from 'rxjs';
import { CallSection } from 'src/app/core/enums/sections.enum';
import { AlertType } from 'src/app/core/enums/alert-type';

@Component({
  selector: 'app-communication-form',
  templateUrl: './communication-form.component.html',
  styleUrls: ['./communication-form.component.scss'],
})
export class CommunicationFormComponent implements OnInit, OnDestroy {
  @Input() updateParentModel: (
    part: SocialMediaForm,
    formValid: FormValid
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  ) => void = () => {};
  @Input() defaultValues: SocialMediaForm;
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

  initForm() {
    this.form = new FormGroup({
      facebook: new FormControl(this.defaultValues.facebook, [
        Validators.pattern(URL_PATTERN),
      ]),
      instagram: new FormControl(this.defaultValues.instagram, [
        Validators.pattern(URL_PATTERN),
      ]),
      linkedin: new FormControl(this.defaultValues.linkedin, [
        Validators.pattern(URL_PATTERN),
      ]),
      twitter: new FormControl(this.defaultValues.twitter, [
        Validators.pattern(URL_PATTERN),
      ]),
      tiktok: new FormControl(this.defaultValues.tiktok, [
        Validators.pattern(URL_PATTERN),
      ]),
      youtube: new FormControl(this.defaultValues.youtube, [
        Validators.pattern(URL_PATTERN),
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

  get isValidForm(): FormValid {
    return {
      name: CallSection.SOCIAL_MEDIA,
      valid: this.form.valid,
    };
  }
}
