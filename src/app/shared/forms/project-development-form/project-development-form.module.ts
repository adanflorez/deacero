import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDevelopmentFormComponent } from './project-development-form.component';
import { FormErrorModule } from './../../form-error/form-error.module';
import { AlertModule } from 'src/app/shared/alert/alert.module';

@NgModule({
  declarations: [ProjectDevelopmentFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormErrorModule,
    AlertModule,
  ],
  exports: [ProjectDevelopmentFormComponent],
})
export class ProjectDevelopmentFormModule {}
