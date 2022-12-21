import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { GeneralProjectDataFormComponent } from './general-project-data-form.component';
import { FormErrorModule } from '../../form-error/form-error.module';
import { AlertModule } from 'src/app/shared/alert/alert.module';

@NgModule({
  declarations: [GeneralProjectDataFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormErrorModule,
    NgSelectModule,
    AlertModule,
  ],
  exports: [GeneralProjectDataFormComponent],
})
export class GeneralDataFormModule {}
