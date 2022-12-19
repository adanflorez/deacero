import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDevelopmentFormComponent } from './project-development-form.component';
import { FormErrorModule } from './../../form-error/form-error.module';

@NgModule({
  declarations: [ProjectDevelopmentFormComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FormErrorModule],
  exports: [ProjectDevelopmentFormComponent],
})
export class ProjectDevelopmentFormModule {}
