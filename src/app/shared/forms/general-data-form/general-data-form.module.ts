import { FormErrorModule } from './../../form-error/form-error.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralDataFormComponent } from './general-data-form.component';

@NgModule({
  declarations: [GeneralDataFormComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FormErrorModule],
  exports: [GeneralDataFormComponent],
})
export class GeneralDataFormModule {}
