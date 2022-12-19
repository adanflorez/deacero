import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectManagerFormComponent } from './project-manager-form.component';
import { FormErrorModule } from './../../form-error/form-error.module';

@NgModule({
  declarations: [ProjectManagerFormComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FormErrorModule],
  exports: [ProjectManagerFormComponent],
})
export class ProjectManagerFormModule {}
