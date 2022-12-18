import { FormErrorModule } from './../../form-error/form-error.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoverningBodyComponent } from './governing-body.component';

@NgModule({
  declarations: [GoverningBodyComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FormErrorModule],
  exports: [GoverningBodyComponent],
})
export class GoverningBodyModule {}
