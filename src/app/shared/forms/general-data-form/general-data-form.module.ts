import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { GeneralDataFormComponent } from './general-data-form.component';
import { FormErrorModule } from './../../form-error/form-error.module';

@NgModule({
  declarations: [GeneralDataFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormErrorModule,
    NgSelectModule,
  ],
  exports: [GeneralDataFormComponent],
})
export class GeneralDataFormModule {}