import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductTableComponent } from './product-table.component';

@NgModule({
  declarations: [ProductTableComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [ProductTableComponent],
})
export class ProductTableModule {}
