import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectManagerFormComponent } from './project-manager-form.component';
import { FormErrorModule } from './../../form-error/form-error.module';
import { AlertModule } from 'src/app/shared/alert/alert.module';

@NgModule({
  declarations: [ProjectManagerFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormErrorModule,
    AlertModule,
  ],
  exports: [ProjectManagerFormComponent],
})
export class ProjectManagerFormModule {}
