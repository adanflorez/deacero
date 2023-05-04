import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CallSection } from 'src/app/core/enums/sections.enum';
import FormValid from 'src/app/core/models/form-valid.model';
import { AlertType } from 'src/app/shared/alert';

import { SocialMediaForm } from './domain';

@Component({
  selector: 'app-communication-form',
  templateUrl: './communication-form.component.html',
  styleUrls: ['./communication-form.component.scss'],
})
export class CommunicationFormComponent
  implements OnInit, OnChanges, OnDestroy
{
  @Input() updateParentModel: (
    part: SocialMediaForm,
    formValid: FormValid
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  ) => void = () => {};
  @Input() defaultValues: SocialMediaForm;
  @Input() disable: boolean;
  form: FormGroup;
  alertType: AlertType = AlertType.Warning;

  private unsubscribe: Subscription[] = [];

  constructor() {
    this.form = new FormGroup({});
    this.defaultValues = {};
    this.disable = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { disable } = changes;
    if (disable?.currentValue) {
      this.initForm();
    }
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
      facebook: new FormControl(this.defaultValues.facebook),
      instagram: new FormControl(this.defaultValues.instagram),
      linkedin: new FormControl(this.defaultValues.linkedin),
      twitter: new FormControl(this.defaultValues.twitter),
      tiktok: new FormControl(this.defaultValues.tiktok),
      youtube: new FormControl(this.defaultValues.youtube),
      webpage: new FormControl(this.defaultValues.webpage),
    });
    this.subscribeToForm();
    this.disable && this.form.disable();
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
