import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormErrorModule } from 'src/app/shared/form-error/form-error.module';

import { DonationsTableComponent } from './donations-table.component';

@NgModule({
  declarations: [DonationsTableComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FormErrorModule],
  exports: [DonationsTableComponent],
})
export class DonationsTableModule {}
