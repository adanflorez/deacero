import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommunicationFormComponent } from './communication-form.component';
import { FormErrorModule } from '../../form-error/form-error.module';
import { AlertModule } from 'src/app/shared/alert/alert.module';

@NgModule({
  declarations: [CommunicationFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormErrorModule,
    AlertModule,
  ],
  exports: [CommunicationFormComponent],
})
export class CommunicationFormModule {}
