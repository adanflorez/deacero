import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormErrorModule } from 'src/app/shared/form-error/form-error.module';

import { OpeningHoursTableComponent } from './opening-hours-table.component';

@NgModule({
  declarations: [OpeningHoursTableComponent],
  imports: [CommonModule, ReactiveFormsModule, FormErrorModule],
  exports: [OpeningHoursTableComponent],
})
export class OpeningHoursTableModule {}
