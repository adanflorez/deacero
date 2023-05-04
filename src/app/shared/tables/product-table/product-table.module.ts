import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormErrorModule } from 'src/app/shared/form-error/form-error.module';

import { ProductTableComponent } from './product-table.component';

@NgModule({
  declarations: [ProductTableComponent],
  imports: [CommonModule, ReactiveFormsModule, FormErrorModule],
  exports: [ProductTableComponent],
})
export class ProductTableModule {}
