import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { ObjectivesFormComponent } from './objectives-form.component';
import { FormErrorModule } from './../../form-error/form-error.module';

@NgModule({
  declarations: [ObjectivesFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormErrorModule,
    NgSelectModule,
  ],
  exports: [ObjectivesFormComponent],
})
export class ObjectivesFormModule {}
