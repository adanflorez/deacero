import { NgModule } from '@angular/core';
import { ProjectDevelopmentFormComponent } from './project-development-form.component';
import { formModules } from '../modules';

@NgModule({
  declarations: [ProjectDevelopmentFormComponent],
  imports: [...formModules],
  exports: [ProjectDevelopmentFormComponent],
})
export class ProjectDevelopmentFormModule {}
