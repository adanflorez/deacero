import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentsFormComponent } from './documents-form.component';
import { FormErrorModule } from './../../form-error/form-error.module';

@NgModule({
  declarations: [DocumentsFormComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FormErrorModule],
  exports: [DocumentsFormComponent],
})
export class DocumentsFormModule {}
