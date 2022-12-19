import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeriodFormComponent } from './period-form.component';
import { FormErrorModule } from './../../form-error/form-error.module';

@NgModule({
  declarations: [PeriodFormComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FormErrorModule],
  exports: [PeriodFormComponent],
})
export class PeriodFormModule {}
